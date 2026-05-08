import type { IPlayerServerModel } from '@/server/player/IPlayerServerModel'
import type { ApiPlayerResultType } from '@/server/player/ApiPlayerResultType'

export type ApiPlayerResult =
  | {
    type: ApiPlayerResultType.LOAD,
    player: IPlayerServerModel
  }
