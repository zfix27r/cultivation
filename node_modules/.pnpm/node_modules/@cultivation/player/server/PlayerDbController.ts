import type { GameDatabase } from '@/server/database/GameDatabase'
import { Energy } from '@/server/player/foundation/Energy'
import { Form } from '@/server/player/foundation/Form'
import { Spirit } from '@/server/player/foundation/Spirit'
import { PlayerModel } from '@/server/player/PlayerModel'

import { Exp } from './foundation/Exp'

export class PlayerDbController {
  private db: GameDatabase

  constructor(db: GameDatabase) {
    this.db = db
  }

  async getPlayerData(): Promise<PlayerModel> {
    const form = new Form({
      realm: 1,
      level: 1,
      power: 2,
      reserve: 8,
      exp: new Exp({
        martial: 0,
        scholarly: 0,
        mystic: 0,
        reserve: 0,
        cap: 20,
      }),
    })

    const energy = new Energy({
      realm: 1,
      level: 1,
      power: 0,
      reserve: 0,
      exp: new Exp({
        martial: 0,
        scholarly: 0,
        mystic: 0,
        reserve: 0,
        cap: 0,
      }),
    })

    const spirit = new Spirit({
      realm: 1,
      level: 1,
      power: 0,
      reserve: 0,
      exp: new Exp({
        martial: 0,
        scholarly: 0,
        mystic: 0,
        reserve: 0,
        cap: 0,
      }),
    })

    const power = form.power + energy.power + spirit.power

    return new PlayerModel(1, 'Фикс', 1, 40, 50, 10, 5, 2, 5, power, form, energy, spirit)
  }
}
