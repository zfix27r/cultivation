export interface Resources {
  spiritStones: number // Камни духа
  qi: number // Энергия ци
  cultivationLevel: number // Уровень культивации
  experience: number // Опыт до следующего уровня
  energy: number // Энергия для навыков
  totalTaps: number // Общее количество тапов
  enemiesDefeated: number // Побежденные враги
  stoneGenerationMultiplier?: number // Множитель генерации камней (опционально)
}

export interface Enemy {
  id: string
  name: string
  health: number
  maxHealth: number
  attack: number
  defense: number
  spiritStonesReward: number
  qiReward: number
  experienceReward: number // Добавляем опыт за убийство
}

export interface Event {
  id: string
  description: string
  choices: Choice[]
}

export interface Choice {
  id: string
  text: string
  cost?: {
    spiritStones?: number
    qi?: number
    energy?: number // Добавляем стоимость энергии
  }
  requirements?: {
    cultivationLevel?: number
  }
  // Функция, выполняющая выбор (как functional interface)
  execute: (state: GameState) => ChoiceResult
}

export interface ChoiceResult {
  success: boolean
  message: string
  rewards?: {
    spiritStones?: number
    qi?: number
    experience?: number
    energy?: number // Добавляем награду энергией
  }
  nextEventId?: string // Для ветвления событий
}

export interface GameState {
  resources: Resources
  currentEvent: Event | null
  currentEnemy: Enemy | null
  battleLog: string[]
  completedEvents: string[] // История прошедших событий
}

// Тип для Pinia store
export interface GameStore {
  // Состояние
  state: GameState

  // Геттеры (как computed values)
  readonly canCultivate: boolean
  readonly currentLevelProgress: number

  // Actions (методы)
  addSpiritStones(amount: number): void
  addQi(amount: number): void
  addEnergy(amount: number): void // Добавляем метод
  gainExperience(amount: number): void
  makeChoice(choice: Choice): Promise<ChoiceResult>
  loadNextEvent(): void
  saveGame(): void
  loadGame(): void
}
