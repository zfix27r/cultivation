import { defineStore, storeToRefs } from 'pinia'
import { computed } from 'vue'
import { di, REPOSITORY_TOKENS } from 'apps/app/src'
import { useBattleStore } from '@/ui/useBattleStore'
import { BattleRepository } from '@/data/battle'

export const useBattleContentStore = defineStore('battleContent', () => {
  const store = useBattleStore()
  const { player, enemy } = storeToRefs(store)

  const repository: BattleRepository = di.get(REPOSITORY_TOKENS.BATTLE)

  const healthPercent = computed(() => {
    if (enemy.value === null) return 0
    else return Math.round((enemy.value.health / enemy.value.maxHealth) * 100)
  })

  const healthColor = computed(() => {
    if (healthPercent.value > 60) return '#4caf50'
    else if (healthPercent.value > 30) return '#ff9800'
    else return '#f44336'
  })

  async function actionDamageEnemy() {
    if (isNotInit()) return
    const result = await repository.attack()

    store.updateAttackData(result)
  }

  function isNotInit(): boolean {
    return player.value === null || enemy.value === null
  }

  return {
    enemy,
    healthPercent,
    healthColor,
    actionDamageEnemy
  }
})
