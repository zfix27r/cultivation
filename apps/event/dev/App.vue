<script setup lang="ts">
import { onMounted } from 'vue'
import { useEventStore } from '../src/ui/useEventStore'
import EventBarComponent from '../src/ui/EventComponent.vue'
import { mockEvents } from './mockData'

const store = useEventStore()

onMounted(() => {
    mockEvents.forEach(event => store.add(event))
})
</script>

<template>
    <div class="dev-container">
        <h1>🧪 Event Module — Dev Mode</h1>
        <button @click="store.add(mockEvents[0])">➕ Добавить событие</button>
        <button @click="store.clear()">🗑️ Очистить</button>
        <EventBarComponent @select="(id) => console.log('Выбрано:', id)" />
    </div>
</template>