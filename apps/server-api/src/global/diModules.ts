import type { BattleModule } from '@/server/battle/BattleModule'

export const MODULE_TOKENS = {
  BATTLE: 'BATTLE',
} as const

interface DiModuleMap {
  [MODULE_TOKENS.BATTLE]: BattleModule
}

type ModuleToken = typeof MODULE_TOKENS[keyof typeof MODULE_TOKENS]

const dependencies = new Map<ModuleToken, DiModuleMap[ModuleToken]>()

export const diModules = {
  register<T extends ModuleToken>(token: T, implementation: DiModuleMap[T]) {
    if (dependencies.has(token)) throw new Error(`Модуль ${token} уже зарегистрирован!`)
    dependencies.set(token, implementation)
  },

  get<T extends ModuleToken>(token: T): DiModuleMap[T] {
    const dep = dependencies.get(token)
    if (!dep) throw new Error(`Модуль ${token} не зарегистрирован`)
    return dep as DiModuleMap[T]
  }
}
