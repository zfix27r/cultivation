

export class AppEnemyFactory {
  async saveEnemy(enemy: IAppEnemyModel): Promise<void> {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(enemy))
    } catch (error) {
      console.error('Failed to save enemy:', error)
      throw error
    }
  }

  async clearEnemy(): Promise<void> {
    localStorage.removeItem(this.STORAGE_KEY)
  }
  private readonly STORAGE_KEY = 'current_enemy'


  createForLevel(level: number): IAppEnemyModel {
    return new AppEnemyModel(
      crypto.randomUUID(),
      `Враг уровня ${level}`,
      50 + level * 20,
      50 + level * 20,
      5 + level * 2,
      2 + level,
      `reward_${level}`
    )
  }

  createFromData(data: IAppEnemyModel): IAppEnemyModel {
    return new AppEnemyModel(
      data.id,
      data.name,
      data.health,
      data.maxHealth,
      data.attack,
      data.defense,
      data.rewardId
    )
  }

  createBoss(level: number): IAppEnemyModel {
    return new AppEnemyModel(
      crypto.randomUUID(),
      `Босс уровня ${level}`,
      200 + level * 50,
      200 + level * 50,
      15 + level * 5,
      10 + level * 3,
      `reward_boss_${level}`
    )
  }
}
