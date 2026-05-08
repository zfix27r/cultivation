import type { EventData } from '../src/data/EventData'
import { EventPriority } from '../src/data/EventPriority'
import { EventType } from '../src/data/EventType'

export const mockEvents: EventData[] = [
  {
    type: EventType.BATTLE,
    priority: EventPriority.EXTRA_HIGH,
    duration: 0,
    icon: 'battle',
    title: '⚔️ Битва с гоблином',
    description: 'Гоблин-разбойник преграждает путь',
  },
  {
    type: EventType.BREAKTHROUGH,
    priority: EventPriority.HIGH,
    duration: 0,
    icon: 'arrow-up',
    title: '🌟 Прорыв!',
    description: 'Вы готовы к переходу на новый уровень',
  },
]