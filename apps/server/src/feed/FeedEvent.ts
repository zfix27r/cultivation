import type { FeedData } from '../src/data'

export class FeedEvent {
  private feeds: FeedData[] = []

  addFeed(feed: FeedData): void {
    this.feeds.push(feed)
  }

  buildVictoryFeed(reward?: { exp?: number; gems?: number }): FeedData {
    let text = 'Монстр побеждён!'
    if (reward?.exp) text += ` +${reward.exp} опыта`
    if (reward?.gems) text += ` +${reward.gems} кристаллов`

    return {
      text,
      timestamp: new Date().toLocaleTimeString(),
    }
  }

  buildTimeFeed(daysPassed: number): FeedData {
    return {
      text: `Прошло ${daysPassed} дней культивации`,
      timestamp: new Date().toLocaleTimeString(),
    }
  }

  collectFeeds(): FeedData[] {
    const result = [...this.feeds]
    this.feeds = []
    return result
  }
}