import type { GlobalResponse } from './GlobalResponse'
import { global } from '@/server/global/GlobalManager'

export abstract class GlobalRequest<TResponse extends GlobalResponse> {
  async execute(): Promise<TResponse | null> {
    const response: GlobalResponse = {}

    Object.assign(response, global.onBefore())
    Object.assign(response, this.onBefore())
    Object.assign(response, await this.handle())
    Object.assign(response, global.onAfter())
    Object.assign(response, this.onAfter())

    return response as TResponse
  }

  protected abstract handle(): Promise<TResponse>

  protected onBefore(): void { }
  protected onAfter(): void { }
}
