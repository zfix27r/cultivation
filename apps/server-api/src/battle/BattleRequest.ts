import { GlobalRequest } from '@/server/global/GlobalRequest'
import { BattleResponse } from './BattleResponse'

export abstract class BattleRequest extends GlobalRequest<BattleResponse> {

}
