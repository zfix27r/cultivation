import type { IPlayerRepository } from '@/core/repositories/IPlayerRepository'
import type { ILoggerService } from '@/ui/feed/useFeedStore'
import type { Player } from '@/core/entities/Player'
import type { Skill } from '@/core/entities/Skill'

export class UpgradeSkillUseCase {
  constructor(
    private playerRepo: IPlayerRepository,
    private logger: ILoggerService,
  ) { }

  execute(skillId: string): { success: boolean; player: Player; skill: Skill | null } {
    const player = this.playerRepo.getPlayer()
    const skill = this.playerRepo.getSkill(skillId)

    if (!skill) {
      this.logger.log(`❌ Навык ${skillId} не найден`)
      return { success: false, player, skill: null }
    }

    if (!skill.canUpgrade()) {
      this.logger.log(`❌ Навык ${skill.name} достиг максимального уровня`)
      return { success: false, player, skill }
    }

    const cost = skill.upgradeCost
    if (!player.spendSpiritStones(cost)) {
      this.logger.log(`❌ Недостаточно камней духа для улучшения ${skill.name}`)
      return { success: false, player, skill }
    }

    skill.upgrade()
    this.playerRepo.savePlayer(player)
    this.playerRepo.saveSkill(skill)

    this.logger.log(`📚 ${skill.name} улучшен до ${skill.level} уровня`)

    return { success: true, player, skill }
  }
}
