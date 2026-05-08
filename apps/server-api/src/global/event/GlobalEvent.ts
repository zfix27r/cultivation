import type { EventDbEntity } from '@/server/database/event/EventDbEntity'

export class GlobalEvent {
  private _events: Map<string, EventDbEntity> = new Map()


  get events(): Map<string, EventDbEntity> {
    return this._events
  }
}
