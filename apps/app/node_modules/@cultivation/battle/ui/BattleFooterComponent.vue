<script setup lang="ts">
import FeedComponent from '@/ui/feed/FeedComponent.vue'
import EventBarComponent from '@/ui/event/EventBarComponent.vue'

const handleEventSelect = (eventId: string) => {
  //battleStore.pause()
  // открытие модального окна с ивентом
  //openEventModal(eventId)
  console.log(eventId)
}
</script>

<template>
  <footer>
    <EventBarComponent @select="handleEventSelect" />
    <FeedComponent />
  </footer>
</template>

<style scoped>
footer {
  flex-shrink: 0;
  height: 200px;
}
</style>
