// src/composables/useCombat.ts
import { computed } from 'vue'
import { useCombatStore } from '@/data/store/combatStore'
import { usePlayerStore } from '@/data/store/playerStore'
import { useSkillStore } from '@/data/store/skillStore'
import type { Enemy } from '@/core/entities/Enemy'

export function useCombat() {
  const combatStore = useCombatStore()
  const playerStore = usePlayerStore()
  const skillStore = useSkillStore()

  // Геттеры
  const currentEnemy = computed(() => combatStore.currentEnemy)
  const lastTapInfo = computed(() => combatStore.lastTapInfo)

  // Прогресс боя (для полоски здоровья)
  const battleProgress = computed(() => {
    if (!currentEnemy.value) return 0
    return (
      ((currentEnemy.value.maxHealth - currentEnemy.value.health) / currentEnemy.value.maxHealth) *
      100
    )
  })

  // Цвет полоски здоровья в зависимости от остатка
  const healthBarColor = computed(() => {
    const progress = battleProgress.value
    if (progress > 60) return '#4caf50'
    if (progress > 30) return '#ff9800'
    return '#f44336'
  })

  // Статистика боя
  const combatStats = computed(() => ({
    totalTaps: playerStore.player.totalTaps,
    enemiesDefeated: playerStore.player.enemiesDefeated,
    currentLevel: playerStore.player.cultivationLevel,
  }))

  // Действия
  const tap = () => {
    combatStore.tap()
  }

  const spawnEnemy = (level?: number) => {
    const enemyLevel = level || playerStore.player.cultivationLevel
    return combatStore.spawnEnemy(enemyLevel)
  }

  // Форматирование информации о враге
  const getEnemyInfo = (enemy: Enemy | null) => {
    if (!enemy) return null

    return {
      name: enemy.name,
      health: enemy.health,
      maxHealth: enemy.maxHealth,
      healthPercent: (enemy.health / enemy.maxHealth) * 100,
      attack: enemy.attack,
      defense: enemy.defense,
      reward: {
        stones: enemy.spiritStonesReward,
        experience: enemy.experienceReward,
      },
    }
  }

  // Проверка, можно ли атаковать
  const canAttack = computed(() => {
    return !!currentEnemy.value && currentEnemy.value.health > 0
  })

  // Расчет урона с учетом всех модификаторов (для превью)
  const calculatePreviewDamage = () => {
    const baseDamage = skillStore.tapDamage?.currentValue || 1
    const critChance = skillStore.criticalChance?.currentValue || 0.05
    const critMultiplier = skillStore.criticalMultiplier?.currentValue || 2

    return {
      baseDamage,
      averageDamage: baseDamage * (1 + critChance * (critMultiplier - 1)),
      critChance: Math.round(critChance * 100),
      critMultiplier,
    }
  }

  return {
    // Состояние
    currentEnemy,
    lastTapInfo,
    battleProgress,
    healthBarColor,
    combatStats,
    canAttack,

    // Действия
    tap,
    spawnEnemy,

    // Хелперы
    getEnemyInfo,
    calculatePreviewDamage,
  }
}
