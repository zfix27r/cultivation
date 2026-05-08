import type { BattleRewardModel } from '@/server/battle/models/BattleRewardModel'
import type { PlayerEntity } from '@/server/database/entities/PlayerEntity'
import { Energy } from '@/server/player/foundation/Energy'
import { Form } from '@/server/player/foundation/Form'
import { Spirit } from '@/server/player/foundation/Spirit'

export class BattlePlayerModel {
  private data: PlayerEntity

  form: Form | null = null
  energy: Energy | null = null
  spirit: Spirit | null = null

  public damage: number

  constructor(data: PlayerEntity) {
    this.data = data
    this.damage = this.calculateDamage()
  }

  get gems() {
    return this.data.gems
  }

  private calculateDamage(): number {
    return this.data.attack
  }

  public takeReward(reward: BattleRewardModel): void {
    if (this.form && reward.formExp) {
      this.form.exp.martial = reward.formExp
    }

    this.data.gems += reward.gems
  }
}
