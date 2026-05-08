import type { BattleResponse } from '@battle/BattleResponse'
import type { BattleAttackType } from '@/battle/attack/BattleAttackType'
import type { EnemyModel } from '@models/EnemyModel'


export type BattleAttackEnemyModel = Pick<
  EnemyModel,
  'health'
>

export interface BattleAttackResponse extends BattleResponse {
  type: BattleAttackType
  enemy: BattleAttackEnemyModel
}
