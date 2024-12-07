<template>
  <div class="separator" :class="store.isPlayer1Turn ? 'red' : 'blue'">
    {{ store.isPlayer1Turn ? 'Red' : 'Blue' }}
  </div>
</template>

<script lang="ts" setup>
import { useGameStore } from '@/stores/game'
const store = useGameStore()
</script>

<style scoped>
.separator {
  display: flex;
  align-items: center;
  text-align: center;
  font-weight: bold;
  margin-top: var(--space-large);
  transition-duration: 0.2s;
  color: var(--p-red-400);
}

.separator::before,
.separator::after {
  transition-duration: 0.2s;
  content: '';
  flex: 1;
  border-bottom: 2px solid var(--p-red-400);
}
.separator.blue {
  color: var(--p-blue-400);
}
.separator.blue::before,
.separator.blue::after {
  border-color: var(--p-blue-400);
}

.separator:not(:empty)::before {
  margin-right: var(--space-small);
}

.separator:not(:empty)::after {
  margin-left: var(--space-small);
}
</style>
