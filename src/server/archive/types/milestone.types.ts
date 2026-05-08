export interface Milestone {
  id: string
  title: string
  description: string
  icon: string
  requirements: {
    type: 'enemiesDefeated' | 'level' | 'taps' | 'stones'
    value: number
  }
  choices: MilestoneChoice[]
  isAvailable: boolean
  isCompleted: boolean
}

export interface MilestoneChoice {
  id: string
  text: string
  description: string
  icon: string
  effect: (state: any) => void
  requirements?: {
    skill?: string
    minLevel?: number
  }
}

// Хранилище для Milestones
export interface MilestoneState {
  availableMilestones: Milestone[]
  completedMilestones: string[]
  pendingMilestone: Milestone | null // Тот, который сейчас выбираем
}
