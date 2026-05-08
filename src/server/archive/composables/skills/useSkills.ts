import { computed } from 'vue'
import { useSkillStore } from '@/stores/skillStore'
import { usePlayerStore } from '@/stores/playerStore'
import type { Skill } from '@/core/entities/Skill'

export function useSkills() {
  const skillStore = useSkillStore()
  const playerStore = usePlayerStore()

  // Геттеры для конкретных навыков
  const tapDamageSkill = computed(() => skillStore.tapDamage)
  const tapSpeedSkill = computed(() => skillStore.tapSpeed)
  const criticalChanceSkill = computed(() => skillStore.criticalChance)
  const criticalMultiplierSkill = computed(() => skillStore.criticalMultiplier)

  // Все навыки в одном массиве для удобства
  const allSkills = computed(() =>
    [
      tapDamageSkill.value,
      tapSpeedSkill.value,
      criticalChanceSkill.value,
      criticalMultiplierSkill.value,
    ].filter((skill): skill is Skill => skill !== undefined),
  )

  // Проверка возможности улучшения
  const canUpgradeSkill = computed(() => {
    return (skill: Skill | undefined) => {
      if (!skill) return false
      return playerStore.player.spiritStones >= skill.upgradeCost && skill.canUpgrade()
    }
  })

  // Форматирование значения навыка для отображения
  const formatSkillValue = (skill: Skill | undefined): string => {
    if (!skill) return '0'

    switch (skill.id) {
      case 'criticalChance':
        return Math.round(skill.currentValue * 100) + '%'
      case 'criticalMultiplier':
        return 'x' + skill.currentValue
      case 'tapSpeed':
        return skill.currentValue + '/сек'
      default:
        return skill.currentValue.toString()
    }
  }

  const formatNextValue = (skill: Skill | undefined): string => {
    if (!skill || !skill.canUpgrade()) return ''

    switch (skill.id) {
      case 'criticalChance':
        return Math.round(skill.nextValue * 100) + '%'
      case 'criticalMultiplier':
        return 'x' + skill.nextValue
      case 'tapSpeed':
        return skill.nextValue + '/сек'
      default:
        return skill.nextValue.toString()
    }
  }

  // Действия
  const upgradeSkill = async (skillId: string) => {
    const success = await skillStore.upgradeSkill(skillId)
    if (success) {
      // Можно добавить уведомление или звук
      console.log(`Skill ${skillId} upgraded successfully`)
    }
    return success
  }

  const refreshSkills = () => {
    skillStore.refresh()
  }

  return {
    // Навыки
    tapDamageSkill,
    tapSpeedSkill,
    criticalChanceSkill,
    criticalMultiplierSkill,
    allSkills,

    // Хелперы
    canUpgradeSkill,
    formatSkillValue,
    formatNextValue,

    // Действия
    upgradeSkill,
    refreshSkills,
  }
}
