import { EventData } from '@/data/event'
import { FeedData } from '@/data/feed'

export interface GlobalResponse {
  event?: EventData
  feed?: FeedData
}
