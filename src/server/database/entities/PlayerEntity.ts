export interface PlayerEntity {
  id: number

  level: number
  name: string
  health: number
  maxHealth: number
  attack: number
  defense: number

  gems: number

  formRealm: number
  formLevel: number
  formPower: number
  formReserve: number
  formExpCap: number
  formExpReserve: number
  formExpMartial: number
  formExpScholarly: number
  formExpMystic: number

  energyRealm: number
  energyLevel: number
  energyPower: number
  energyReserve: number
  energyExpCap: number
  energyExpReserve: number
  energyExpMartial: number
  energyExpScholarly: number
  energyExpMystic: number

  spiritRealm: number
  spiritLevel: number
  spiritPower: number
  spiritReserve: number
  spiritExpCap: number
  spiritExpReserve: number
  spiritExpMartial: number
  spiritExpScholarly: number
  spiritExpMystic: number
}
