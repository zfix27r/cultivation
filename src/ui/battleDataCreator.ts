import { BattleInitData } from "@/data/battle";

export const createPlayer: BattleInitData['player'] = {
  name: "",
  level: 0,
  health: 0,
  healthMax: 0,
  exp: 0,
  gems: 0,
  power: 0,
}

export const createPlayerForm: BattleInitData['playerForm'] = {
  realmName: "",
  level: 0,
  reserve: 0,
  reserveMax: 0,
  expTotal: 0,
  expCap: 0,
}

export const createPlayerEnergy: BattleInitData['playerEnergy'] = {
  realmName: "",
  level: 0,
  reserve: 0,
  reserveMax: 0,
  expTotal: 0,
  expCap: 0,
}

export const createPlayerSpirit: BattleInitData['playerSpirit'] = {
  realmName: "",
  level: 0,
  reserve: 0,
  reserveMax: 0,
  expTotal: 0,
  expCap: 0,
}

export const createEnemy: BattleInitData['enemy'] = {
  name: "",
  level: 0,
  health: 0,
  maxHealth: 0,
  attack: 0,
  defense: 0
}
