<script setup lang="ts">
defineProps<{
  logs: string[]
}>()
</script>

<template>
  <div class="battle-log">
    <h3 class="log-title">📝 Журнал событий</h3>
    <div class="log-entries">
      <div
        v-for="(log, index) in logs"
        :key="index"
        class="log-entry"
        :class="{ fresh: index === 0 }"
      >
        {{ log }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.battle-log {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  height: 500px;
  display: flex;
  flex-direction: column;
}

.log-title {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.2rem;
  opacity: 0.9;
}

.log-entries {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
}

.log-entry {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
  font-size: 0.9rem;
  border-left: 3px solid transparent;
  animation: slideIn 0.3s ease;
}

.log-entry.fresh {
  border-left-color: #ffd700;
  background: rgba(255, 215, 0, 0.1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}
</style>
