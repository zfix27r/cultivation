import { EventDbEntity } from './EventDbEntity'
import { EventType, EventPriority } from '../../event'

export const EventDb = new Map<string, EventDbEntity>([
  [EventType.BATTLE, {
    type: EventType.BATTLE,
    priority: EventPriority.EXTRA_HIGH
  }],
  [EventType.BREAKTHROUGH, {
    type: EventType.BREAKTHROUGH,
  }],
])
