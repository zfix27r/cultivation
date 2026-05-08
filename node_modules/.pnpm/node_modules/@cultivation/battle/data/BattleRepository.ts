import type { ApiBattle } from '@/server/battle'
import type { BattleInitResult } from '@/data/battle/init/BattleInitResult'
import type { BattleAttackResult } from '@/data/battle/attack/BattleAttackResult'
import { BattleRemoteService } from '@/data/battle/BattleRemoteService'
import { BaseRepository } from '@/data/BaseRepository'
import { BattleAttackType } from './attack/BattleAttackType'

export interface BattleRepository {
  init(): Promise<BattleInitResult | null>
  attack(): Promise<BattleAttackResult | null>
}

export class BattleRepositoryImpl extends BaseRepository implements BattleRepository {
  private remoteService: BattleRemoteService

  constructor(api: ApiBattle) {
    super()

    this.remoteService = new BattleRemoteService(api)
  }

  async init(): Promise<BattleInitResult | null> {
    return this.execute(() => this.remoteService.init())
  }

  async attack(): Promise<BattleAttackResult | null> {
    return this.execute(async () => {
      const result = await this.remoteService.attack()

      if (result?.type === BattleAttackType.VICTORY) {
        result.feed = this.feedRepository.buildVictoryFeed(result)
      }

      return result
    })
  }


}
