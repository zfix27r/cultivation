import { getOrError } from 'apps/app/src/utils'

import { BattleEventManager } from './BattleEventManager'
import { BattleEnemyModel } from './models/BattleEnemyModel'
import { BattlePlayerModel } from './models/BattlePlayerModel'
import { BattleRewardModel } from './models/BattleRewardModel'

export class BattleModule {
  private dbController: BattleDbController

  private _eventManger: BattleEventManager

  private _player: BattlePlayerModel | null = null
  private _enemy: BattleEnemyModel | null = null
  private _reward: BattleRewardModel | null = null

  constructor(db: GameDatabase) {
    this.dbController = new BattleDbController(db)
    this._eventManger = new BattleEventManager()
  }

  private async initNewBattle() {
    const newBattle = await this.dbController.getNewBattleData()
    this.battle = newBattle
  }

  set player(model: BattlePlayerModel) {
    this._player = model
  }

  get player(): BattlePlayerModel {
    return getOrError(this._player)
  }

  set enemy(model: BattleEnemyModel) {
    this._enemy = model
  }

  get enemy(): BattleEnemyModel {
    return getOrError(this._enemy)
  }

  set reward(model: BattleRewardModel) {
    this._reward = model
  }

  get reward(): BattleRewardModel {
    return getOrError(this._reward)
  }

  get eventManager(): BattleEventManager {
    return this._eventManger
  }

  isNotInit(): boolean {
    return this._player === null
  }
}
