<template>
  <Dialog
    v-model:visible="store.isGameOver"
    modal
    :closable="false"
    :close-on-escape="false"
    :draggable="false"
    :style="{ 'max-width': '600px', margin: '0 var(--space-large)', width: '100%' }"
  >
    <div class="container">
      <h2 v-if="redPoints === bluePoints">It's A Draw!</h2>
      <h2 v-else>
        <span class="red" v-if="redPoints > bluePoints">Red</span
        ><span class="blue" v-else>Blue</span> Wins!
      </h2>

      <div class="points">
        <strong class="red">{{ redPoints }}</strong>
        <span>vs.</span>
        <strong class="blue">{{ bluePoints }}</strong>
      </div>
      <GameBoard :is-copy="isAnimating" width="50%" height="50%" />
      <Button label="Start Game Animation" @click="startGameAnimation" />
    </div>
    <footer>
      <Button label="Rules" severity="secondary" @click="openRules"></Button>
      <Button label="Play Again" @click="close"></Button>
    </footer>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { useGameStore, useGameCopyStore } from '@/stores/game'
import { computed, ref } from 'vue'
import GameBoard from './GameBoard.vue'
import { useStatesStore } from '@/stores/states'
const store = useGameStore()
const redPoints = computed(() => store.getPoints('player1'))
const bluePoints = computed(() => store.getPoints('player2'))
const isAnimating = ref(false)

const copyStore = useGameCopyStore()
copyStore.setup()
const states = useStatesStore()

let cardIndex = 0
let animationTimeout: number
function startGameAnimation() {
  isAnimating.value = true
  if (animationTimeout) {
    clearTimeout(animationTimeout)
  }
  copyStore.setup()
  cardIndex = 0
  animationTimeout = setInterval(frame, 400)
}
function frame() {
  const card = store.history[cardIndex]
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

const close = () => {
  store.setup()
  isAnimating.value = false
}

const openRules = () => {
  store.setup()
  isAnimating.value = false
  states.isRulesOpen = true
}
</script>

<style scoped>
.red {
  color: var(--p-red-400);
}
.blue {
  color: var(--p-blue-400);
}
h2 {
  text-align: center;
  margin: 0;
  margin-bottom: var(--space-large);
  font-size: 3em;
}
.points {
  display: flex;
  justify-content: center;
  gap: var(--space-small);
  font-size: 2em;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--space-large);
}
.board {
  margin-bottom: var(--space-small);
}
footer {
  display: flex;
  gap: var(--space-small);
  justify-content: flex-end;
}
:deep(circle) {
  display: none;
}
</style>
