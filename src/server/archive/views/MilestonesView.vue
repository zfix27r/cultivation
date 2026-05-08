<!-- src/views/MilestonesView.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useMilestoneStore } from '@/stores/milestoneStore'
import { useGameStore } from '@/stores/gameStore'
import MobileNav from '@/presentation/battle/MobileNav.vue'

const milestoneStore = useMilestoneStore()
const gameStore = useGameStore()

// Текущее событие для отображения
const currentMilestone = computed(() => milestoneStore.pendingMilestone)

// Процент завершенных
const completionPercent = computed(() => {
  const total =
    milestoneStore.availableMilestones.length + milestoneStore.completedMilestones.length
  if (total === 0) return 0
  return (milestoneStore.completedMilestones.length / total) * 100
})

// Выбор варианта
const handleChoice = (choice: any) => {
  milestoneStore.chooseMilestoneChoice(choice)
}

// Пропустить
const handleSkip = () => {
  milestoneStore.skipCurrentMilestone()
}
</script>

<template>
  <div class="milestones-view">
    <h1 class="page-title">🌟 Судьбоносные события</h1>

    <!-- Прогресс бар -->
    <div class="progress-section">
      <div class="progress-label">
        <span>Прогресс пути</span>
        <span>{{ Math.round(completionPercent) }}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: completionPercent + '%' }"></div>
      </div>
    </div>

    <!-- Активное событие -->
    <div v-if="currentMilestone" class="active-milestone">
      <div class="milestone-header">
        <span class="milestone-icon">{{ currentMilestone.icon }}</span>
        <h2 class="milestone-title">{{ currentMilestone.title }}</h2>
      </div>

      <p class="milestone-description">{{ currentMilestone.description }}</p>

      <div class="choices-grid">
        <button
          v-for="choice in currentMilestone.choices"
          :key="choice.id"
          class="choice-card"
          @click="handleChoice(choice)"
        >
          <div class="choice-icon">{{ choice.icon }}</div>
          <div class="choice-content">
            <div class="choice-title">{{ choice.text }}</div>
            <div class="choice-description">{{ choice.description }}</div>
          </div>
          <div class="choice-select">Выбрать →</div>
        </button>
      </div>

      <button class="skip-btn" @click="handleSkip">Пропустить (можно вернуться позже)</button>
    </div>

    <!-- Нет активных событий -->
    <div v-else class="no-milestones">
      <div class="empty-icon">😌</div>
      <p>Пока нет судьбоносных событий</p>
      <p class="hint">Продолжайте сражаться, чтобы открыть новые пути</p>

      <!-- Статистика для понимания прогресса -->
      <div class="stats-preview">
        <div class="stat-item">
          <span>⚔️ Враги</span>
          <span>{{ gameStore.resources.enemiesDefeated }}/5</span>
        </div>
        <div class="stat-item">
          <span>📊 Уровень</span>
          <span>{{ gameStore.resources.cultivationLevel }}/3</span>
        </div>
        <div class="stat-item">
          <span>👆 Тапы</span>
          <span>{{ gameStore.resources.totalTaps }}/1000</span>
        </div>
      </div>
    </div>

    <!-- Завершенные события (история) -->
    <div v-if="milestoneStore.completedMilestones.length > 0" class="history-section">
      <h3>📜 Пройденные пути</h3>
      <div class="history-list">
        <div v-for="id in milestoneStore.completedMilestones" :key="id" class="history-item">
          <span>✅</span>
          <span>{{ id.replace('_', ' ').toUpperCase() }}</span>
        </div>
      </div>
    </div>

    <MobileNav />
  </div>
</template>

<style scoped>
.milestones-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #2a1a3a 0%, #1a1a2e 100%);
  color: white;
  padding: 20px 16px 80px 16px;
}

.page-title {
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 20px;
  color: #ffd700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Прогресс секция */
.progress-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.progress-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9rem;
  opacity: 0.9;
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffd700, #ffaa00);
  transition: width 0.3s ease;
}

/* Активное событие */
.active-milestone {
  background: rgba(255, 215, 0, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 25px;
  border: 2px solid #ffd700;
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
}

.milestone-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.milestone-icon {
  font-size: 3rem;
}

.milestone-title {
  font-size: 1.5rem;
  color: #ffd700;
  margin: 0;
}

.milestone-description {
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 25px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  font-style: italic;
}

/* Сетка выбора */
.choices-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.choice-card {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  padding: 15px;
  color: white;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
}

.choice-card:hover {
  background: rgba(255, 215, 0, 0.2);
  transform: translateX(5px);
  border-color: #ffd700;
}

.choice-icon {
  font-size: 2rem;
  min-width: 50px;
  text-align: center;
}

.choice-content {
  flex: 1;
}

.choice-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 4px;
  color: #ffd700;
}

.choice-description {
  font-size: 0.9rem;
  opacity: 0.9;
}

.choice-select {
  font-size: 0.9rem;
  color: #4caf50;
  opacity: 0;
  transition: opacity 0.3s;
}

.choice-card:hover .choice-select {
  opacity: 1;
}

/* Кнопка пропуска */
.skip-btn {
  width: 100%;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.skip-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

/* Нет событий */
.no-milestones {
  text-align: center;
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  margin-bottom: 25px;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 20px;
  opacity: 0.5;
}

.hint {
  font-size: 0.9rem;
  opacity: 0.6;
  margin-top: 10px;
}

/* Статистика прогресса */
.stats-preview {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  padding: 15px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-item:last-child {
  border-bottom: none;
}

/* История */
.history-section {
  margin-top: 30px;
}

.history-section h3 {
  color: #ffd700;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.history-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.history-item {
  background: rgba(76, 175, 80, 0.2);
  border: 1px solid #4caf50;
  border-radius: 20px;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

/* Адаптивность */
@media (min-width: 768px) {
  .milestones-view {
    max-width: 400px;
    margin: 0 auto;
  }

  .choice-card {
    padding: 12px;
  }

  .choice-icon {
    font-size: 1.8rem;
    min-width: 40px;
  }
}
</style>
