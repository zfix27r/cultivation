import { Exp } from './Exp'

export class Foundation {
  realm: number
  level: number
  power: number
  reserve: number
  exp: Exp

  constructor(data: { realm: number; level: number; power: number; reserve: number; exp: Exp }) {
    this.realm = data.realm
    this.level = data.level
    this.power = data.power
    this.reserve = data.reserve
    this.exp = data.exp
  }
}
