<template>
  <svg class="board" viewBox="0 0 368 368" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="100%" height="100%" fill="light-dark(#fff, #1C1B22)" />
    <template v-for="(row, y) in board" class="tile" :key="y">
      <rect
        v-for="(item, x) in row"
        :key="y"
        width="32"
        height="32"
        rx="3"
        ry="3"
        :x="8 * (1 + x) + 32 * x"
        :y="8 * (1 + y) + 32 * y"
        class="tile"
        :class="item"
      ></rect>
      <Crown
        :x="8 * (1 + store.position[0]) + 32 * store.position[0] + 4"
        :y="8 * (1 + store.position[1]) + 32 * store.position[1] + 4"
      />
    </template>
  </svg>
</template>

<script lang="ts" setup>
import { useGameStore, type Board } from '@/stores/game'
import { Crown } from 'lucide-vue-next'
defineProps<{ board: Board }>()
const store = useGameStore()
</script>

<style scoped>
.board {
  flex-shrink: 0;
}
.tile {
  fill: var(--secondary-surface);
}
.player1 {
  fill: var(--p-red-400);
}
.player2 {
  fill: var(--p-blue-400);
}
</style>
