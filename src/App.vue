<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <TotalEventCount />
  <TotalReferralChart /> -->
  <grid-layout
    v-model:layout="layout"
    :col-num="12"
    :row-height="20"
    :is-draggable="draggable"
    :is-resizable="resizable"
    :vertical-compact="true"
    :use-css-transforms="true"
  >
    <grid-item
      v-for="item in layout"
      :static="item.static"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i"
    >
      <component :is="item.c"></component>
      <!-- <TotalReferralChart /> -->
      <!-- <span class="text">{{ itemTitle(item) }}</span> -->
    </grid-item>
    <!-- <grid-item :static="false" :x="0" :y="0" :w="6" :h="4" :i="0">1</grid-item>
    <grid-item :static="false" :x="6" :y="0" :w="6" :h="4" :i="2">2</grid-item>
    <grid-item :static="false" :x="0" :y="4" :w="12" :h="8" :i="3">3</grid-item>
    <grid-item :static="false" :x="0" :y="12" :w="6" :h="8" :i="4">4</grid-item>
    <grid-item :static="false" :x="6" :y="12" :w="6" :h="8" :i="5">5</grid-item> -->
  </grid-layout>
</template>

<script>
// import TotalEventCount from './components/TotalEventCount.vue';
import TotalReferralChart from './components/TopReferralChart.vue';

export default {
  name: 'App',
  data() {
    return {
      price1: 60,
      price2: 70,
      layout: [
        { x: 0, y: 0, w: 6, h: 4, i: '0', c: TotalReferralChart },
        { x: 6, y: 0, w: 6, h: 4, i: '1' },
        { x: 0, y: 4, w: 12, h: 8, i: '2' },
        { x: 0, y: 12, w: 6, h: 8, i: '3' },
        { x: 6, y: 12, w: 6, h: 8, i: '4' },
      ],
      draggable: true,
      resizable: true,
      index: 0,
    };
  },
  components: {
    // TotalEventCount,
    TotalReferralChart,
  },
  methods: {
    itemTitle(item) {
      let result = item.i;
      if (item.static) {
        result += ' - Static';
      }
      return result;
    },
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

.vue-grid-layout {
  background: #eee;
}
.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  /* border: 1px solid black; */
}
.vue-grid-item .resizing {
  opacity: 0.9;
}
.vue-grid-item .static {
  background: #ccc;
}
.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}
.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}
.vue-grid-item .minMax {
  font-size: 12px;
}
.vue-grid-item .add {
  cursor: pointer;
}
.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>")
    no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
