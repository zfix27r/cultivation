export class Player {
  constructor(
    public id: string,
    public spiritStones: number = 100,
    public qi: number = 50,
    public energy: number = 30,
    public cultivationLevel: number = 1,
    public experience: number = 0,
    public totalTaps: number = 0,
    public enemiesDefeated: number = 0,
  ) {}

  addSpiritStones(amount: number, multiplier: number = 1): void {
    this.spiritStones += amount * multiplier
  }

  spendSpiritStones(amount: number): boolean {
    if (this.spiritStones >= amount) {
      this.spiritStones -= amount
      return true
    }
    return false
  }

  addExperience(amount: number): void {
    this.experience += amount
    this.checkLevelUp()
  }

  private checkLevelUp(): void {
    const expNeeded = this.cultivationLevel * 100
    if (this.experience >= expNeeded) {
      this.cultivationLevel++
      this.experience -= expNeeded
    }
  }

  toJSON() {
    return {
      spiritStones: this.spiritStones,
      qi: this.qi,
      energy: this.energy,
      cultivationLevel: this.cultivationLevel,
      experience: this.experience,
      totalTaps: this.totalTaps,
      enemiesDefeated: this.enemiesDefeated,
    }
  }
}
