<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useMilestoneStore } from '@/data/store/milestoneStore'
import { computed, ref, watch } from 'vue'

const router = useRouter()
const route = useRoute()
const milestoneStore = useMilestoneStore()

const isMenuOpen = ref(false)

const hasPendingMilestone = computed(() => milestoneStore.pendingMilestone !== null)

const navItems = [
  { path: '/', icon: '⚔️', label: 'Бой' },
  { path: '/skills', icon: '📚', label: 'Навыки' },
  { path: '/milestones', icon: '🌟', label: 'Судьба' },
  { path: '/settings', icon: '⚙️', label: 'Настройки' },
]

const navigate = (path: string) => {
  router.push(path)
  isMenuOpen.value = false
}

// Закрыть меню при смене маршрута
watch(() => route.path, () => {
  isMenuOpen.value = false
})

// Закрыть меню при клике вне
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.mobile-nav') && isMenuOpen.value) {
    isMenuOpen.value = false
  }
}

// Добавляем слушатель при открытии меню
watch(isMenuOpen, (newVal) => {
  if (newVal) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})
</script>

<template>
  <!-- Кнопка-гамбургер -->
  <button class="hamburger-btn" @click.stop="isMenuOpen = !isMenuOpen">
    <span class="hamburger-icon">☰</span>
  </button>

  <!-- Выпадающее меню -->
  <Teleport to="body">
    <Transition name="menu">
      <nav v-if="isMenuOpen" class="mobile-nav">
        <button v-for="item in navItems" :key="item.path" class="nav-item" :class="{ active: route.path === item.path }"
          @click="navigate(item.path)">
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
          <span v-if="item.path === '/milestones' && hasPendingMilestone" class="milestone-dot"></span>
        </button>
      </nav>
    </Transition>
  </Teleport>
</template>

<style scoped>
.hamburger-btn {
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.2s ease;
}

.hamburger-btn:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: scale(1.05);
}

.hamburger-icon {
  font-size: 1.5rem;
  color: white;
}

.mobile-nav {
  position: fixed;
  top: 70px;
  right: 180px;
  min-width: 160px;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;
  position: relative;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.active {
  background: rgba(255, 215, 0, 0.15);
  color: #ffd700;
}

.nav-icon {
  font-size: 1.2rem;
}

.nav-label {
  font-size: 0.9rem;
  font-weight: 500;
}

.milestone-dot {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 8px;
  height: 8px;
  background: #ffd700;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

/* Анимация появления меню */
.menu-enter-active,
.menu-leave-active {
  transition: all 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.5);
    opacity: 0.7;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
