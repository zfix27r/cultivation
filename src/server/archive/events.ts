import type { Event, Enemy } from '@/server/archive/types/game.types'

const enemies: Record<string, Enemy> = {
  weakDemon: {
    id: 'weakDemon',
    name: 'Слабый демон',
    health: 50,
    maxHealth: 50,
    attack: 10,
    defense: 5,
    spiritStonesReward: 20,
    qiReward: 5,
  },
  spiritBeast: {
    id: 'spiritBeast',
    name: 'Духовный зверь',
    health: 80,
    maxHealth: 80,
    attack: 15,
    defense: 10,
    spiritStonesReward: 35,
    qiReward: 10,
  },
}

// События
export const events: Record<string, Event> = {
  // Событие по умолчанию (если что-то пошло не так)
  default: {
    id: 'default',
    description: 'Вы медитируете в тишине...',
    choices: [
      {
        id: 'meditate',
        text: 'Продолжить медитацию',
        execute: (state) => ({
          success: true,
          message: 'Вы чувствуете прилив ци',
          rewards: {
            qi: 5,
          },
        }),
      },
      {
        id: 'explore',
        text: 'Исследовать окрестности',
        execute: (state) => ({
          success: true,
          message: 'Вы нашли несколько камней духа',
          rewards: {
            spiritStones: 10,
          },
        }),
      },
    ],
  },

  // Начальное событие
  start: {
    id: 'start',
    description: 'Вы только начинаете свой путь культивации. Перед вами развилка:',
    choices: [
      {
        id: 'goForest',
        text: 'Пойти в лес (безопасно)',
        execute: (state) => ({
          success: true,
          message: 'Вы вошли в лес. Здесь спокойно, но ресурсов мало',
          rewards: {
            spiritStones: 5,
            experience: 10,
          },
          nextEventId: 'forest',
        }),
      },
      {
        id: 'goMountains',
        text: 'Пойти в горы (опасно)',
        requirements: {
          cultivationLevel: 1,
        },
        execute: (state) => ({
          success: true,
          message: 'Вы направились к горам...',
          nextEventId: 'mountains',
        }),
      },
      {
        id: 'meditate',
        text: 'Остаться медитировать',
        execute: (state) => ({
          success: true,
          message: 'Вы медитировали и почувствовали ци',
          rewards: {
            qi: 10,
            experience: 5,
          },
        }),
      },
    ],
  },

  forest: {
    id: 'forest',
    description: 'Вы в лесу. Слышен шум листвы...',
    choices: [
      {
        id: 'gather',
        text: 'Собрать травы',
        execute: (state) => ({
          success: true,
          message: 'Вы нашли целебные травы и обменяли их на камни',
          rewards: {
            spiritStones: 15,
            experience: 5,
          },
        }),
      },
      {
        id: 'hunt',
        text: 'Поохотиться',
        execute: (state) => {
          const success = Math.random() > 0.3
          if (success) {
            return {
              success: true,
              message: 'Вы поймали духовного зайца!',
              rewards: {
                spiritStones: 25,
                qi: 5,
                experience: 15,
              },
            }
          } else {
            return {
              success: false,
              message: 'Охота не удалась, но вы набрались опыта',
              rewards: {
                experience: 5,
              },
            }
          }
        },
      },
    ],
  },

  mountains: {
    id: 'mountains',
    description: 'В горах вы встретили демона!',
    choices: [
      {
        id: 'fight',
        text: 'Сразиться (80% успеха)',
        cost: {
          spiritStones: 0,
        },
        execute: (state) => {
          const success = Math.random() < 0.8
          if (success) {
            return {
              success: true,
              message: 'Вы победили демона!',
              rewards: {
                spiritStones: 50,
                qi: 20,
                experience: 50,
              },
            }
          } else {
            return {
              success: false,
              message: 'Демон ранил вас, вы отступили',
              rewards: {
                experience: 10,
              },
            }
          }
        },
      },
      {
        id: 'useTalisman',
        text: 'Использовать талисман',
        cost: {
          spiritStones: 50,
        },
        execute: (state) => ({
          success: true,
          message: 'Талисман испепелил демона!',
          rewards: {
            spiritStones: 30, // Меньше, чем при победе, так как потратились на талисман
            qi: 30,
            experience: 40,
          },
        }),
      },
      {
        id: 'run',
        text: 'Убежать',
        execute: (state) => ({
          success: true,
          message: 'Вы убежали в безопасное место',
          nextEventId: 'start',
        }),
      },
    ],
  },
}
