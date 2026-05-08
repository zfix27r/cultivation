import { defineStore } from 'pinia'
import { ref } from 'vue'

import { di, REPOSITORY_TOKENS } from 'apps/app/src'
import { api } from '../server/Api'

api.battle.attack

import {
  createEnemy,
  createPlayer,
  createPlayerEnergy,
  createPlayerForm,
  createPlayerSpirit
} from './battleDataCreator'

import {
  BattleRepository,
  BattleInitResult,
  BattleAttackData,
  BattleVictoryData,
  BattleAttackResult,
  BattleAttackType,
} from '@/data/battle'

import { useFeedStore } from '@/ui/feed/useFeedStore'
import { useEventStore } from '@/ui/event/useEventStore'

export const useBattleStore = defineStore('battle', () => {
  const player = ref<BattleInitResult['player']>(createPlayer)
  const playerForm = ref<BattleInitResult['playerForm']>(createPlayerForm)
  const playerEnergy = ref<BattleInitResult['playerEnergy']>(createPlayerEnergy)
  const playerSpirit = ref<BattleInitResult['playerSpirit']>(createPlayerSpirit)
  const enemy = ref<BattleInitResult['enemy']>(createEnemy)

  const feedStore = useFeedStore()
  const eventStore = useEventStore()

  const repository: BattleRepository = di.get(REPOSITORY_TOKENS.BATTLE)

  const init = async () => {
    const result = await repository.init()
    updateInitData(result)
  }

  function updateInitData(data: BattleInitResult | null) {
    if (data) {
      if (data.player) Object.assign(player.value, data.player)
      if (data.playerForm) Object.assign(playerForm.value, data.playerForm)
      if (data.playerEnergy) Object.assign(playerEnergy.value, data.playerEnergy)
      if (data.playerSpirit) Object.assign(playerSpirit.value, data.playerSpirit)
      if (data.enemy) Object.assign(enemy.value, data.enemy)
      if (data.event) eventStore.add(data.event)
    }
  }

  function updateAttackData(data: BattleAttackResult | null) {
    if (data) {
      switch (data.type) {
        case BattleAttackType.ATTACK:
          updateAfterAttack(data as BattleAttackData)
        case BattleAttackType.VICTORY:
          updateAfterVictory(data as BattleVictoryData)
      }
    }
  }

  function updateAfterAttack(data: BattleAttackData) {
    if (data.enemy) Object.assign(enemy.value, data.enemy)
  }

  function updateAfterVictory(data: BattleVictoryData) {
    if (data.player) Object.assign(player.value, data.player)
    if (data.playerForm) Object.assign(playerForm.value, data.playerForm)
    if (data.playerEnergy) Object.assign(playerEnergy.value, data.playerEnergy)
    if (data.playerSpirit) Object.assign(playerSpirit.value, data.playerSpirit)
    if (data.enemy) Object.assign(enemy.value, data.enemy)
    if (data.feed) feedStore.add(data.feed)
    if (data.event) eventStore.add(data.event)
  }

  return {
    player,
    playerForm,
    playerEnergy,
    playerSpirit,
    enemy,

    init,
    updateInitData,
    updateAttackData,
  }
})
