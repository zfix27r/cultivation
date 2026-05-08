import type { PlayerInitResponse } from '@/server/shared/player'
import { global } from '@/server/global/GlobalManager'
import type { GameDatabase } from '@/server/database/GameDatabase'
import { PlayerDbController } from '@/server/player/PlayerDbController'
import { PlayerResponseType } from '@/server/shared/player'

export interface ApiPlayer {
  init(): Promise<PlayerInitResponse>
}

export class ApiPlayerImpl implements ApiPlayer {
  private dbController: PlayerDbController

  constructor(db: GameDatabase) {
    this.dbController = new PlayerDbController(db)
  }

  async init(): Promise<PlayerInitResponse> {
    global.player = await this.dbController.getPlayerData()

    return {
      type: PlayerResponseType.INIT,
    }
  }
}
