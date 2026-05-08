<script setup lang="ts">
import type { Skill } from '@/core/entities/Skill'

const props = defineProps<{
  skill: Skill
  canUpgrade: boolean
  formatValue: (skill: Skill) => string
  formatNext: (skill: Skill) => string
}>()

const emit = defineEmits<{
  (e: 'upgrade', skillId: string): void
}>()

const getSkillIcon = (skillId: string): string => {
  const icons: Record<string, string> = {
    tapDamage: '⚔️',
    tapSpeed: '🤖',
    criticalChance: '✨',
    criticalMultiplier: '💥',
  }
  return icons[skillId] || '📚'
}
</script>

<template>
  <div class="skill-card">
    <div class="skill-icon">{{ getSkillIcon(skill.id) }}</div>

    <div class="skill-info">
      <div class="skill-name">{{ skill.name }}</div>
      <div class="skill-desc">{{ skill.description }}</div>
      <div class="skill-stats">
        <span class="skill-level">Ур. {{ skill.level }}</span>
        <span class="skill-value">Текущее: {{ formatValue(skill) }}</span>
        <span v-if="skill.canUpgrade()" class="skill-next"> → {{ formatNext(skill) }} </span>
      </div>
    </div>

    <div class="skill-actions">
      <div class="skill-cost">{{ skill.upgradeCost }} 💎</div>
      <button class="upgrade-btn" @click="emit('upgrade', skill.id)" :disabled="!canUpgrade">
        Улучшить
      </button>
    </div>
  </div>
</template>

<style scoped>
.skill-card {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.skill-icon {
  font-size: 2.5rem;
  min-width: 50px;
  text-align: center;
}

.skill-info {
  flex: 1;
}

.skill-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 4px;
  color: #ffd700;
}

.skill-desc {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 8px;
}

.skill-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 0.9rem;
}

.skill-level {
  color: #4caf50;
  background: rgba(76, 175, 80, 0.2);
  padding: 2px 8px;
  border-radius: 12px;
}

.skill-value {
  color: #2196f3;
}

.skill-next {
  color: #ff9800;
}

.skill-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  min-width: 100px;
}

.skill-cost {
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffd700;
}

.upgrade-btn {
  padding: 8px 16px;
  background: linear-gradient(145deg, #4caf50, #45a049);
  border: none;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.upgrade-btn:active {
  transform: scale(0.95);
}

.upgrade-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  transform: none;
}
</style>
