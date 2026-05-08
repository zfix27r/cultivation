import {
  mapToEnemy,
  mapToEnemyReward,
  mapToPlayerEnergy,
  mapToPlayerForm,
  mapToPlayerSpirit,
} from '@/server/battle/attack/BattleAttackMapper'
import { BattleAttackResponse } from '@/server/battle/attack/BattleAttackResponse'
import { BattleVictoryResponse } from '@/server/battle/attack/BattleVictoryResponse'
import { diModules, MODULE_TOKENS } from '@/server/global/diModules'

import { GlobalRequest } from '../../global/GlobalRequest'
import { BattleAttackType } from './BattleAttackType'

export class BattleAttackRequest extends GlobalRequest<
  BattleAttackResponse | BattleVictoryResponse
> {
  private battle = diModules.get(MODULE_TOKENS.BATTLE)

  protected async handle(): Promise<BattleAttackResponse | BattleVictoryResponse> {
    const { enemy } = this.battle

    this.onRequest()

    if (enemy.isDead()) {
      return this.onVictory()
    } else {
      return this.onAttack()
    }
  }

  private onRequest() {
    const { player, enemy } = this.battle

    enemy.takeDamage(player.damage)
  }

  private async onAttack(): Promise<BattleAttackResponse> {
    const { enemy } = this.battle

    return {
      type: BattleAttackType.ATTACK,
      enemy: {
        health: enemy.health,
      },
    }
  }

  private async onVictory(): Promise<BattleVictoryResponse> {
    const { player } = this.battle

    const rewardBase = this.battle.reward
    const reward = player.takeReward(rewardBase)

    await this.battle.initNewBattle()
    const enemy = this.battle.enemy

    return {
      type: BattleAttackType.VICTORY,
      player: {
        gems: player.gems,
      },
      playerForm: player.form ? mapToPlayerForm(player.form) : undefined,
      playerEnergy: player.energy ? mapToPlayerEnergy(player.energy) : undefined,
      playerSpirit: player.spirit ? mapToPlayerSpirit(player.spirit) : undefined,
      enemy: mapToEnemy(enemy),
      reward: reward ? mapToEnemyReward(reward) : undefined,
    }
  }
}
