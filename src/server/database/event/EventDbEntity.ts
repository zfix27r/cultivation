import { EventType } from '@/data/event/EventType'

export interface EventDbEntity {
  type: EventType
  priority?: number
  duration?: number
}
