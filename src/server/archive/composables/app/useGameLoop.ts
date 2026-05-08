import { ref, onUnmounted, watch } from 'vue'
import { useSkillStore } from '@/data/store/skillStore'
import { useCombatStore } from '@/data/store/combatStore'

export function useGameLoop() {
  const skillStore = useSkillStore()
  const combatStore = useCombatStore()

  const isRunning = ref(false)
  let autoTapInterval: number | undefined
  let resourceInterval: number | undefined

  const startLoop = () => {
    if (isRunning.value) return

    // Авто-тап
    const updateAutoTap = () => {
      const speed = skillStore.tapSpeed?.currentValue || 0
      if (speed > 0) {
        autoTapInterval = window.setInterval(() => {
          combatStore.tap()
        }, 1000 / speed)
      }
    }

    // Ресурсы (камни духа капают сами)
    resourceInterval = window.setInterval(() => {
      // Логика генерации ресурсов
    }, 1000)

    updateAutoTap()
    isRunning.value = true

    // Следим за изменением скорости
    const stopWatch = watch(
      () => skillStore.tapSpeed?.currentValue,
      () => {
        if (autoTapInterval) {
          clearInterval(autoTapInterval)
          updateAutoTap()
        }
      },
    )

    onUnmounted(() => {
      stopWatch()
    })
  }

  const stopLoop = () => {
    if (autoTapInterval) {
      clearInterval(autoTapInterval)
    }
    if (resourceInterval) {
      clearInterval(resourceInterval)
    }
    isRunning.value = false
  }

  return {
    isRunning,
    startLoop,
    stopLoop,
  }
}
