import { defineStore } from 'pinia'
import { computed, type Ref } from 'vue'
import { DiContainer, DiRepositoryTokens } from 'apps/app/src'
import { IBattleEnemyDataModel } from '@/data/battle/IBattleEnemyDataModel'

export const battleContentStore = defineStore('battleContentStore', () => {
  const repository = DiContainer.getInstance().get(DiRepositoryTokens.BATTLE_REPOSITORY)
  const enemy: Ref<IBattleEnemyDataModel | null> = repository.enemy

  repository.load()

  const hasEnemy = computed(() => enemy.value !== null)

  const healthPercent = computed(() => {
    if (enemy.value === null)
      return 0
    else
      return Math.round((enemy.value.health / enemy.value.maxHealth) * 100)
  })

  const healthColor = computed(() => {
    const percent = healthPercent.value ?? 0

    if (percent > 60) return '#4caf50'
    else if (percent > 30) return '#ff9800'
    else return '#f44336'
  })

  async function damageEnemy() {
    repository.actionDamageEnemy()
  }


  /*

  function clearEnemy() {
    enemy.value = null
    //saveToLocalStorage()
  }
    // Сохранение в localStorage
    function saveToLocalStorage() {
      if (enemy.value) {
        localStorage.setItem('currentEnemy', JSON.stringify(enemy.value))
      } else {
        localStorage.removeItem('currentEnemy')
      }

      //localStorage.setItem('enemyStats', JSON.stringify(defeatedEnemies.value))
    }

    // Загрузка из localStorage
    function loadFromLocalStorage() {
      const savedEnemy = localStorage.getItem('currentEnemy')
      if (savedEnemy) {
        try {
          const data = JSON.parse(savedEnemy)
          _enemyModel.value = new AppEnemyModel(
            data.id,
            data.name,
            data.health,
            data.maxHealth,
            data.attack,
            data.defense,
            data.spiritStonesReward,
          )
        } catch (e) {
          console.error('Failed to load enemy:', e)
        }
      }

      const savedStats = localStorage.getItem('enemyStats')
      if (savedStats) {
        try {
          //defeatedEnemies.value = JSON.parse(savedStats)
        } catch (e) {
          console.error('Failed to load enemy stats:', e)
        }
      }
    }

    // Инициализация

  */


  return {
    enemy,
    hasEnemy,
    healthPercent,
    healthColor,
    damageEnemy
  }
})
