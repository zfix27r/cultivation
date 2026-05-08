import { diModules, MODULE_TOKENS } from '@/server/global/diModules'
import { GlobalRequest } from '@/server/global/GlobalRequest'

import type { BattleInitResponse } from './BattleInitResponse'

export class BattleInitRequest extends GlobalRequest<BattleInitResponse> {
  protected handle(): Promise<BattleInitResponse> {
    throw new Error('Method not implemented.')
  }

  private toResponse(): BattleInitResponse {
    const battle = diModules.get(MODULE_TOKENS.BATTLE)

    const player = battle.player
    const enemy = battle.enemy

    const response: BattleInitResponse = {
      player: {
        name: player.name,
        level: player.level,
        health: player.health,
        healthMax: player.maxHealth,
        exp: player.exp,
        gems: player.gems,
        power: player.power,
      },
      enemy: {
        name: enemy.name,
        level: enemy.level,
        health: enemy.health,
        maxHealth: enemy.maxHealth,
        attack: enemy.attack,
        defense: enemy.defense,
      },
    }

    if (player.form) {
      response.playerForm = {
        realm: player.form.realm,
        level: player.form.level,
        power: player.form.power,
        reserve: player.form.reserve,
        expTotal: player.form.exp.reserve,
        expCap: player.form.exp.cap,
      }
    }

    if (player.energy) {
      response.playerEnergy = {
        realm: player.energy.realm,
        level: player.energy.level,
        power: player.energy.power,
        reserve: player.energy.reserve,
        expTotal: player.energy.exp.reserve,
        expCap: player.energy.exp.cap,
      }
    }

    if (player.spirit) {
      response.playerSpirit = {
        realm: player.spirit.realm,
        level: player.spirit.level,
        power: player.spirit.power,
        reserve: player.spirit.reserve,
        expTotal: player.spirit.exp.reserve,
        expCap: player.spirit.exp.cap,
      }
    }

    return response
  }
}
