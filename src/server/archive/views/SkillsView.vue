<script setup lang="ts">
/*import { onMounted } from 'vue'
import { useSkills } from '@/composables/skills/useSkills'
import SkillCard from '@/components/skills/SkillCard.vue'
import ResourceDisplay from '@/components/shared/ResourceDisplay.vue'
import MobileNav from '@/components/app/MobileNav.vue'

// Используем композицию
const {
  allSkills,
  canUpgradeSkill,
  formatSkillValue,
  formatNextValue,
  upgradeSkill,
  refreshSkills,
} = useSkills()

onMounted(() => {
  refreshSkills()
})*/
</script>

<template>
  <div class="skills-view">
    <h1 class="page-title">📚 Навыки</h1>

    <!-- Компонент ресурсов -->
    <ResourceDisplay />

    <!-- Список навыков -->
    <div class="skills-list">
      <SkillCard
        v-for="skill in allSkills"
        :key="skill.id"
        :skill="skill"
        :can-upgrade="canUpgradeSkill(skill)"
        :format-value="formatSkillValue"
        :format-next="formatNextValue"
        @upgrade="upgradeSkill"
      />
    </div>

    <!-- Подсказка -->
    <div class="hint">💡 Убивайте врагов, чтобы зарабатывать камни духа и улучшать навыки</div>

    <MobileNav />
  </div>
</template>

<style scoped>
.skills-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2a1a 0%, #162116 100%);
  color: white;
  padding: 20px 16px 80px 16px;
}

.page-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
  color: #ffd700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.hint {
  text-align: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  font-size: 0.9rem;
  opacity: 0.7;
}

@media (min-width: 768px) {
  .skills-view {
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>
