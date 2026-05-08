import { api } from '../../apps/battle'
import { di, REPOSITORY_TOKENS } from '../server/archive/diContainer'
import { BattleRepositoryImpl } from '../../apps/battle/data/BattleRepository'
import { PlayerRepositoryImpl } from '../../apps/battle/data/player/PlayerRepository'
import { EventRepositoryImpl } from '../../apps/server/src/event/EventRepository'
import { FeedRepositoryImpl } from '../../apps/feed/src/data/FeedRepository'

export async function useDi() {
  const newPlayerRepository = new PlayerRepositoryImpl(api.player)
  di.register(REPOSITORY_TOKENS.PLAYER, newPlayerRepository)
  newPlayerRepository.init()

  const newBattleRepository = new BattleRepositoryImpl(api.battle)
  di.register(REPOSITORY_TOKENS.BATTLE, newBattleRepository)

  const newEventRepository = new EventRepositoryImpl()
  di.register(REPOSITORY_TOKENS.EVENT, newEventRepository)

  const newFeedRepository = new FeedRepositoryImpl()
  di.register(REPOSITORY_TOKENS.FEED, newFeedRepository)
}
