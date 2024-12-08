<template>
  <h1>Area Wars</h1>
  <GameOver />
  <main>
    <div class="board-sides-container">
      <PlayerSide player="player1" />
      <GameBoard :board="store.board!" width="min(50vh, 50vw)" />
      <PlayerSide player="player2" />
    </div>
    <TurnIndicator />
    <div class="hands">
      <div class="hand" v-auto-animate>
        <GameCard
          v-for="card in store.hand1"
          :key="`${card.direction}-${card.distance}`"
          :card="card"
          player="player1"
        />
      </div>
      <GameDeck />
      <div class="hand" v-auto-animate>
        <GameCard
          v-for="card in store.hand2"
          :key="`${card.direction}-${card.distance}`"
          :card="card"
          player="player2"
        />
      </div>
    </div>
    <div class="pass-turn-container">
      <Button v-show="!store.canMakePlay" @click="store.nextTurn()" severity="secondary"
        >Pass Turn</Button
      >
    </div>
  </main>
</template>

<script lang="ts" setup>
import GameBoard from '@/components/GameBoard.vue'
import GameCard from '@/components/GameCard.vue'
import GameDeck from '@/components/GameDeck.vue'
import PlayerSide from '@/components/PlayerSide.vue'
import TurnIndicator from '@/components/TurnIndicator.vue'
import Button from 'primevue/button'
import { useGameStore } from '@/stores/game'
import { onMounted } from 'vue'
import GameOver from '@/components/GameOver.vue'

const store = useGameStore()
onMounted(store.setup)
</script>

<style scoped>
h1 {
  text-align: center;
}
.board-sides-container,
.hands {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-large);
}

.hands {
  margin-top: var(--space-large);
}

.hand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-small);
  flex-wrap: wrap;
  width: 100%;
  flex-grow: 1;
}

.pass-turn-container {
  text-align: center;
  margin-top: var(--space-small);
}

@media screen and (max-width: 550px) {
  .hands {
    flex-direction: column;
  }
  .board-sides-container {
    flex-wrap: wrap;
  }
  .board-sides-container :deep(.board) {
    order: 2;
    width: 100%;
    max-width: 280px;
  }
}
</style>
