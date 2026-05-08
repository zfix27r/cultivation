import type { BattleAttackType } from '@/data/battle/attack/BattleAttackType'
import type {
  Enemy,
  EnemyReward,
  Player,
  PlayerEnergy,
  PlayerForm,
  PlayerSpirit,
} from '@/data/battle/attack/BattleVictoryData'

import type { BattleResponse } from '@/server/battle/BattleResponse'

export interface BattleVictoryResponse extends BattleResponse {
  type: BattleAttackType
  player: Player
  playerForm?: PlayerForm
  playerEnergy?: PlayerEnergy
  playerSpirit?: PlayerSpirit
  enemy: Enemy
  reward?: EnemyReward
}
