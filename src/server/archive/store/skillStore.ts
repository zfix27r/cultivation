import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { LocalStoragePlayerRepository } from '@/server/archive/LocalStoragePlayerRepository'
import { UpgradeSkillUseCase } from '@/core/usecases/skills/UpgradeSkillUseCase'
import { LoggerService } from '@/ui/feed/useFeedStore'
import type { Skill } from '@/core/entities/Skill'

export const useSkillStore = defineStore('skills', () => {
  const repository = new LocalStoragePlayerRepository()
  const logger = new LoggerService()
  const upgradeUseCase = new UpgradeSkillUseCase(repository, logger)

  const skills = ref<Skill[]>(repository.getAllSkills())

  // Геттеры для конкретных навыков
  const tapDamage = computed(() => skills.value.find((s) => s.id === 'tapDamage'))
  const tapSpeed = computed(() => skills.value.find((s) => s.id === 'tapSpeed'))
  const criticalChance = computed(() => skills.value.find((s) => s.id === 'criticalChance'))
  const criticalMultiplier = computed(() => skills.value.find((s) => s.id === 'criticalMultiplier'))

  function upgradeSkill(skillId: string) {
    const result = upgradeUseCase.execute(skillId)
    if (result.success) {
      // Обновляем список навыков
      skills.value = repository.getAllSkills()

      // Обновляем playerStore
      const { usePlayerStore } = require('./playerStore')
      const playerStore = usePlayerStore()
      playerStore.refresh()

      return true
    }
    return false
  }

  function refresh() {
    skills.value = repository.getAllSkills()
  }

  return {
    skills,
    tapDamage,
    tapSpeed,
    criticalChance,
    criticalMultiplier,
    upgradeSkill,
    refresh,
  }
})
