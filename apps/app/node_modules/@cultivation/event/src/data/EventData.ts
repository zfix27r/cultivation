import type { EventType } from './EventType'
import type { EventPriority } from './EventPriority'

export interface EventData {
  type: EventType
  priority: EventPriority
  duration: number
  icon: string
  title: string
  description: string
}
