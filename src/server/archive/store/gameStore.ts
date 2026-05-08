// src/stores/gameStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Resources, Enemy } from '@/server/archive/types/game.types'

export const useGameStore = defineStore('game', () => {
  // Состояние
  const resources = ref<Resources>({
    spiritStones: 100,
    qi: 50,
    energy: 30, // Добавлено
    cultivationLevel: 1,
    experience: 0,
    totalTaps: 0, // Добавлено
    enemiesDefeated: 0, // Добавлено
    stoneGenerationMultiplier: 1, // Добавлено
  })

  const currentEnemy = ref<Enemy | null>(null)
  const battleLog = ref<string[]>(['Начало пути культивации...'])

  // Навыки (для будущего расширения)
  const skills = ref({
    tapDamage: 1,
    tapSpeed: 0, // 0 = нет авто-тапа
    criticalChance: 0.05,
    criticalMultiplier: 2,
    vampiricTouch: false, // Добавлено
    chainLightning: false, // Добавлено
    poisonTouch: false, // Добавлено
  })

  // Геттеры
  const tapDamage = computed(() => skills.value.tapDamage)
  const currentLevelProgress = computed(() => {
    const expNeeded = resources.value.cultivationLevel * 100
    return (resources.value.experience / expNeeded) * 100
  })

  // Методы
  function addSpiritStones(amount: number) {
    resources.value.spiritStones += amount * (resources.value.stoneGenerationMultiplier || 1)
  }

  function addQi(amount: number) {
    resources.value.qi += amount
  }

  function addEnergy(amount: number) {
    // Новый метод
    resources.value.energy += amount
  }

  function gainExperience(amount: number) {
    resources.value.experience += amount
    checkLevelUp()
  }

  function checkLevelUp() {
    const expNeeded = resources.value.cultivationLevel * 100
    if (resources.value.experience >= expNeeded) {
      resources.value.cultivationLevel++
      resources.value.experience -= expNeeded
      addToLog(`✨ УРОВЕНЬ ПОВЫШЕН! Теперь вы ${resources.value.cultivationLevel} уровень`)
    }
  }

  function processTap() {
    if (!currentEnemy.value) {
      // Если нет врага - создаем нового
      spawnEnemy()
      return
    }

    resources.value.totalTaps++

    // Расчет урона с критом
    let damage = skills.value.tapDamage
    if (Math.random() < skills.value.criticalChance) {
      damage *= skills.value.criticalMultiplier
      addToLog(`✨ Критический удар! ${damage} урона`)
    }

    // Эффекты навыков
    if (skills.value.vampiricTouch && Math.random() < 0.05) {
      addEnergy(1)
      addToLog(`🩸 Вампиризм: +1 энергия`)
    }

    currentEnemy.value.health -= damage

    // Проверка смерти врага
    if (currentEnemy.value.health <= 0) {
      resources.value.enemiesDefeated++
      addSpiritStones(currentEnemy.value.spiritStonesReward)
      gainExperience(currentEnemy.value.experienceReward)
      addToLog(`🎉 Победа! +${currentEnemy.value.spiritStonesReward} камней`)
      spawnEnemy()
    }
  }

  function spawnEnemy() {
    const level = resources.value.cultivationLevel
    currentEnemy.value = {
      id: crypto.randomUUID(),
      name: `Дух уровня ${level}`,
      health: 50 + level * 20,
      maxHealth: 50 + level * 20,
      attack: 5 + level * 2,
      defense: 2 + level,
      spiritStonesReward: 10 + level * 5,
      qiReward: 5 + level * 2,
      experienceReward: 5 + level * 2,
    }
  }

  function addToLog(message: string) {
    battleLog.value.unshift(`[${new Date().toLocaleTimeString()}] ${message}`)
    if (battleLog.value.length > 50) battleLog.value.pop()
  }

  function checkForMilestone() {
    // Каждые 10 врагов - судьбоносное событие
    if (resources.value.enemiesDefeated % 10 === 0) {
      addToLog('🌟 Вы чувствуете, что стоите на пороге великого прорыва!')
      // Здесь будет триггер для экрана Milestones
    }
  }

  // Методы для навыков
  function upgradeTapDamage() {
    if (resources.value.spiritStones >= 100) {
      resources.value.spiritStones -= 100
      skills.value.tapDamage++
      addToLog(`⚔️ Урон тапа увеличен до ${skills.value.tapDamage}`)
    }
  }

  function upgradeTapSpeed() {
    if (resources.value.spiritStones >= 200) {
      resources.value.spiritStones -= 200
      skills.value.tapSpeed++
      addToLog(`🤖 Скорость авто-тапа увеличена до ${skills.value.tapSpeed}/сек`)
    }
  }

  function getTapSpeed() {
    return skills.value.tapSpeed
  }

  function initGame() {
    spawnEnemy()
  }

  function saveGame() {
    const saveData = {
      resources: resources.value,
      skills: skills.value,
      battleLog: battleLog.value.slice(0, 20),
    }
    localStorage.setItem('cultivationSave', JSON.stringify(saveData))
    addToLog('💾 Игра сохранена')
  }

  function loadGame() {
    const saved = localStorage.getItem('cultivationSave')
    if (saved) {
      try {
        const saveData = JSON.parse(saved)
        resources.value = saveData.resources
        skills.value = saveData.skills
        battleLog.value = [...saveData.battleLog, '🔄 Загружено сохранение']
      } catch (e) {
        console.error('Failed to load save:', e)
      }
    }
  }

  // Добавить методы для прокачки, которые будут вызываться из Milestones
  function upgradeTapDamagePermanently(multiplier: number) {
    skills.value.tapDamage *= 1 + multiplier
  }

  function upgradeTapSpeedPermanently(multiplier: number) {
    skills.value.tapSpeed *= 1 + multiplier
  }

  function upgradeStoneGeneration(percent: number) {
    // Будет использоваться в idle генерации
    resources.value.stoneGenerationMultiplier =
      (resources.value.stoneGenerationMultiplier || 1) + percent
  }

  function upgradeCriticalChance(additional: number) {
    skills.value.criticalChance += additional
    addToLog(`🌟 Шанс крита увеличен до ${Math.round(skills.value.criticalChance * 100)}%`)
  }

  function unlockVampiricTouch() {
    skills.value.vampiricTouch = true
    addToLog(`🌟 Открыт вампирический удар!`)
  }

  function unlockChainLightning() {
    skills.value.chainLightning = true
    addToLog(`🌟 Открыта цепная молния!`)
  }

  function unlockPoisonTouch() {
    skills.value.poisonTouch = true
    addToLog(`🌟 Открыто ядовитое касание!`)
  }

  return {
    resources,
    currentEnemy,
    battleLog,
    tapDamage,
    currentLevelProgress,
    processTap,
    addSpiritStones,
    addQi,
    addEnergy,
    gainExperience,
    upgradeTapDamage,
    upgradeTapSpeed,
    upgradeTapDamagePermanently,
    upgradeTapSpeedPermanently,
    upgradeStoneGeneration,
    upgradeCriticalChance,
    unlockVampiricTouch,
    unlockChainLightning,
    unlockPoisonTouch,
    getTapSpeed,
    initGame,
    saveGame,
    loadGame,
    addToLog,
    checkForMilestone,
  }
})
