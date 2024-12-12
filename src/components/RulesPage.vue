<template>
  <main>
    <h2><span class="red">Area</span> <span class="blue">Wars</span> Rules</h2>
    <p>
      The battle ensues between the <strong class="red">Red</strong> and
      <strong class="blue">Blue</strong>, each trying to conquer the area and span the largest
      kingdoms. Begin by selecting who will be <strong class="red">Red</strong> and who will play
      Blue. Swift <strong class="red">Red</strong> takes the first turn, but before, they must
      consider their options.
    </p>
    <p>
      At the beginning of the game, each player is dealt five cards, each with a direction and a
      distance between one and three. All players can view each card, even those in their opponent's
      hand. On a turn, the player must draw a card, play a card, play a card with Overthrow active,
      or pass their turn.
    </p>
    <h3>Draw a Card</h3>
    <p>
      If there are under five cards in the hand, a card can be drawn from the deck. Additionally,
      the deck shows the number of cards remaining within. Thus, players can attempt to keep track
      of the cards that will come up. When the deck reaches zero cards, all played cards are
      shuffled into it. There is only one card for each of the eight directions at each distance.
    </p>
    <h3>Play a Card</h3>
    <p>
      Unplayable cards appear darker than playable ones. To play a card, tap on it in the hand. The
      Crown piece will move to a new tile in the direction and with a distance specified on the
      card. When hovering over playable cards, a circle will appear on the board where the Crown
      will move. After playing a card, the tile where the Crown lands will be claimed as part of the
      kingdom, indicated by the colour. Cards can not be played if they cause the Crown to move off
      the board or into a claimed tile.
    </p>
    <h3>Play a Card with Overthrow Active</h3>
    <p>
      Each player has four opportunities to Overthrow tiles. To activate the Overthrow ability, tap
      the Overthrow swords. Now, when playing a card this turn, the Crown can move to tiles claimed
      by the opponent and take control. To disable Overthrow, re-click the Overthrow Swords.
    </p>
    <h3>Pass the Turn</h3>
    <p>
      If a player has five cards in hand, cannot play a card, and cannot play a card with Overthrow
      active, they must pass their turn. When this happens, a Pass Turn button will appear and must
      be clicked. The opposing player may capitalize by drawing cards up to a maximum of five while
      their opponent must keep passing.
    </p>
    <h3>Ending the Game</h3>
    <p>
      The game ends when both players are unable to play. The winner is the player with the greatest
      score, meaning they conquered the largest areas, sections of touching tiles of the same
      colour. Each area scores points equal to the square of the number of tiles. For example, an
      area of one tile will only score one point, an area of two will score four points, and an area
      of three will score nine. Therefore, it is better to make a larger area than many smaller
      ones.
    </p>
    <GameBoard is-copy width="min(50%, 400px)" />
    <p>
      For example, when scoring for the board above, <strong class="red">Red</strong> has four
      different areas. There is a one-tile area, 2-tile area, 4-tile area, and 5-tile area. To
      calculate the points,
      <span style="white-space: pre"
        >1<sup>2</sup> + 2<sup>2</sup> + 4<sup>2</sup> + 5<sup>2</sup> = 46</span
      >. <strong class="blue">Blue</strong> has five different areas. There is a one-tile area, a
      two-tile area, and three three-tile areas. To calculate the points,
      <span style="white-space: pre"
        >1<sup>2</sup> + 2<sup>2</sup> + 3<sup>2</sup> + 3<sup>2</sup> + 3<sup>2</sup> = 32</span
      >. So, in this case, even though <strong class="red">Red</strong> and
      <strong class="blue">Blue</strong> placed the same number of tiles,
      <strong class="red">Red</strong> has more points.
    </p>
    <div class="button-container">
      <Button @click="() => (states.isRulesOpen = false)">Play</Button>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useStatesStore } from '@/stores/states'
import Button from 'primevue/button'
import GameBoard from './GameBoard.vue'
const states = useStatesStore()
</script>

<style scoped>
main {
  max-width: calc(70ch + 2 * var(--space-large));
  padding: var(--space-large);
  padding-top: 0;
  margin: 0 auto;
}
h2 {
  font-size: 3rem;
  text-wrap: balance;
  text-align: center;
  margin-bottom: var(--space-small);
  line-height: 1.2;
}
.red {
  color: var(--p-red-400);
}
.blue {
  color: var(--p-blue-400);
}

p {
  line-height: 1.5;
}

.board {
  display: block;
  margin: 0 auto;
}

.button-container {
  text-align: center;
  margin-top: var(--space-large);
}
</style>
