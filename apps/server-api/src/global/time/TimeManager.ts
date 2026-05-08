import type { TimeState } from './TimeState'

export class TimeManager {
  private state: TimeState

  constructor() {
    this.state = this.initState()
  }

  private initState(): TimeState {
    return {
      day: 1,
      timestamp: Date.now()
    }
  }

  processTick(): { daysPassed: number; currentTime: TimeState } {
    const now = Date.now()
    const elapsedMs = now - this.state.timestamp
    const daysPassed = Math.floor(elapsedMs / 60000)

    if (daysPassed > 0) {
      this.state.day += daysPassed
      this.state.timestamp += daysPassed * 60000
    }

    return { daysPassed, currentTime: { ...this.state } }
  }

  getCurrentTime(): TimeState {
    this.processTick()
    return { ...this.state }
  }
}
