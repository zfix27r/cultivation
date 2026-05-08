import type { BattleRewardModel } from '@/server/battle/models/BattleRewardModel'
import { Spirit } from './foundation/Spirit'
import { Form } from './foundation/Form'
import { Energy } from './foundation/Energy'
import { RewardDTO } from '@/data/reward'

export class PlayerModel {
  public damage: number

  constructor(
    public id: number,
    public name: string,
    public level: number,
    public health: number,
    public maxHealth: number,
    public attack: number,
    public defense: number,
    public exp: number,
    public gems: number,
    public power: number,
    public form: Form | null,
    public energy: Energy | null,
    public spirit: Spirit | null,
  ) {
    this.damage = this.calculateDamage()
  }

  private calculateDamage(): number {
    return this.attack
  }

  public takeBattleReward(reward: BattleRewardModel): RewardDTO | null {
    if (!this.form) return null

    const result: RewardDTO = {}

    result.exp = this.form.exp.getCapExp(reward.exp)

    this.form.exp.martial = result.exp

    result.gems = reward.gems
    this.gems += reward.gems

    return result
  }

}
