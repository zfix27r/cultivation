export const EventType = {
  BATTLE: 'battle',
  BREAKTHROUGH: 'breakthrough',
} as const

export type EventType = typeof EventType[keyof typeof EventType]
