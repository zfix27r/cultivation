import { Player } from '@/core/entities/Player'
import { Enemy } from '@/core/entities/Enemy'
import { Skill } from '@/core/entities/Skill'
import { IPlayerRepository } from '@/core/repositories/IPlayerRepository'
import { IEnemyRepository } from '@/core/repositories/IEnemyRepository'
import { ILoggerService } from '@/ui/feed/useFeedStore'

export class TapUseCase {
  constructor(
    private playerRepo: IPlayerRepository,
    private enemyRepo: IEnemyRepository,
    private logger: ILoggerService,
  ) { }

  execute(): { player: Player; enemy: Enemy | null; isCritical: boolean; damage: number } {
    const player = this.playerRepo.getPlayer()
    const currentEnemy = this.enemyRepo.getCurrentEnemy()

    if (!currentEnemy) {
      const newEnemy = this.enemyRepo.spawnEnemy(player.cultivationLevel)
      return { player, enemy: newEnemy, isCritical: false, damage: 0 }
    }

    player.totalTaps++

    // Получаем навыки
    const tapDamageSkill = this.playerRepo.getSkill('tapDamage')
    const criticalChanceSkill = this.playerRepo.getSkill('criticalChance')
    const criticalMultiplierSkill = this.playerRepo.getSkill('criticalMultiplier')

    // Расчет урона
    let damage = tapDamageSkill.currentValue
    const isCritical = Math.random() < criticalChanceSkill.currentValue

    if (isCritical) {
      damage *= criticalMultiplierSkill.currentValue
    }

    currentEnemy.takeDamage(damage)

    if (currentEnemy.isDefeated()) {
      player.enemiesDefeated++
      player.addSpiritStones(currentEnemy.spiritStonesReward)
      player.addExperience(currentEnemy.experienceReward)

      this.logger.log(`🎉 Победа! +${currentEnemy.spiritStonesReward} камней`)

      const newEnemy = this.enemyRepo.spawnEnemy(player.cultivationLevel)
      this.playerRepo.savePlayer(player)

      return { player, enemy: newEnemy, isCritical, damage }
    }

    this.playerRepo.savePlayer(player)
    this.enemyRepo.saveEnemy(currentEnemy)

    return { player, enemy: currentEnemy, isCritical, damage }
  }
}
