import type { GlobalResponse } from '@/server/global/GlobalResponse'
import type { BattleAttackType } from '@/data/battle/attack/BattleAttackType'

export interface BattleResponse extends GlobalResponse {
  type: BattleAttackType
}
