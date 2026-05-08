import type { BattleInitResult } from '@/data/battle'

import type { GlobalResponse } from '@/server/global/GlobalResponse'

export interface BattleInitResponse extends GlobalResponse {
  player: BattleInitResult['player']
  playerForm?: BattleInitResult['playerForm']
  playerEnergy?: BattleInitResult['playerEnergy']
  playerSpirit?: BattleInitResult['playerSpirit']
  enemy: BattleInitResult['enemy']
}
