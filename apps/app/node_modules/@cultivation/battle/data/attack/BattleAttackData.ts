import type { BattleAttackType } from './BattleAttackType'
import type { BaseResult } from '../BaseResult'
import type { EnemyData } from '../enemy/EnemyData'

export interface BattleAttackData extends BaseResult {
  type: typeof BattleAttackType.ATTACK,
  enemy: Pick<EnemyData, 'health'>
}
