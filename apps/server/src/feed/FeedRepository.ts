import type { FeedData } from './FeedData'
import type { BattleVictoryData } from '@/data/battle/attack/BattleVictoryData'

export interface FeedRepository {
  process(feed: FeedData): FeedData
  buildVictoryFeed(result: BattleVictoryData): FeedData
}

export class FeedRepositoryImpl implements FeedRepository {
  process(feed: FeedData): FeedData {
    return {
      text: feed.text,
      timestamp: new Date().toLocaleTimeString()
    }
  }

  buildVictoryFeed(result: BattleVictoryData): FeedData {
    let text = "Монстр побежден!"
    if (result.reward?.exp) text += ` +${result.reward.exp} опыта`
    if (result.reward?.gems) text += ` +${result.reward.gems} кристаллов`

    return {
      text,
      timestamp: new Date().toLocaleTimeString()
    }
  }
}
