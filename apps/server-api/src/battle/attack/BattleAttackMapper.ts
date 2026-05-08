import type { BattleEnemyModel } from '@/server/battle/models/BattleEnemyModel'
import type { BattleRewardModel } from '@/server/battle/models/BattleRewardModel'
import type { Energy } from '@/server/player/foundation/Energy'
import type { Form } from '@/server/player/foundation/Form'
import type { Spirit } from '@/server/player/foundation/Spirit'

import type {
  Enemy,
  EnemyReward,
  PlayerEnergy,
  PlayerForm,
  PlayerSpirit,
} from '@/data/battle/attack/BattleVictoryData'

export function mapToPlayerForm(form: Form): PlayerForm {
  return {
    realm: form.realm,
    level: form.level,
    power: form.power,
    reserve: form.reserve,
    expCap: form.exp.cap,
    expReserve: form.exp.reserve,
  }
}

export function mapToPlayerEnergy(energy: Energy): PlayerEnergy {
  return {
    realm: energy.realm,
    level: energy.level,
    power: energy.power,
    reserve: energy.reserve,
    expCap: energy.exp.cap,
    expReserve: energy.exp.reserve,
  }
}

export function mapToPlayerSpirit(spirit: Spirit): PlayerSpirit {
  return {
    realm: spirit.realm,
    level: spirit.level,
    power: spirit.power,
    reserve: spirit.reserve,
    expCap: spirit.exp.cap,
    expReserve: spirit.exp.reserve,
  }
}

export function mapToEnemy(enemy: BattleEnemyModel): Enemy {
  return {
    level: enemy.level,
    name: enemy.name,
    health: enemy.health,
    maxHealth: enemy.maxHealth,
    defense: enemy.defense,
    attack: enemy.attack,
  }
}

export function mapToEnemyReward(reward: BattleRewardModel): EnemyReward {
  return {
    exp: reward.formExp ? reward.formExp : undefined,
    gems: reward.gems,
  }
}
