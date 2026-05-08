import type { ApiPlayer } from '@/server/shared/player'

export interface PlayerRepository {
  init(): Promise<void>
}

export class PlayerRepositoryImpl implements PlayerRepository {
  private readonly api: ApiPlayer

  constructor(api: ApiPlayer) {
    this.api = api
  }

  async init(): Promise<void> {
    await this.api.init()
  }
}
