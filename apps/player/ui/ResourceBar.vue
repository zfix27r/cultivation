<script setup lang="ts">
import { usePlayerStore } from '@/data/store/playerStore'
import { useSkillStore } from '@/data/store/skillStore'
import { computed } from 'vue'

const playerStore = usePlayerStore()
const skillStore = useSkillStore()

const resources = computed(() => [
  {
    icon: '💎',
    value: playerStore.player.spiritStones,
    label: 'Камни духа',
    color: '#4caf50',
  },
  {
    icon: '✨',
    value: playerStore.player.qi,
    label: 'Ци',
    color: '#2196f3',
  },
  {
    icon: '⚡',
    value: playerStore.player.energy,
    label: 'Энергия',
    color: '#ff9800',
  },
])

const levelProgress = computed(() => {
  const expNeeded = playerStore.player.cultivationLevel * 100
  return (playerStore.player.experience / expNeeded) * 100
})

const tapSpeed = computed(() => skillStore.tapSpeed?.currentValue || 0)
</script>

<template>
  <div class="resource-bar">
    <!-- Основные ресурсы -->
    <div class="resources-grid">
      <div
        v-for="resource in resources"
        :key="resource.label"
        class="resource-item"
        :style="{ borderLeftColor: resource.color }"
      >
        <span class="resource-icon">{{ resource.icon }}</span>
        <div class="resource-info">
          <span class="resource-label">{{ resource.label }}</span>
          <span class="resource-value">{{ resource.value }}</span>
        </div>
      </div>
    </div>

    <!-- Уровень и опыт -->
    <div class="level-container">
      <div class="level-info">
        <span class="level-icon">📊</span>
        <span class="level-text">Уровень {{ playerStore.player.cultivationLevel }}</span>
        <span class="level-text">Врагов: {{ playerStore.player.enemiesDefeated }}</span>
      </div>
      <div class="exp-bar-container">
        <div class="exp-bar" :style="{ width: levelProgress + '%' }"></div>
        <span class="exp-text">{{ Math.round(levelProgress) }}%</span>
      </div>
    </div>

    <!-- Авто-тап индикатор -->
    <div v-if="tapSpeed > 0" class="auto-tap-indicator">
      <span>🤖 Авто-тап: {{ tapSpeed }}/сек</span>
    </div>
  </div>
</template>

<style scoped>
.resource-bar {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 15px;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  border-left: 4px solid;
}

.resource-icon {
  font-size: 1.5rem;
}

.resource-info {
  display: flex;
  flex-direction: column;
}

.resource-label {
  font-size: 0.7rem;
  opacity: 0.7;
}

.resource-value {
  font-size: 1.1rem;
  font-weight: bold;
}

.level-container {
  margin-bottom: 10px;
}

.level-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.level-icon {
  font-size: 1.2rem;
}

.exp-bar-container {
  position: relative;
  height: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  overflow: hidden;
}

.exp-bar {
  height: 100%;
  background: linear-gradient(90deg, #ffd700, #ffaa00);
  transition: width 0.3s ease;
}

.exp-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.7rem;
  color: white;
  text-shadow: 0 1px 2px black;
}

.auto-tap-indicator {
  text-align: center;
  padding: 5px;
  background: rgba(76, 175, 80, 0.2);
  border-radius: 15px;
  font-size: 0.9rem;
  border: 1px solid rgba(76, 175, 80, 0.3);
}
</style>
