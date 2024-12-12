import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, watch } from 'vue'
import { useGameCopyStore } from './game'

export const useStatesStore = defineStore('states', () => {
  const isHomeOpen = ref(true)
  const isRulesOpen = ref(false)
  watch(isRulesOpen, () => {
    window.scrollTo(0, 0)
    const copyStore = useGameCopyStore()
    copyStore.setup()
    copyStore.board = [
      ['empty', 'player1', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'player1', 'player1', 'empty', 'empty', 'player2', 'empty', 'empty', 'empty'],
      ['player2', 'empty', 'player1', 'empty', 'empty', 'player2', 'empty', 'player2', 'player2'],
      ['player2', 'empty', 'empty', 'empty', 'empty', 'player2', 'empty', 'player2', 'empty'],
      ['empty', 'empty', 'empty', 'player1', 'player2', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'player2', 'player2', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'player1', 'player1', 'empty', 'empty', 'player1', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty', 'player1', 'player1', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty', 'player1', 'player1', 'empty', 'player2'],
    ]
  })
  watch(isHomeOpen, () => {
    window.scrollTo(0, 0)
  })
  return { isHomeOpen, isRulesOpen }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStatesStore, import.meta.hot))
}
