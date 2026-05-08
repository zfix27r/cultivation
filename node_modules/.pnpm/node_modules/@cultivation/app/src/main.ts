import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { useFeedStore } from '@cultivation/feed'
import { useEventStore } from '@cultivation/event'

import './styles/sprite/base.css'

import router from './router'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')

// Инициализация модулей
const feedStore = useFeedStore()
feedStore.add({
  text: '🎮 Игра запущена',
  timestamp: new Date().toLocaleTimeString()
})

const eventStore = useEventStore()
eventStore.add({
  type: 'battle',
  priority: 1,
  duration: 0,
  icon: 'battle',
  title: '⚔️ Битва',
  description: 'Гоблин-разбойник преграждает путь',
})