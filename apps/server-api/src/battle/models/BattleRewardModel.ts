import type { EnemyRewardEntity } from '@/server/database/entities/EnemyRewardEntity'
import type { BattlePlayerModel } from '@/server/battle/models/BattlePlayerModel'

export class BattleRewardModel {
  readonly formExp: number | null = null
  readonly gems: number

  constructor(player: BattlePlayerModel, reward: EnemyRewardEntity) {
    if (reward.formExp && player.form) {
      this.formExp = player.form.exp.getCapExp(reward.formExp)
    }

    this.gems = reward.gems
  }
}
