import type { BaseResult } from 'apps/battle/data/BaseResult'
import type { EventData } from '@/data/event/EventData'
import type { FeedData } from '@/data/feed/FeedData'
import type { BaseResponse } from '@/server'

export abstract class BaseRemote<TResponse extends BaseResponse, TResult extends BaseResult> {
  protected abstract parseResponse(response: TResponse): TResult | null

  protected parseBaseResponse(response: BaseResponse, result: TResult): TResult {
    if (response.event) {
      result.event = this.parseEvent(response.event)
    }

    if (response.feed) {
      result.feed = this.parseFeed(response.feed)
    }

    return result
  }

  getResult(response: TResponse | null): TResult | null {
    if (!response) return null

    const result = this.parseResponse(response)
    if (!result) return null

    return this.parseBaseResponse(response, result)
  }

  private parseEvent(event: EventData): EventData {
    return event
  }

  private parseFeed(feed: FeedData): FeedData {
    return feed
  }
}
