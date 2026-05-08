<script setup lang="ts">
import { computed, ref } from 'vue'
import { useBattleContentStore } from '@/ui/battle/useBattleContentStore'

const store = useBattleContentStore()

const isFlashing = ref(false)

const handleTap = (event: MouseEvent | TouchEvent) => {
  event.preventDefault()
  event.stopPropagation()

  store.actionDamageEnemy()
  isFlashing.value = true
  setTimeout(() => {
    isFlashing.value = false
  }, 200)
}

const enemyCardClass = computed(() => ({
  'enemy-card': true,
  flashing: isFlashing.value,
  'no-enemy': !store.hasEnemy,
}))

const hasEnemy = computed(() => {
  if (store.enemy.health > 0) {
    return true
  }

  return false
})

</script>

<template>
  <div class="container">
    <div v-if="hasEnemy" :class="enemyCardClass" @click="handleTap" :style="{ cursor: 'pointer' }">
      <div class="enemy-header">
        <span class="enemy-name">{{ store.enemy?.name }}</span>
        <span class="enemy-level">👾</span>
      </div>
      <div class="enemy-stats">
        <div class="stat">
          <span class="stat-label">❤️ Здоровье</span>
          <span class="stat-value">{{ store.enemy?.health }}/{{ store.enemy?.maxHealth }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">⚔️ Атака</span>
          <span class="stat-value">{{ store.enemy?.attack }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">🛡️ Защита</span>
          <span class="stat-value">{{ store.enemy?.defense }}</span>
        </div>
      </div>

      <div class="health-bar-container">
        <div class="health-bar" :style="{
          width: store?.healthPercent + '%',
          backgroundColor: store?.healthColor,
        }"></div>
        <span class="health-text">{{ store?.healthPercent }}%</span>
      </div>
    </div>

    <div v-else class="no-enemy" @click="$emit('tap')">
      <span class="no-enemy-icon">😴</span>
      <p>Нет врага</p>
      <p class="tap-hint">Нажмите чтобы призвать</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding: 16px 16px;
}

.enemy-card {
  margin: auto;
  max-width: 340px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.1s ease;
  position: relative;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}

.enemy-card:hover {
  transform: scale(1.02);
  border-color: rgba(255, 215, 0, 0.5);
}

.enemy-card:active {
  transform: scale(0.98);
}

/* Анимация мигания красным */
.enemy-card.flashing {
  animation: flash 0.2s ease;
  background: rgba(255, 0, 0, 0.4);
}

@keyframes flash {
  0% {
    background: rgba(255, 0, 0, 0.4);
    transform: scale(1);
  }

  50% {
    background: rgba(255, 0, 0, 0.8);
    transform: scale(1.05);
    border-color: rgba(255, 0, 0, 0.8);
  }

  100% {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1);
  }
}

.enemy-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.enemy-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffd700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.enemy-level {
  font-size: 2rem;
}

.enemy-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 15px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 12px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.8;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: bold;
}

.health-bar-container {
  position: relative;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 15px;
}

.health-bar {
  height: 100%;
  transition: width 0.3s ease;
}

.health-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  text-shadow: 0 1px 2px black;
}

.tap-hint {
  text-align: center;
  font-size: 0.8rem;
  opacity: 0.6;
  margin-top: 5px;
  color: #ffd700;
}

.no-enemy {
  text-align: center;
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px dashed rgba(255, 255, 255, 0.1);
}

.no-enemy:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 215, 0, 0.3);
}

.no-enemy:active {
  transform: scale(0.98);
}

.no-enemy-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 15px;
  opacity: 0.5;
}

.no-enemy .tap-hint {
  margin-top: 15px;
  color: #fff;
}
</style>
