<template>
  <div
    class="card"
    :class="{ [player]: true, isTurn, isPlayable: store.getIsPlayable(card, player) }"
    @click="store.play(card, player)"
    @mouseenter="showPlaceHint"
    @mouseleave="() => (store.hintCard = undefined)"
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

const showPlaceHint = () => {
  if (!isTurn.value || !store.getIsPlayable(props.card, props.player)) {
    return
  }
  store.hintCard = props.card
}
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
  /* this is to avoid the opacity of the auto animate */
  background-color: color-mix(in srgb, var(--secondary-surface), black 20%);
  color: color-mix(in srgb, var(--theme-color), black 20%);
}
.card.isTurn.isPlayable {
  cursor: pointer;
}
.card.isTurn.isPlayable:hover {
  background-color: var(--secondary-surface-hover);
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
@media screen and (max-width: 650px) {
  svg {
    width: 2em;
    height: 2em;
  }
}
@media screen and (max-width: 550px) {
  .right {
    display: none;
  }
  .left {
    text-align: center;
    margin-bottom: calc(var(--space-small) / 2);
  }
}
</style>
