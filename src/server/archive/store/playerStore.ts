// src/stores/playerStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Player } from '@/core/entities/Player'

export const usePlayerStore = defineStore('player', () => {
  // Начальные значения игрока
  const player = ref<Player>(
    new Player(
      crypto.randomUUID(),
      100, // spiritStones
      50, // qi
      30, // energy
      1, // cultivationLevel
      0, // experience
      0, // totalTaps
      0, // enemiesDefeated
    ),
  )

  // Геттеры для удобного доступа
  const spiritStones = computed(() => player.value.spiritStones)
  const qi = computed(() => player.value.qi)
  const energy = computed(() => player.value.energy)
  const level = computed(() => player.value.cultivationLevel)
  const experience = computed(() => player.value.experience)
  const totalTaps = computed(() => player.value.totalTaps)
  const enemiesDefeated = computed(() => player.value.enemiesDefeated)

  // Прогресс до следующего уровня
  const experienceProgress = computed(() => {
    const expNeeded = player.value.cultivationLevel * 100
    return (player.value.experience / expNeeded) * 100
  })

  const experienceToNextLevel = computed(() => {
    return player.value.cultivationLevel * 100 - player.value.experience
  })

  // Действия с ресурсами
  function addSpiritStones(amount: number) {
    if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
      console.warn('Invalid spirit stones amount:', amount)
      return
    }
    player.value.spiritStones += amount
    saveToLocalStorage()
  }

  function spendSpiritStones(amount: number): boolean {
    if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
      console.warn('Invalid spend amount:', amount)
      return false
    }

    if (player.value.spiritStones >= amount) {
      player.value.spiritStones -= amount
      saveToLocalStorage()
      return true
    }
    return false
  }

  function addQi(amount: number) {
    if (typeof amount !== 'number' || isNaN(amount) || amount < 0) return
    player.value.qi += amount
    saveToLocalStorage()
  }

  function addEnergy(amount: number) {
    if (typeof amount !== 'number' || isNaN(amount) || amount < 0) return
    player.value.energy += amount
    saveToLocalStorage()
  }

  // Опыт и уровни
  function addExperience(amount: number) {
    if (typeof amount !== 'number' || isNaN(amount) || amount < 0) return
    player.value.addExperience(amount)
    saveToLocalStorage()
  }

  // Счетчики
  function incrementTotalTaps() {
    player.value.totalTaps++
    saveToLocalStorage()
  }

  function incrementEnemiesDefeated() {
    player.value.enemiesDefeated++
    saveToLocalStorage()
  }

  // Сохранение и загрузка
  function saveToLocalStorage() {
    localStorage.setItem('player', JSON.stringify(player.value.toJSON()))
  }

  function loadFromLocalStorage() {
    const saved = localStorage.getItem('player')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        player.value = new Player(
          crypto.randomUUID(),
          data.spiritStones || 100,
          data.qi || 50,
          data.energy || 30,
          data.cultivationLevel || 1,
          data.experience || 0,
          data.totalTaps || 0,
          data.enemiesDefeated || 0,
        )
      } catch (e) {
        console.error('Failed to load player:', e)
      }
    }
  }

  // Сброс игрока
  function resetPlayer() {
    player.value = new Player(crypto.randomUUID(), 100, 50, 30, 1, 0, 0, 0)
    saveToLocalStorage()
  }

  function savePlayer() {
    saveToLocalStorage()
  }

  // Инициализация
  function init() {
    loadFromLocalStorage()
  }

  return {
    // Состояние
    player,

    // Геттеры
    spiritStones,
    qi,
    energy,
    level,
    experience,
    totalTaps,
    enemiesDefeated,
    experienceProgress,
    experienceToNextLevel,

    // Действия с ресурсами
    addSpiritStones,
    spendSpiritStones,
    addQi,
    addEnergy,

    // Опыт и уровни
    addExperience,

    // Счетчики
    incrementTotalTaps,
    incrementEnemiesDefeated,

    // Управление
    saveToLocalStorage,
    loadFromLocalStorage,
    savePlayer,
    resetPlayer,
    init,
  }
})
