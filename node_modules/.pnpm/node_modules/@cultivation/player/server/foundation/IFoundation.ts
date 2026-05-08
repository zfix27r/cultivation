import type { IFoundationEXP } from '@/server/foundation/IFoundationEXP'

export interface IFoundation {
  realm: number
  level: number
  power: number
  reserve: number
  reserveMax: number
  exp: IFoundationEXP
}
