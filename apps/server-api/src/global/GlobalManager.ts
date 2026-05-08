import { TimeManager } from './time/TimeManager'

class GlobalManager {
  private static instance: GlobalManager

  readonly time: TimeManager

  private constructor() {
    this.time = new TimeManager()
  }

  static getInstance() {
    if (!GlobalManager.instance) GlobalManager.instance = new GlobalManager()
    return GlobalManager.instance
  }

  onBefore(): void { }
  onAfter(): void { }

}

export const global = GlobalManager.getInstance()
