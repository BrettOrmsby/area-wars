<template>
  <div
    class="card"
    :class="{ [player]: true, isTurn, isPlayable: store.getIsPlayable(card, player) }"
    @click="store.play(card, player)"
  >
    <strong class="left">{{ card.distance }}</strong>
    <component :is="icons[card.direction]" />
    <strong class="right">{{ card.distance }}</strong>
  </div>
</template>

<script lang="ts" setup>
import type { Card } from '@/stores/game'
import {
  MoveDown,
  MoveDownLeft,
  MoveDownRight,
  MoveLeft,
  MoveRight,
  MoveUp,
  MoveUpLeft,
  MoveUpRight,
} from 'lucide-vue-next'
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'

const props = defineProps<{ card: Card; player: 'player1' | 'player2' }>()
const store = useGameStore()
const icons = {
  down: MoveDown,
  'down-left': MoveDownLeft,
  'down-right': MoveDownRight,
  left: MoveLeft,
  right: MoveRight,
  up: MoveUp,
  'up-left': MoveUpLeft,
  'up-right': MoveUpRight,
}

const isTurn = computed(
  () =>
    (props.player === 'player1' && store.isPlayer1Turn) ||
    (props.player === 'player2' && !store.isPlayer1Turn),
)

// TODO: when hover over, show where the peice would be added
</script>

<style scoped>
.player1 {
  --theme-color: var(--p-red-400);
}
.player2 {
  --theme-color: var(--p-blue-400);
}
.card {
  background-color: var(--secondary-surface);
  border: 1px solid var(--secondary-surface);
  border-radius: var(--p-border-radius-sm);
  padding: var(--space-large);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: var(--theme-color);
  transition-duration: 0.2s;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.card.isTurn:not(.isPlayable),
.card:not(.isTurn) {
  opacity: 0.6;
}
.card.isTurn.isPlayable {
  cursor: pointer;
}
.card.isTurn.isPlayable:hover {
  border-color: var(--theme-color);
}
.left {
  width: 100%;
  display: block;
  text-align: left;
}
svg {
  width: 3em;
  height: 3em;
}
.right {
  width: 100%;
  display: block;
  text-align: right;
}
</style>
