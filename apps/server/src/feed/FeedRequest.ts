import type { FeedData } from '../src/data'
import { FeedEvent } from './FeedEvent'

export class FeedRequest {
  private feedEvent: FeedEvent

  constructor(feedEvent: FeedEvent) {
    this.feedEvent = feedEvent
  }

  async execute(): Promise<FeedData[]> {
    return this.feedEvent.collectFeeds()
  }
}