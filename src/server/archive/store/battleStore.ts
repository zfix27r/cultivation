// src/stores/battleStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Enemy } from '@/core/entities/Enemy'

export interface BattleStats {
  totalEnemiesDefeated: number
  totalTaps: number
  totalDamageDealt: number
  totalCriticalHits: number
  enemiesByType: Record<string, number>
  battleHistory: BattleRecord[]
}

export interface BattleRecord {
  timestamp: number
  enemyName: string
  tapsToKill: number
  damageDealt: number
  criticalHits: number
  rewards: {
    stones: number
    experience: number
  }
}

export const useBattleStore = defineStore('battle', () => {
  // Статистика боя
  const stats = ref<BattleStats>({
    totalEnemiesDefeated: 0,
    totalTaps: 0,
    totalDamageDealt: 0,
    totalCriticalHits: 0,
    enemiesByType: {},
    battleHistory: [],
  })

  // Текущее сражение (временные данные для одного боя)
  const currentBattle = ref<{
    startTime: number
    enemyName: string
    taps: number
    damage: number
    criticals: number
  } | null>(null)

  // Геттеры для аналитики
  const averageTapsPerKill = computed(() => {
    if (stats.value.totalEnemiesDefeated === 0) return 0
    return Math.round(stats.value.totalTaps / stats.value.totalEnemiesDefeated)
  })

  const criticalRate = computed(() => {
    if (stats.value.totalTaps === 0) return 0
    return (stats.value.totalCriticalHits / stats.value.totalTaps) * 100
  })

  const mostDefeatedEnemy = computed(() => {
    let max = 0
    let name = 'Нет'
    Object.entries(stats.value.enemiesByType).forEach(([enemy, count]) => {
      if (count > max) {
        max = count
        name = enemy
      }
    })
    return { name, count: max }
  })

  const totalDamage = computed(() => stats.value.totalDamageDealt)
  const totalEnemiesDefeated = computed(() => stats.value.totalEnemiesDefeated)

  // Действия
  function startBattle(enemy: Enemy) {
    currentBattle.value = {
      startTime: Date.now(),
      enemyName: enemy.name,
      taps: 0,
      damage: 0,
      criticals: 0,
    }
  }

  function recordTap(damage: number, isCritical: boolean) {
    // Общая статистика
    stats.value.totalTaps++
    stats.value.totalDamageDealt += damage

    if (isCritical) {
      stats.value.totalCriticalHits++
    }

    // Текущий бой
    if (currentBattle.value) {
      currentBattle.value.taps++
      currentBattle.value.damage += damage
      if (isCritical) {
        currentBattle.value.criticals++
      }
    }

    saveToLocalStorage()
  }

  function recordVictory(enemy: Enemy, rewards: { stones: number; experience: number }) {
    // Увеличиваем счетчик побежденных врагов
    stats.value.totalEnemiesDefeated++

    // Статистика по типу врага
    const type = enemy.name
    stats.value.enemiesByType[type] = (stats.value.enemiesByType[type] || 0) + 1

    // Запись в историю
    if (currentBattle.value) {
      const record: BattleRecord = {
        timestamp: Date.now(),
        enemyName: enemy.name,
        tapsToKill: currentBattle.value.taps,
        damageDealt: currentBattle.value.damage,
        criticalHits: currentBattle.value.criticals,
        rewards,
      }

      stats.value.battleHistory.unshift(record)

      // Ограничим историю последними 50 записями
      if (stats.value.battleHistory.length > 50) {
        stats.value.battleHistory.pop()
      }

      currentBattle.value = null
    }

    saveToLocalStorage()
  }

  function resetBattle() {
    currentBattle.value = null
  }

  function clearStats() {
    stats.value = {
      totalEnemiesDefeated: 0,
      totalTaps: 0,
      totalDamageDealt: 0,
      totalCriticalHits: 0,
      enemiesByType: {},
      battleHistory: [],
    }
    saveToLocalStorage()
  }

  // Сохранение и загрузка
  function saveToLocalStorage() {
    localStorage.setItem('battleStats', JSON.stringify(stats.value))
  }

  function loadFromLocalStorage() {
    const saved = localStorage.getItem('battleStats')
    if (saved) {
      try {
        stats.value = JSON.parse(saved)
      } catch (e) {
        console.error('Failed to load battle stats:', e)
      }
    }
  }

  function init() {
    loadFromLocalStorage()
  }

  return {
    // Состояние
    stats,
    currentBattle,

    // Геттеры
    averageTapsPerKill,
    criticalRate,
    mostDefeatedEnemy,
    totalDamage,
    totalEnemiesDefeated,

    // Действия
    startBattle,
    recordTap,
    recordVictory,
    resetBattle,
    clearStats,
    init,
  }
})
