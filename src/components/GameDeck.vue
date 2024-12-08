<template>
  <div class="deck" :class="{ canDraw }" @click="draw">
    <strong class="left">{{ store.deck.length }}</strong>
    <CopyPlus />
    <strong class="right">{{ store.deck.length }}</strong>
  </div>
</template>

<script lang="ts" setup>
import { CopyPlus } from 'lucide-vue-next'
import { useGameStore } from '@/stores/game'
import { computed } from 'vue'
const store = useGameStore()

const hand = computed(() => (store.isPlayer1Turn ? store.hand1 : store.hand2))

const canDraw = computed(() => hand.value.length < 5)

const draw = () => {
  if (!canDraw.value) {
    return
  }
  store.draw()
}
</script>

<style scoped>
.deck {
  background-color: var(--secondary-surface);
  border-radius: var(--p-border-radius-sm);
  padding: var(--space-large);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: var(--theme-color);
  transition-duration: 0.2s;
}
.deck:not(.canDraw) {
  opacity: 0.4;
}
.deck.canDraw {
  cursor: pointer;
}
.deck.canDraw:hover {
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
  .deck {
    order: 2;
  }
  .right {
    display: none;
  }
  .left {
    text-align: center;
    margin-bottom: calc(var(--space-small) / 2);
  }
}
</style>
