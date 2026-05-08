import '@/server/server-extentions'
import { GameDatabase } from '@/server/database/GameDatabase'

import type { ApiBattle } from '@/server/battle/ApiBattle'
import { ApiBattleImpl } from '@/server/battle/ApiBattle'
import type { ApiPlayer } from '@/server/player/ApiPlayer'
import { ApiPlayerImpl } from '@/server/player/ApiPlayer'

export interface Api {
  player: ApiPlayer
  battle: ApiBattle
}

class ApiImpl implements Api {
  private static instance: Api
  private db: GameDatabase = GameDatabase.getInstance()

  public player: ApiPlayer = new ApiPlayerImpl(this.db)
  public battle: ApiBattle = new ApiBattleImpl(this.db)

  static getInstance(): Api {
    if (!ApiImpl.instance) {
      ApiImpl.instance = new ApiImpl()
    }
    return ApiImpl.instance
  }
}

export const api = ApiImpl.getInstance()
