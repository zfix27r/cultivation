<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
:root {
  --padding-small: 4px;

  --flex-gap-medium: 8px;
}

html,
body {
  height: 100%;
  margin: auto;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
