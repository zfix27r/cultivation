<script setup lang="ts">
import { FeedComponent } from '@cultivation/feed'
import { EventComponent } from '@cultivation/event'

const handleEventSelect = (eventId: string) => {
  console.log('Выбрано событие:', eventId)
}
</script>

<template>
  <div class="game-page">
    <header class="game-header">
      <h1>🧘 Культиватор</h1>
      <EventComponent @select="handleEventSelect" />
    </header>

    <main class="game-main">
      <p>Здесь будет бой</p>
    </main>

    <footer class="game-footer">
      <FeedComponent />
    </footer>
  </div>
</template>

<style scoped>
.game-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 420px;
  margin: 0 auto;
  padding: 12px;
}

.game-header {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

h1 {
  font-size: 1.2rem;
  color: #ffd700;
  margin: 0;
}

.game-main {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
}

.game-footer {
  flex-shrink: 0;
  margin-top: 16px;
}
</style>