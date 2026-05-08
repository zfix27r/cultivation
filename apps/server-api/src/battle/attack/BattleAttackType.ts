export const BattleAttackType = {
  ATTACK: 'attack',
  VICTORY: 'victory',
} as const

export type BattleAttackType = typeof BattleAttackType[keyof typeof BattleAttackType]
