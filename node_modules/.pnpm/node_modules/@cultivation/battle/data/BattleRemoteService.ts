import type { ApiBattle, BattleInitResponse, BattleAttackResponse, BattleVictoryResponse } from '@/server/battle'
import type { BattleInitResult } from '@/data/battle/init/BattleInitResult'
import type { BattleAttackResult } from '@/data/battle/attack/BattleAttackResult'

import { BattleInitRemote } from '@/data/battle/init/BattleInitRemote'
import { BattleAttackRemote } from '@/data/battle/attack/BattleAttackRemote'

export class BattleRemoteService {
  private api: ApiBattle
  private attackRemote: BattleAttackRemote
  private initRemote: BattleInitRemote

  constructor(api: ApiBattle) {
    this.api = api
    this.initRemote = new BattleInitRemote()
    this.attackRemote = new BattleAttackRemote()
  }

  async init(): Promise<BattleInitResult | null> {
    const response: BattleInitResponse | null = await this.api.init()
    return this.initRemote.getResult(response)
  }

  async attack(): Promise<BattleAttackResult | null> {
    const response: BattleAttackResponse | BattleVictoryResponse | null = await this.api.attack()
    return this.attackRemote.getResult(response)
  }
}
