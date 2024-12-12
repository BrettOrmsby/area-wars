<template>
  <main>
    <ConfirmDialog />
    <h1><span class="red">Area</span> <span class="blue">Wars</span></h1>
    <div class="button-container">
      <Button aria-label="Rules" severity="secondary" @click="() => (states.isRulesOpen = true)">
        <template #icon="iconClass"> <Info :class="iconClass.class" /> </template
      ></Button>
      <Button aria-label="Restart" severity="secondary" @click="restart">
        <template #icon="iconClass"> <RotateCw :class="iconClass.class" /> </template
      ></Button>
    </div>
    <GameOver />
    <div class="board-sides-container">
      <PlayerSide player="player1" />
      <GameBoard :board="store.board!" :position="store.position" width="min(50vh, 50vw)" />
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
import { useStatesStore } from '@/stores/states'
import GameOver from '@/components/GameOver.vue'
import { Info, RotateCw } from 'lucide-vue-next'

import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
const confirm = useConfirm()

const store = useGameStore()
const states = useStatesStore()

const restart = () => {
  if (!store.board?.flat().reduce((prev, curr) => prev || curr !== 'empty', false)) {
    store.setup()
    return
  }
  confirm.require({
    message: 'Are you sure you want to restart?',
    header: 'Restart',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
    },
    acceptProps: {
      label: 'Restart',
    },
    accept: () => {
      store.setup()
    },
  })
}
</script>

<style scoped>
h1 {
  text-align: center;
}
.red {
  color: var(--p-red-400);
}
.blue {
  color: var(--p-blue-400);
}
.button-container {
  position: fixed;
  right: var(--space-large);
  top: var(--space-large);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: var(--space-small);
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
