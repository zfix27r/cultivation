export const EventPriority = {
  LOW: 10,
  MEDIUM: 5,
  HIGH: 3,
  EXTRA_HIGH: 1
} as const

export type EventPriority = typeof EventPriority[keyof typeof EventPriority]
