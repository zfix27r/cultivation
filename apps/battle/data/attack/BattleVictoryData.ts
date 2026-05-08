import type { BaseResult } from '../BaseResult'
import type { BattleAttackType } from './BattleAttackType'
import type { EnemyData } from '../enemy/EnemyData'
import type { EnemyRewardData } from '../enemy/EnemyRewardData'
import type { PlayerData } from '../player/PlayerData'
import type { PlayerEnergyData } from '../player/PlayerEnergyData'
import type { PlayerFormData } from '../player/PlayerFormData'
import type { PlayerSpiritData } from '../player/PlayerSpiritData'

export type Player = Pick<PlayerData, 'gems'>

export type PlayerForm = Pick<
  PlayerFormData,
  'realm' | 'level' | 'power' | 'reserve' | 'expCap' | 'expReserve'
>

export type PlayerEnergy = Pick<
  PlayerEnergyData,
  'realm' | 'level' | 'power' | 'reserve' | 'expCap' | 'expReserve'
>

export type PlayerSpirit = Pick<
  PlayerSpiritData,
  'realm' | 'level' | 'power' | 'reserve' | 'expCap' | 'expReserve'
>

export type Enemy = Pick<
  EnemyData,
  'name' | 'level' | 'health' | 'maxHealth' | 'attack' | 'defense'
>

export type EnemyReward = Pick<EnemyRewardData, 'exp' | 'gems'>

export interface BattleVictoryData extends BaseResult {
  type: typeof BattleAttackType.VICTORY
  player: Player
  playerForm?: PlayerForm
  playerEnergy?: PlayerEnergy
  playerSpirit?: PlayerSpirit
  enemy: Enemy
  reward?: EnemyReward
}
