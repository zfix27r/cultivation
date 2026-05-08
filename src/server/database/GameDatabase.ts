import Dexie from 'dexie'
import type { EnemyEntity } from '@/server/database/entities/EnemyEntity'

export class GameDatabase extends Dexie {
  private static instance: GameDatabase

  private constructor() {
    super('CultivationDB')

    this.version(1).stores({
      enemies: '++id, name, level, health, maxHealth, attack, defense'
    })
  }

  get enemies() {
    return this.table<EnemyEntity, number>('enemies')
  }

  static getInstance(): GameDatabase {
    if (!GameDatabase.instance) {
      GameDatabase.instance = new GameDatabase()
    }
    return GameDatabase.instance
  }
}
