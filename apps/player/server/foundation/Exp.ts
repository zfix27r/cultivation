export class Exp {
  private _martial: number
  private _scholarly: number
  private _mystic: number
  private _reserve: number
  private _cap: number

  constructor(data: {
    martial: number
    scholarly: number
    mystic: number
    reserve: number
    cap: number
  }) {
    this._martial = data.martial
    this._scholarly = data.scholarly
    this._mystic = data.mystic
    this._reserve = data.reserve
    this._cap = data.cap
  }

  get reserve() {
    return this._reserve
  }

  get cap() {
    return this._cap
  }

  get martial() {
    return this._martial
  }

  set martial(exp: number) {
    this._martial += exp
    this.upTotal(exp)
  }

  get scholarly() {
    return this._scholarly
  }

  set scholarly(exp: number) {
    this._scholarly += exp
    this.upTotal(exp)
  }

  get mystic() {
    return this._mystic
  }

  set mystic(exp: number) {
    this._mystic += exp
    this.upTotal(exp)
  }

  getCapExp(exp: number): number {
    if (this._reserve + exp >= this._cap) {
      return this._cap - this._reserve
    }

    return exp
  }

  private upTotal(exp: number) {
    this._reserve += exp
  }
}
