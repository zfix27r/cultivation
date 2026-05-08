import { BattleAttackRequest } from '@/server/battle/attack/BattleAttackRequest'
import { BattleDbController } from '@/server/battle/BattleDbController'
import type { GameDatabase } from '@/server/database/GameDatabase'
import { controller } from '@/server/GameController'
import { global } from '@/server/global/GlobalManager'

import { BattleAttackType } from '@/data/battle'

import type { BattleAttackResponse } from './attack/BattleAttackMainResponse'
import type { BattleVictoryResponse } from './attack/BattleAttackVictoryResponse'
import type { BattleInitResponse } from './init/BattleInitResponse'

import { battleModule } from '@cultivation/server'

export interface BattleApi {
  init(): Promise<BattleInitResponse | null>
  attack(): Promise<BattleAttackResponse | BattleVictoryResponse | null>
}

export class ApiBattleImpl implements ApiBattle {
  async init(): Promise<BattleInitResponse | null> {
    if (global.isNotInitBattle()) {
      await this.initNewBattle()
    }

    return this.getInitResponse()
  }

  async attack(): Promise<BattleAttackResponse | BattleVictoryResponse | null> {
    const request = new BattleAttackRequest()
    return await request.execute()
  }

  private getRealmName(realm: number): string {
    switch (realm) {
      case 1:
        return 'Смертное тело'
      default:
        return ''
    }
  }
}
