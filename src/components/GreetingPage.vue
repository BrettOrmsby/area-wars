<template>
  <main>
    <h1><span class="red">Area</span> <span class="blue">Wars</span></h1>
    <p class="subheading">
      A strategic, two-player, turn-based game of tile control and dominance.
    </p>
    <GameBoard is-copy width="min(50%, 400px)" />
    <div class="button-container">
      <Button severity="danger" @click="openPlay">Play</Button>
      <Button severity="info" @click="openRules">Rules</Button>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useStatesStore } from '@/stores/states'
import { useGameCopyStore, useGameStore, type Card } from '@/stores/game'
import { onMounted } from 'vue'
import GameBoard from './GameBoard.vue'
import Button from 'primevue/button'
const states = useStatesStore()

const cards: (Card & { player: 'player1' | 'player2' })[] = [
  { direction: 'left', distance: 3, player: 'player1' },
  { direction: 'down-left', distance: 1, player: 'player1' },
  { direction: 'down', distance: 1, player: 'player1' },
  { direction: 'up', distance: 2, player: 'player1' },
  { direction: 'up', distance: 1, player: 'player1' },
  { direction: 'up-right', distance: 1, player: 'player1' },
  { direction: 'right', distance: 1, player: 'player1' },
  { direction: 'down', distance: 2, player: 'player1' },
  { direction: 'right', distance: 1, player: 'player1' },
  { direction: 'up', distance: 1, player: 'player1' },
  { direction: 'up-right', distance: 1, player: 'player2' },
  { direction: 'down', distance: 2, player: 'player2' },
  { direction: 'up', distance: 1, player: 'player2' },
  { direction: 'down', distance: 2, player: 'player2' },
  { direction: 'left', distance: 1, player: 'player1' },
  { direction: 'down', distance: 1, player: 'player1' },
  { direction: 'right', distance: 2, player: 'player2' },
  { direction: 'up-right', distance: 1, player: 'player2' },
  { direction: 'down-right', distance: 1, player: 'player2' },
  { direction: 'up-right', distance: 1, player: 'player2' },
  { direction: 'up', distance: 3, player: 'player2' },
  { direction: 'down', distance: 2, player: 'player2' },
  { direction: 'up', distance: 1, player: 'player2' },
]

const copyStore = useGameCopyStore()
copyStore.setup()

let cardIndex = 0
let animationTimeout: number
function startGameAnimation() {
  if (animationTimeout) {
    clearTimeout(animationTimeout)
  }
  copyStore.setup()
  cardIndex = 0
  animationTimeout = setInterval(frame, 400)
}
function frame() {
  const card = cards[cardIndex]
  if (!card) {
    clearTimeout(animationTimeout)
    return
  }

  if (card.player !== (copyStore.isPlayer1Turn ? 'player1' : 'player2')) {
    copyStore.draw()
  }

  cardIndex += 1
  copyStore.hintCard = card // Needed for animation for some reason
  copyStore.isSwapSelected = true
  setTimeout(() => copyStore.play(card, card.player), 1)
}

onMounted(() => startGameAnimation())

const openRules = () => {
  clearTimeout(animationTimeout)
  useGameStore().setup()
  states.isRulesOpen = true
  states.isHomeOpen = false
}
const openPlay = () => {
  clearTimeout(animationTimeout)
  useGameStore().setup()
  states.isHomeOpen = false
}
</script>

<style scoped>
h1 {
  font-size: 3rem;
  text-wrap: balance;
  text-align: center;
  margin-bottom: var(--space-small);
}
.red {
  color: var(--p-red-400);
}
.blue {
  color: var(--p-blue-400);
}
.subheading {
  margin-top: 0;
  text-align: center;
  margin-bottom: var(--space-large);
  color: var(--p-text-muted-color);
}
.board {
  margin: 0 auto;
  display: block;
  margin-bottom: var(--space-large);
}
.button-container {
  display: flex;
  justify-content: center;
  gap: var(--space-small);
}
</style>
