export class Enemy {
  constructor(
    public id: string,
    public name: string,
    public health: number,
    public maxHealth: number,
    public attack: number,
    public defense: number,
    public spiritStonesReward: number,
    public experienceReward: number,
  ) {}

  takeDamage(amount: number): void {
    this.health = Math.max(0, this.health - amount)
  }

  isDefeated(): boolean {
    return this.health <= 0
  }

  static createForLevel(level: number): Enemy {
    return new Enemy(
      crypto.randomUUID(),
      `Дух уровня ${level}`,
      50 + level * 20,
      50 + level * 20,
      5 + level * 2,
      2 + level,
      10 + level * 5,
      5 + level * 2,
    )
  }
}
