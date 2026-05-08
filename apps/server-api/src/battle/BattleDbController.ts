import { BattleModel } from '@/server/battle/BattleModel'
import { BattleEnemyModel } from '@/server/battle/models/BattleEnemyModel'
import { BattleRewardModel } from '@/server/battle/models/BattleRewardModel'
import type { GameDatabase } from '@/server/database/GameDatabase'

export class BattleDbController {
  private db: GameDatabase

  constructor(db: GameDatabase) {
    this.db = db
  }

  async getNewBattleData(): Promise<BattleModel> {
    const enemy = new BattleEnemyModel(1, 1, 'Гоблин-разбойник', 50, 50, 8, 2)

    const reward = new BattleRewardModel(8, 1)

    return new BattleModel(enemy, reward)
  }
}
