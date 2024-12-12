import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'

export type Card = {
  distance: 1 | 2 | 3
  direction: 'down' | 'down-left' | 'down-right' | 'left' | 'right' | 'up' | 'up-left' | 'up-right'
}

type PlaceMark = 'empty' | 'player1' | 'player2'
type BoardRow = [
  PlaceMark,
  PlaceMark,
  PlaceMark,
  PlaceMark,
  PlaceMark,
  PlaceMark,
  PlaceMark,
  PlaceMark,
  PlaceMark,
]
export type Board = [
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
]

export type Position = [0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8]

function createGameStore<Id extends string>(id: Id) {
  return defineStore(id, () => {
    const isGameOver = ref(false)
    const deck = ref<Card[]>([])
    const discardedCards = ref<Card[]>([])
    const hand1 = ref<Card[]>([])
    const hand2 = ref<Card[]>([])
    const swap1 = ref(4)
    const swap2 = ref(4)
    const isSwapSelected = ref(false)
    const isPlayer1Turn = ref(true)
    const board = ref<Board>()
    const position = ref<Position>([4, 4])
    const canMakePlay = computed(() => getCanMakePlay(isPlayer1Turn.value ? 'player1' : 'player2'))
    const hintCard = ref<Card>()
    const history = ref<(Card & { player: 'player1' | 'player2' })[]>([])

    function setup() {
      isGameOver.value = false
      history.value = []

      const directions = [
        'down',
        'down-left',
        'down-right',
        'left',
        'right',
        'up',
        'up-left',
        'up-right',
      ] as const
      const allCards: Card[] = []
      for (const distance of [1, 2, 3] as const) {
        for (const direction of directions) {
          allCards.push({ distance, direction })
        }
      }

      deck.value = allCards
      shuffle()

      hand1.value = []
      hand2.value = []
      for (let i = 0; i < 5; i++) {
        hand1.value.push(deck.value.shift()!)
        hand2.value.push(deck.value.shift()!)
      }

      swap1.value = 4
      swap2.value = 4
      isSwapSelected.value = false
      isPlayer1Turn.value = true

      position.value = [4, 4]
      const emptyBoard = []
      for (let i = 0; i < 9; i++) {
        emptyBoard.push(new Array(9).fill('empty') as BoardRow)
      }
      board.value = emptyBoard as Board

      hintCard.value = undefined
    }

    function draw() {
      if (deck.value.length === 0) {
        shuffle()
      }
      if (isPlayer1Turn.value) {
        hand1.value.push(deck.value.shift()!)
      } else {
        hand2.value.unshift(deck.value.shift()!)
      }
      if (deck.value.length === 0) {
        shuffle()
      }
      nextTurn()
    }

    function getNewPosition(card: Card) {
      const directionVectors = {
        down: [0, 1],
        'down-left': [-1, 1],
        'down-right': [1, 1],
        left: [-1, 0],
        right: [1, 0],
        up: [0, -1],
        'up-left': [-1, -1],
        'up-right': [1, -1],
      }
      return [
        position.value[0] + directionVectors[card.direction][0] * card.distance,
        position.value[1] + directionVectors[card.direction][1] * card.distance,
      ]
    }

    function getIsPlayable(
      card: Card,
      player: 'player1' | 'player2',
      isSwapping = isSwapSelected.value,
    ) {
      const [x, y] = getNewPosition(card)
      if (x < 0 || x > 8 || y < 0 || y > 8) {
        return false
      }

      if (board.value![y][x] === player) {
        return false
      }
      if (board.value![y][x] !== 'empty' && !isSwapping) {
        return false
      }
      return true
    }

    function getPoints(player: 'player1' | 'player2'): number {
      let points = 0
      if (!board.value) {
        return 0
      }
      const boardCopy = JSON.parse(JSON.stringify(board.value))

      for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
          points += connectionsFrom(x, y) ** 2
        }
      }

      function connectionsFrom(x: number, y: number): number {
        if (x < 0 || x > 8 || y < 0 || y > 8) {
          return 0
        }
        if (boardCopy[y][x] !== player) {
          return 0
        }
        boardCopy[y][x] = 'empty'

        const connectionsAbove = connectionsFrom(x, y - 1)
        const connectionsLeft = connectionsFrom(x - 1, y)
        const connectionsRight = connectionsFrom(x + 1, y)
        const connectionsUnder = connectionsFrom(x, y + 1)
        return 1 + connectionsAbove + connectionsLeft + connectionsRight + connectionsUnder
      }
      return points
    }

    function play(card: Card, player: 'player1' | 'player2') {
      if (
        !getIsPlayable(card, player) ||
        !(
          (player === 'player1' && isPlayer1Turn.value) ||
          (player === 'player2' && !isPlayer1Turn.value)
        )
      ) {
        return
      }
      const [x, y] = getNewPosition(card)
      position.value = [x as Position[number], y as Position[number]]
      board.value![y][x] = player

      if (player === 'player1') {
        hand1.value = hand1.value.filter(
          (element) => element.direction !== card.direction || element.distance !== card.distance,
        )
      } else {
        hand2.value = hand2.value.filter(
          (element) => element.direction !== card.direction || element.distance !== card.distance,
        )
      }
      discardedCards.value.push(card)

      if (isSwapSelected.value) {
        if (player === 'player1') {
          swap1.value -= 1
        } else {
          swap2.value -= 1
        }
      }

      history.value.push({ ...card, player })
      nextTurn()
    }

    function getCanMakePlay(player: 'player1' | 'player2'): boolean {
      if (player === 'player1') {
        if (hand1.value.length < 5) {
          return true
        }
        for (const card of hand1.value) {
          if (getIsPlayable(card, 'player1', swap1.value > 0)) {
            return true
          }
        }
      } else {
        if (hand2.value.length < 5) {
          return true
        }
        for (const card of hand2.value) {
          if (getIsPlayable(card, 'player2', swap2.value > 0)) {
            return true
          }
        }
      }
      return false
    }

    function shuffle() {
      const cards = [...deck.value, ...discardedCards.value]
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[cards[i], cards[j]] = [cards[j], cards[i]]
      }

      deck.value = cards
      discardedCards.value = []
    }

    function toggleSwapSelected() {
      isSwapSelected.value = !isSwapSelected.value
    }

    function nextTurn() {
      isPlayer1Turn.value = !isPlayer1Turn.value
      isSwapSelected.value = false
      hintCard.value = undefined

      if (!getCanMakePlay('player1') && !getCanMakePlay('player2')) {
        isGameOver.value = true
      }
      /*
        if (
          board.value!.flat().reduce((prev, curr) => (curr !== 'empty' ? prev + 1 : prev), 0) === 52
        ) {
          isGameOver.value = true
        }
        */
    }

    return {
      isGameOver,
      deck,
      hand1,
      hand2,
      swap1,
      swap2,
      isSwapSelected,
      isPlayer1Turn,
      board,
      position,
      canMakePlay,
      hintCard,
      history,
      draw,
      play,
      setup,
      toggleSwapSelected,
      getPoints,
      getIsPlayable,
      getNewPosition,
      nextTurn,
    }
  })
}
export const useGameStore = createGameStore('game')
export const useGameCopyStore = createGameStore('copy')

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot))
}
