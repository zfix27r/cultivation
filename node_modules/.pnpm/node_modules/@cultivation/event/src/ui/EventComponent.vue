<script setup lang="ts">
import { computed } from 'vue'
import { useEventStore } from './useEventStore'

const emit = defineEmits<{
  (e: 'select', eventId: string): void
}>()

const store = useEventStore()

const events = computed(() => store.list)

const handleClick = (eventId: string) => {
  emit('select', eventId)
}
</script>

<template>
  <div v-if="events.length > 0">
    <div class="eventbar">
      <button v-for="event in events" :key="event.type" class="event-icon" @click="handleClick(event.type)"
        :title="event.title">
        <span :class="`icon icon-${event.icon}`"></span>
        <span class="tooltip">{{ event.description }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.eventbar {
  display: flex;
  gap: var(--flex-gap-medium);
  padding: var(--padding-small);
  flex-wrap: wrap;
}

.event-icon {
  width: 40px;
  height: 40px;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  cursor: pointer;
}

.event-icon:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.2);
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  font-size: 0.7rem;
  padding: 4px 8px;
  border-radius: 8px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.event-icon:hover .tooltip {
  opacity: 1;
}
</style>
