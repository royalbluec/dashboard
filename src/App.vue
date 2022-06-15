<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <TotalEventCount />
</template>

<script>
import TotalEventCount from './components/TotalEventCount.vue';

export default {
  name: 'App',
  data() {
    return {
      price1: 60,
      price2: 70,
    };
  },
  components: {
    TotalEventCount,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
