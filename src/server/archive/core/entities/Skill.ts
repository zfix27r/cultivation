export class Skill {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public icon: string,
    public baseValue: number,
    public level: number = 1,
    public cost: number = 100,
    public maxLevel: number = 10,
    public type: 'damage' | 'speed' | 'critical' | 'passive' = 'damage',
  ) {}

  get currentValue(): number {
    return this.baseValue * this.level
  }

  get nextValue(): number {
    return this.baseValue * (this.level + 1)
  }

  get upgradeCost(): number {
    return Math.floor(this.cost * Math.pow(1.5, this.level - 1))
  }

  canUpgrade(): boolean {
    return this.level < this.maxLevel
  }

  upgrade(): void {
    if (this.canUpgrade()) {
      this.level++
    }
  }

  toJSON() {
    return {
      id: this.id,
      level: this.level,
      cost: this.cost,
    }
  }
}
