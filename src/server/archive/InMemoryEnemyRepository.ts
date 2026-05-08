import { IEnemyRepository } from '@/core/repositories/IEnemyRepository'
import { Enemy } from '@/core/entities/Enemy'

export class InMemoryEnemyRepository implements IEnemyRepository {
  private currentEnemy: Enemy | null = null
  private readonly ENEMY_KEY = 'cultivation_current_enemy'

  constructor() {
    this.load()
  }

  private load(): void {
    const saved = localStorage.getItem(this.ENEMY_KEY)
    if (saved) {
      const data = JSON.parse(saved)
      this.currentEnemy = new Enemy(
        data.id,
        data.name,
        data.health,
        data.maxHealth,
        data.attack,
        data.defense,
        data.spiritStonesReward,
        data.experienceReward,
      )
    }
  }

  private save(): void {
    if (this.currentEnemy) {
      localStorage.setItem(this.ENEMY_KEY, JSON.stringify(this.currentEnemy))
    } else {
      localStorage.removeItem(this.ENEMY_KEY)
    }
  }

  getCurrentEnemy(): Enemy | null {
    return this.currentEnemy
  }

  saveEnemy(enemy: Enemy): void {
    this.currentEnemy = enemy
    this.save()
  }

  spawnEnemy(level: number): Enemy {
    const enemy = Enemy.createForLevel(level)
    this.currentEnemy = enemy
    this.save()
    return enemy
  }

  clearEnemy(): void {
    this.currentEnemy = null
    this.save()
  }
}
