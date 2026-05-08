import type { EventData } from '@/data/event/EventData'
import { EventLocalBD as db } from '@/data/event/EventLocalBD'

export interface EventRepository {
  process(event: EventData): EventData
}

export class EventRepositoryImpl implements EventRepository {
  process(event: EventData): EventData {
    const local = db.get(event.type)
    Object.assign(event, local)

    return event
  }
}
