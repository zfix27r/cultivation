import { EventType } from '../data/EventType'
import type { EventData } from '../data/EventData'

export const EventMeta: Map<EventType, Pick<EventData, 'icon' | 'title' | 'description'>> = new Map([
  [EventType.BATTLE, {
    icon: 'battle',
    title: 'Бой',
    description: 'Сражение с монстрами'
  }],
  [EventType.BREAKTHROUGH, {
    icon: 'arrow-up',
    title: 'Прорыв',
    description: 'Готов к переходу на новый слой'
  }],
])
