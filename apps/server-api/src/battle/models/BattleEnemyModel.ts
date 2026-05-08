export class BattleEnemyModel {
  public damage: number = 0

  constructor(
    public id: number,
    public level: number,
    public name: string,
    public health: number,
    public maxHealth: number,
    public attack: number,
    public defense: number,
  ) {
    this.calculateDamage()
  }

  public takeDamage(playerDamage: number) {
    this.health -= playerDamage - this.defense
  }

  public isDead(): boolean {
    return this.health <= 0
  }

  private calculateDamage() {
    this.damage = this.attack
  }
}
