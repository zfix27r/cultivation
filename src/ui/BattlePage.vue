<script setup lang="ts">
import { onMounted } from 'vue'
import BattleHeaderComponent from '@/ui/battle/BattleHeaderComponent.vue'
import BattleMainComponent from '@/ui/battle/BattleMainComponent.vue'
import BattleFooterComponent from '@/ui/battle/BattleFooterComponent.vue'
import { useBattleStore } from '@/ui/useBattleStore'

const store = useBattleStore()

onMounted(async () => {
  await store.init()
})
</script>

<template>
  <BattleHeaderComponent />
  <BattleMainComponent />
  <BattleFooterComponent />
</template>

<style scoped></style>
