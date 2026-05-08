import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Milestone, MilestoneChoice } from '@/server/archive/types/milestone.types'
import { useGameStore } from './gameStore'

export const useMilestoneStore = defineStore('milestones', () => {
  const gameStore = useGameStore()

  // Состояние
  const availableMilestones = ref<Milestone[]>([])
  const completedMilestones = ref<string[]>([])
  const pendingMilestone = ref<Milestone | null>(null)

  // Все доступные судьбоносные события
  const milestoneDefinitions: Milestone[] = [
    {
      id: 'breakthrough_1',
      title: 'Первый прорыв',
      description: 'Вы чувствуете, что ци переполняет ваше тело. Настало время выбрать путь.',
      icon: '🌟',
      requirements: {
        type: 'enemiesDefeated',
        value: 5,
      },
      isAvailable: false,
      isCompleted: false,
      choices: [
        {
          id: 'path_strength',
          text: 'Путь силы',
          description: 'Увеличивает базовый урон на 100%',
          icon: '⚔️',
          effect: () => {
            gameStore.upgradeTapDamagePermanently(1) // +100% базового урона
            gameStore.addToLog('🌟 Вы встали на Путь силы! Урон удвоен')
          },
        },
        {
          id: 'path_speed',
          text: 'Путь скорости',
          description: 'Авто-тап срабатывает в 2 раза чаще',
          icon: '⚡',
          effect: () => {
            gameStore.upgradeTapSpeedPermanently(1) // +100% скорости
            gameStore.addToLog('🌟 Вы встали на Путь скорости! Авто-тап ускорен')
          },
        },
        {
          id: 'path_wealth',
          text: 'Путь богатства',
          description: 'Камни духа капают на 50% быстрее',
          icon: '💎',
          effect: () => {
            gameStore.upgradeStoneGeneration(0.5) // +50% генерации
            gameStore.addToLog('🌟 Вы встали на Путь богатства! Доход увеличен')
          },
        },
      ],
    },
    {
      id: 'breakthrough_2',
      title: 'Просветление',
      description: 'Ваше понимание ци углубляется. Откройте новую грань силы.',
      icon: '✨',
      requirements: {
        type: 'level',
        value: 3,
      },
      isAvailable: false,
      isCompleted: false,
      choices: [
        {
          id: 'critical_mastery',
          text: 'Мастер критического удара',
          description: 'Шанс крита увеличен до 20%',
          icon: '🎯',
          effect: () => {
            gameStore.upgradeCriticalChance(0.15) // +15% к шансу крита
          },
        },
        {
          id: 'vampiric_touch',
          text: 'Вампирический удар',
          description: '5% шанс восстановить 1 энергию при ударе',
          icon: '🩸',
          effect: () => {
            gameStore.unlockVampiricTouch()
          },
        },
        {
          id: 'chain_lightning',
          text: 'Цепная молния',
          description: 'Урон тапа может поразить дополнительного врага',
          icon: '⚡',
          effect: () => {
            gameStore.unlockChainLightning()
          },
        },
      ],
    },
    {
      id: 'breakthrough_3',
      title: 'Единство с природой',
      description: 'Духи леса открывают вам свои секреты.',
      icon: '🌳',
      requirements: {
        type: 'taps',
        value: 1000,
      },
      isAvailable: false,
      isCompleted: false,
      choices: [
        {
          id: 'nature_blessing',
          text: 'Благословение природы',
          description: 'Каждые 10 секунд восстанавливает 5 здоровья',
          icon: '🌿',
          effect: () => {
            //gameStore.unlockNatureBlessing()
          },
        },
        {
          id: 'poison_touch',
          text: 'Ядовитое касание',
          description: 'Урон тапа отравляет врага (доп урон со временем)',
          icon: '☠️',
          effect: () => {
            gameStore.unlockPoisonTouch()
          },
        },
        {
          id: 'roots',
          text: 'Корни земли',
          description: 'Замедляет врага на 20%',
          icon: '🌱',
          effect: () => {
            //gameStore.unlockRoots()
          },
        },
      ],
    },
  ]

  // Проверка доступных Milestones
  function checkAvailableMilestones() {
    const newAvailable: Milestone[] = []

    milestoneDefinitions.forEach((milestone) => {
      // Пропускаем уже завершенные
      if (completedMilestones.value.includes(milestone.id)) return

      // Проверяем требования
      let requirementMet = false
      switch (milestone.requirements.type) {
        case 'enemiesDefeated':
          requirementMet = gameStore.resources.enemiesDefeated >= milestone.requirements.value
          break
        case 'level':
          requirementMet = gameStore.resources.cultivationLevel >= milestone.requirements.value
          break
        case 'taps':
          requirementMet = gameStore.resources.totalTaps >= milestone.requirements.value
          break
        case 'stones':
          requirementMet = gameStore.resources.spiritStones >= milestone.requirements.value
          break
      }

      if (requirementMet && !availableMilestones.value.find((m) => m.id === milestone.id)) {
        newAvailable.push({
          ...milestone,
          isAvailable: true,
          isCompleted: false,
        })
      }
    })

    if (newAvailable.length > 0) {
      availableMilestones.value.push(...newAvailable)
      // Если нет текущего ожидающего, показываем первый доступный
      if (!pendingMilestone.value && availableMilestones.value.length > 0) {
        pendingMilestone.value = availableMilestones.value[0]
        gameStore.addToLog(`🌟 Открыто новое судьбоносное событие: ${pendingMilestone.value.title}`)
      }
    }
  }

  // Выбор пути в Milestone
  function chooseMilestoneChoice(choice: MilestoneChoice) {
    if (!pendingMilestone.value) return

    // Применяем эффект
    choice.effect(gameStore)

    // Отмечаем как завершенный
    completedMilestones.value.push(pendingMilestone.value.id)

    // Удаляем из доступных
    availableMilestones.value = availableMilestones.value.filter(
      (m) => m.id !== pendingMilestone.value?.id,
    )

    // Очищаем текущий
    pendingMilestone.value = null

    // Проверяем, есть ли еще доступные
    if (availableMilestones.value.length > 0) {
      pendingMilestone.value = availableMilestones.value[0]
    }

    // Сохраняем прогресс
    gameStore.saveGame()
  }

  // Пропустить текущий Milestone (можно вернуться позже)
  function skipCurrentMilestone() {
    if (!pendingMilestone.value) return
    // Просто убираем из pending, но оставляем в available
    pendingMilestone.value = null
  }

  return {
    availableMilestones,
    completedMilestones,
    pendingMilestone,
    checkAvailableMilestones,
    chooseMilestoneChoice,
    skipCurrentMilestone,
  }
})
