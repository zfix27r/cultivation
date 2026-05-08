import type {
  BattleAttackResponse,
  BattleVictoryResponse
} from '@/server/battle'

import type { BattleAttackResult } from '@/data/battle/attack/BattleAttackResult'
import type { BattleAttackData } from '@/data/battle/attack/BattleAttackData'
import type { BattleVictoryData } from '@/data/battle/attack/BattleVictoryData'
import { BattleAttackType } from '@/data/battle/attack/BattleAttackType'
import { BaseRemote } from '@/data/BaseRemote'

export class BattleAttackRemote extends BaseRemote<(BattleAttackResponse | BattleVictoryResponse), BattleAttackResult> {
  protected parseResponse(
    response: BattleAttackResponse | BattleVictoryResponse
  ): BattleAttackResult | null {
    if (response.type === BattleAttackType.ATTACK) {
      return this.toAttackData(response)
    } else if (response.type === BattleAttackType.VICTORY) {
      return this.toVictoryData(response)
    }

    return null
  }

  private toAttackData(response: BattleAttackResponse): BattleAttackData {
    return {
      type: BattleAttackType.ATTACK,
      enemy: response.enemy
    }
  }

  private toVictoryData(response: BattleVictoryResponse): BattleVictoryData {
    return {
      type: BattleAttackType.VICTORY,
      player: response.player,
      playerForm: response.playerForm,
      playerEnergy: response.playerEnergy,
      playerSpirit: response.playerSpirit,
      enemy: response.enemy,
      reward: response.reward,
    }
  }
}
