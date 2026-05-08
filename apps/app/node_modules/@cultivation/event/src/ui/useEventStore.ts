import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { EventData } from '../data/EventData'
import type { EventType } from '../data/EventType'

export const useEventStore = defineStore('event', () => {
  const list = ref<EventData[]>([])

  function add(event: EventData) {
    list.value.push(event)
  }

  function remove(type: EventType) {
    list.value = list.value.filter(e => e.type !== type)
  }

  function clear() {
    list.value = []
  }

  return {
    list,
    add,
    remove,
    clear
  }
})
