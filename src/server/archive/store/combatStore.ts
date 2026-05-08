// src/stores/combatStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useEnemyStore } from '@/presentation/app/enemy/appEnemyStore'
import { usePlayerStore } from '@/data/store/playerStore'
import { useBattleStore } from '@/data/store/battleStore'
import { useSkillStore } from '@/data/store/skillStore'
import { LoggerService } from '@/ui/feed/useFeedStore'

export const useCombatStore = defineStore('combat', () => {
  const enemyStore = useEnemyStore()
  const playerStore = usePlayerStore()
  const battleStore = useBattleStore()
  const skillStore = useSkillStore()
  const logger = new LoggerService()

  const lastTapInfo = ref<{ damage: number; isCritical: boolean } | null>(null)

  function tap() {
    // Проверяем наличие врага
    if (!enemyStore.hasEnemy) {
      const newEnemy = enemyStore.spawnEnemy(playerStore.player.cultivationLevel)
      battleStore.startBattle(newEnemy)
      logger.log(`👾 Появился враг: ${newEnemy.name}`)
      return
    }

    // Получаем навыки с защитой от undefined
    const tapDamageSkill = skillStore.tapDamage
    const criticalChanceSkill = skillStore.criticalChance
    const criticalMultiplierSkill = skillStore.criticalMultiplier

    // БЕЗОПАСНЫЙ РАСЧЕТ УРОНА - значения по умолчанию если undefined
    let baseDamage = 1
    if (
      tapDamageSkill &&
      typeof tapDamageSkill.currentValue === 'number' &&
      !isNaN(tapDamageSkill.currentValue)
    ) {
      baseDamage = tapDamageSkill.currentValue
    }

    let critChance = 0.05
    if (
      criticalChanceSkill &&
      typeof criticalChanceSkill.currentValue === 'number' &&
      !isNaN(criticalChanceSkill.currentValue)
    ) {
      critChance = criticalChanceSkill.currentValue
    }

    let critMultiplier = 2
    if (
      criticalMultiplierSkill &&
      typeof criticalMultiplierSkill.currentValue === 'number' &&
      !isNaN(criticalMultiplierSkill.currentValue)
    ) {
      critMultiplier = criticalMultiplierSkill.currentValue
    }

    // Расчет урона
    let damage = baseDamage
    const isCritical = Math.random() < critChance

    if (isCritical) {
      damage = baseDamage * critMultiplier
    }

    // ФИНАЛЬНАЯ ЗАЩИТА - если damage все еще NaN, ставим 1
    if (typeof damage !== 'number' || isNaN(damage) || damage <= 0) {
      console.warn('Damage was NaN, using default 1')
      damage = 1
    }

    // Увеличиваем счетчик тапов игрока с защитой
    if (playerStore.player && typeof playerStore.player.totalTaps === 'number') {
      playerStore.player.totalTaps++
    }

    // Записываем статистику боя с защитой
    battleStore.recordTap(damage, isCritical || false)

    // Наносим урон врагу
    const result = enemyStore.damageEnemy(damage)

    lastTapInfo.value = { damage, isCritical: isCritical || false }

    if (isCritical) {
      logger.log(`✨ Критический удар! ${Math.round(damage)} урона`)
    }

    // Если враг побежден
    if (result.defeated && result.enemy) {
      // Начисляем награды с защитой от NaN
      const stoneReward = result.enemy.spiritStonesReward || 0
      const expReward = result.enemy.experienceReward || 0

      playerStore.player.addSpiritStones(stoneReward)
      playerStore.player.addExperience(expReward)

      battleStore.recordVictory(result.enemy, {
        stones: stoneReward,
        experience: expReward,
      })

      logger.log(`🎉 Победа! +${stoneReward} камней, +${expReward} опыта`)

      const newEnemy = enemyStore.spawnEnemy(playerStore.player.cultivationLevel)
      battleStore.startBattle(newEnemy)
      logger.log(`👾 Появился новый враг: ${newEnemy.name}`)
    }

    playerStore.savePlayer()
  }

  function spawnEnemy(level?: number) {
    console.log('=== COMBAT STORE SPAWN ===')
    const spawnLevel = level || playerStore.player.cultivationLevel
    console.log('Spawning at level:', spawnLevel)

    const enemy = enemyStore.spawnEnemy(spawnLevel)
    console.log('Enemy spawned:', enemy)

    if (battleStore) {
      battleStore.startBattle(enemy)
    }
    logger.log(`👾 Призван враг: ${enemy.name}`)
    return enemy
  }

  return {
    currentEnemy: enemyStore.currentEnemy,
    lastTapInfo,
    tap,
    spawnEnemy,
  }
})
