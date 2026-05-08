import type { BattleInitResponse } from '@/server/battle'
import type { BattleInitResult } from '@/data/battle/init/BattleInitResult'
import { BaseRemote } from '@/data/BaseRemote'

export class BattleInitRemote extends BaseRemote<BattleInitResponse, BattleInitResult> {
  protected parseResponse(
    response: BattleInitResponse
  ): BattleInitResult | null {
    return this.toInitData(response)
  }

  private toInitData(response: BattleInitResponse): BattleInitResult {
    return {
      player: response.player,
      playerForm: response.playerForm,
      playerEnergy: response.playerEnergy,
      playerSpirit: response.playerSpirit,
      enemy: response.enemy
    }
  }
}
