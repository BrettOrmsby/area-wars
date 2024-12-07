<template>
  <Dialog
    v-model:visible="store.isGameOver"
    modal
    :closable="false"
    :close-on-escape="false"
    :draggable="false"
    :style="{ 'max-width': '600px', margin: '0 var(--space-large)', width: '100%' }"
  >
    <main>
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
      <GameBoard :board="store.board!" width="50%" height="50%" />
    </main>
    <footer>
      <Button
        as="router-link"
        label="Cancel"
        severity="secondary"
        to="/"
        style="text-decoration: none"
      ></Button>
      <Button label="Play Again" @click="store.setup()"></Button>
    </footer>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { useGameStore } from '@/stores/game'
import { computed } from 'vue'
import GameBoard from './GameBoard.vue'
const store = useGameStore()
const redPoints = computed(() => store.getPoints('player1'))
const bluePoints = computed(() => store.getPoints('player2'))
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
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--space-large);
}
footer {
  display: flex;
  gap: var(--space-small);
  justify-content: flex-end;
}
</style>
