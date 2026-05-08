<!-- src/views/SettingsView.vue -->
<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import MobileNav from '@/presentation/battle/MobileNav.vue'

const gameStore = useGameStore()

const handleReset = () => {
  if (confirm('Вы уверены? Весь прогресс будет потерян!')) {
    localStorage.removeItem('cultivationSave')
    window.location.reload()
  }
}
</script>

<template>
  <div class="settings-view">
    <h1 class="page-title">⚙️ Настройки</h1>

    <div class="settings-list">
      <div class="setting-item">
        <span class="setting-label">💾 Сохранение</span>
        <button class="setting-btn save" @click="gameStore.saveGame()">Сохранить</button>
      </div>

      <div class="setting-item">
        <span class="setting-label">📂 Загрузка</span>
        <button class="setting-btn load" @click="gameStore.loadGame()">Загрузить</button>
      </div>

      <div class="setting-item">
        <span class="setting-label">⚠️ Опасная зона</span>
        <button class="setting-btn reset" @click="handleReset">Сброс игры</button>
      </div>

      <div class="stats-section">
        <h3>📊 Статистика</h3>
        <div class="stat-row">
          <span>Всего тапов:</span>
          <span>{{ gameStore.resources.totalTaps }}</span>
        </div>
        <div class="stat-row">
          <span>Врагов побеждено:</span>
          <span>{{ gameStore.resources.enemiesDefeated }}</span>
        </div>
        <div class="stat-row">
          <span>Текущий уровень:</span>
          <span>{{ gameStore.resources.cultivationLevel }}</span>
        </div>
      </div>
    </div>

    <MobileNav />
  </div>
</template>

<style scoped>
.settings-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #2a1a2a 0%, #211621 100%);
  color: white;
  padding: 20px 16px 80px 16px;
}

.page-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
  color: #ffd700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 15px 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.setting-label {
  font-size: 1.1rem;
  font-weight: 500;
}

.setting-btn {
  padding: 10px 25px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.setting-btn.save {
  background: #4caf50;
  color: white;
}

.setting-btn.load {
  background: #2196f3;
  color: white;
}

.setting-btn.reset {
  background: #f44336;
  color: white;
}

.setting-btn:active {
  transform: scale(0.95);
}

.stats-section {
  margin-top: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stats-section h3 {
  margin-bottom: 15px;
  color: #ffd700;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-row:last-child {
  border-bottom: none;
}

@media (min-width: 768px) {
  .settings-view {
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>
