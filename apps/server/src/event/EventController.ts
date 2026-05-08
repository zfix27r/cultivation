import { global } from '@/server/global/GlobalManager'
import { EventDbEntity } from '../database/event/EventDbEntity'
import { EventDb as db } from '@/server/database/event/EventDb'
import { EventType } from '../../data/event/EventType'

import type { EventData } from '@/data/event'

export class EventController {
  private list = global.events

  constructor() {

  }

  getBattle(): EventData | null {
    if (global.isNotInitBattle()) return null

    const type = EventType.BATTLE

    if (this.isNotSend(type)) {
      const event = this.getFromDbByType(type)

      if (event) {
        this.saveState(event)
        return this.toEventData(event)
      }
    }

    return null
  }

  getAfterBattleVictory(): EventData | null {
    const type = EventType.BREAKTHROUGH

    if (this.isBreakthrought() && this.isNotSend(type)) {
      const event = this.getFromDbByType(type)

      if (event) {
        this.saveState(event)
        return this.toEventData(event)
      }
    }

    return null
  }

  private getFromDbByType(type: EventType) {
    return db.get(type)
  }

  private saveState(event: EventDbEntity) {
    this.list.set(event.type, event)
  }

  private toEventData(event: EventDbEntity): EventData {
    return {
      type: event.type,
      duration: event.duration,
      priority: event.priority
    }
  }

  private isNotSend(type: EventType): boolean {
    return !global.events.has(type)
  }

  private isBreakthrought() {
    const form = global.player.form
    if (form) {
      return form.exp.total >= form.exp.cap
    }

    return false
  }
}
