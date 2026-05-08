import { EventData } from '@/data/event/EventData'
import { FeedData } from '@/data/feed/FeedData'

export interface BaseResult {
  event?: EventData,
  feed?: FeedData,
}
