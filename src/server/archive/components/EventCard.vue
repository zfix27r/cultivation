<script setup lang="ts">
import type { Event, Choice } from '@/server/archive/types/game.types'
import { useGameStore } from '@/stores/gameStore'

const props = defineProps<{
  event: Event
}>()

const emit = defineEmits<{
  (e: 'makeChoice', choice: Choice): void
}>()

const gameStore = useGameStore()
</script>

<template>
  <div class="event-card">
    <h2 class="event-title">📜 Событие</h2>
    <p class="event-description">{{ event.description }}</p>

    <div class="choices">
      <button v-for="choice in event.choices" :key="choice.id" @click="emit('makeChoice', choice)" class="choice-btn"
        :disabled="(choice.cost?.spiritStones || 0) > gameStore.resources.spiritStones ||
          (choice.cost?.qi || 0) > gameStore.resources.qi
          ">
        <span class="choice-text">{{ choice.text }}</span>
        <div class="choice-cost" v-if="choice.cost">
          <span v-if="choice.cost.spiritStones" class="cost-stones">
            💎 {{ choice.cost.spiritStones }}
          </span>
          <span v-if="choice.cost.qi" class="cost-qi"> ✨ {{ choice.cost.qi }} </span>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.event-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.event-title {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.3rem;
  opacity: 0.9;
}

.event-description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 25px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.choices {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.choice-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.choice-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(5px);
  border-color: rgba(255, 255, 255, 0.4);
}

.choice-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.choice-text {
  font-weight: 500;
}

.choice-cost {
  display: flex;
  gap: 10px;
}

.cost-stones,
.cost-qi {
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 0.9rem;
}

.cost-stones {
  background: rgba(76, 175, 80, 0.3);
}

.cost-qi {
  background: rgba(33, 150, 243, 0.3);
}
</style>
