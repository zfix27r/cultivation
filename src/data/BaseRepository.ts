import type { EventRepository } from '@/data/event/EventRepository'
import type { FeedRepository } from '@/data/feed/FeedRepository'
import type { BaseResult } from 'apps/battle/data/BaseResult'
import { di, REPOSITORY_TOKENS } from 'apps/app/src'

export abstract class BaseRepository {
  private _eventRepository?: EventRepository
  private _feedRepository?: FeedRepository

  protected get eventRepository(): EventRepository {
    if (!this._eventRepository) {
      this._eventRepository = di.get(REPOSITORY_TOKENS.EVENT)
    }
    return this._eventRepository
  }

  protected get feedRepository(): FeedRepository {
    if (!this._feedRepository) {
      this._feedRepository = di.get(REPOSITORY_TOKENS.FEED)
    }
    return this._feedRepository
  }

  protected async execute<T extends BaseResult>(
    action: () => Promise<T | null>
  ): Promise<T | null> {
    const result = await action()
    if (!result) return null

    return this.afterExecute(result)
  }

  private afterExecute<T extends BaseResult>(result: T): T | null {
    if (result.event) {
      result.event = this.eventRepository.process(result.event)
    }

    if (result.feed) {
      result.feed = this.feedRepository.process(result.feed)
    }

    return result
  }
}
