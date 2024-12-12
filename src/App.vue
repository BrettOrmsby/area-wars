<template>
  <GreetingPage v-if="states.isHomeOpen" />
  <RulesPage v-else-if="states.isRulesOpen" />
  <PlayPage v-else />
  <TheFooter />
</template>

<script lang="ts" setup>
import GreetingPage from '@/components/GreetingPage.vue'
import RulesPage from '@/components/RulesPage.vue'
import PlayPage from '@/components/PlayPage.vue'
import { useStatesStore } from './stores/states'
import TheFooter from '@/components/TheFooter.vue'
const states = useStatesStore()
</script>

<style scoped></style>
