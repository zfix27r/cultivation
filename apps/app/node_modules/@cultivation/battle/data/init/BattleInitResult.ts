import type { BaseResult } from 'apps/battle/data/BaseResult'
import type { PlayerData } from '@/data/player/PlayerData'
import type { EnemyData } from '@/data/enemy/EnemyData'
import type { PlayerFormData } from '@/data/player/PlayerFormData'
import type { PlayerEnergyData } from '@/data/player/PlayerEnergyData'
import type { PlayerSpiritData } from '@/data/player/PlayerSpiritData'

export interface BattleInitResult extends BaseResult {
  player: PlayerData
  playerForm?: PlayerFormData
  playerEnergy?: PlayerEnergyData
  playerSpirit?: PlayerSpiritData
  enemy: EnemyData
}
