import type { PlayerRepository } from '@/data/player/PlayerRepository'
import type { BattleRepository } from '@/data/battle/BattleRepository'
import type { EventRepository } from '@/data/event/EventRepository'
import type { FeedRepository } from '@/data/feed/FeedRepository'

export const REPOSITORY_TOKENS = {
  PLAYER: 'PLAYER_REPOSITORY',
  BATTLE: 'BATTLE_REPOSITORY',
  EVENT: 'EVENT_REPOSITORY',
  FEED: 'FEED_REPOSITORY',
} as const

interface DiRepositoryMap {
  [REPOSITORY_TOKENS.PLAYER]: PlayerRepository
  [REPOSITORY_TOKENS.BATTLE]: BattleRepository
  [REPOSITORY_TOKENS.EVENT]: EventRepository
  [REPOSITORY_TOKENS.FEED]: FeedRepository
}

type RepositoryToken = typeof REPOSITORY_TOKENS[keyof typeof REPOSITORY_TOKENS]

const dependencies = new Map<RepositoryToken, DiRepositoryMap[RepositoryToken]>()

export const di = {
  register<T extends RepositoryToken>(token: T, implementation: DiRepositoryMap[T]) {
    if (dependencies.has(token)) throw new Error(`Dependency ${token} already registered`)
    dependencies.set(token, implementation)
  },

  get<T extends RepositoryToken>(token: T): DiRepositoryMap[T] {
    const dep = dependencies.get(token)
    if (!dep) throw new Error(`Dependency ${token} not registered`)
    return dep as DiRepositoryMap[T]
  }
}
