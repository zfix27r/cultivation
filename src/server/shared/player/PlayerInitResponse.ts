import type { PlayerResponse } from './'
import { PlayerResponseType } from './'

export interface PlayerInitResponse extends PlayerResponse {
  type: PlayerResponseType.INIT
}
