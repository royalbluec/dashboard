<template>
  <div class="btn__block" v-if="draggable === false && resizable === false">
    <button type="button" class="btn btn-primary" @click="startEdit">
      편집
    </button>
  </div>
  <div class="btn__block" v-else>
    <button type="button" class="btn btn-outline-primary" @click="cancelEdit">
      편집 취소
    </button>
    <button type="button" class="btn btn-primary" @click="completeEdit">
      편집 완료
    </button>
  </div>
  <grid-layout
    v-model:layout="layout"
    :col-num="12"
    :row-height="30"
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
      :min-w="item.minW"
      :min-h="item.minH"
      :i="item.i"
      :key="item.i"
    >
      <component :is="item.c" :itemHeight="item.h"></component>
    </grid-item>
  </grid-layout>
</template>

<script>
import { shallowRef } from 'vue';

import UniqueEventCount from './components/widget/UniqueEventCount.vue';
import TotalEventCount from './components/widget/TotalEventCount.vue';
import DailyActiveUserChart from './components/widget/DailyActiveUserChart.vue';
import TotalReferralChart from './components/widget/TopReferralChart.vue';
import TopReferralTable from './components/widget/TopReferralTable.vue';

const uniqueEventCount = shallowRef(UniqueEventCount);
const totalEventCount = shallowRef(TotalEventCount);
const dailyActiveUserChart = shallowRef(DailyActiveUserChart);
const totalReferralChart = shallowRef(TotalReferralChart);
const topReferralTable = shallowRef(TopReferralTable);

export default {
  name: 'App',
  data() {
    return {
      layout: [
        {
          x: 0,
          y: 0,
          w: 6,
          h: 5,
          minW: 3,
          minH: 5,
          i: '0',
          c: uniqueEventCount,
        },
        {
          x: 6,
          y: 0,
          w: 6,
          h: 5,
          minW: 3,
          minH: 5,
          i: '1',
          c: totalEventCount,
        },
        {
          x: 0,
          y: 5,
          w: 12,
          h: 9,
          minW: 5,
          minH: 7,
          i: '2',
          c: dailyActiveUserChart,
        },
        {
          x: 0,
          y: 14,
          w: 6,
          h: 7,
          minW: 5,
          minH: 7,
          i: '3',
          c: totalReferralChart,
        },
        {
          x: 6,
          y: 14,
          w: 6,
          h: 7,
          minW: 5,
          minH: 7,
          i: '4',
          c: topReferralTable,
        },
      ],
      itemHeight: [0, 0, 0, 0, 0],
      draggable: false,
      resizable: false,
    };
  },
  components: {},
  methods: {
    startEdit() {
      this.draggable = true;
      this.resizable = true;
    },
    cancelEdit() {
      this.draggable = false;
      this.resizable = false;
      const layoutData = this.getStorage();
      for (let i = 0; i < layoutData.length; i++) {
        this.layout[i].x = layoutData[i].x;
        this.layout[i].y = layoutData[i].y;
        this.layout[i].w = layoutData[i].w;
        this.layout[i].h = layoutData[i].h;
      }
    },
    completeEdit() {
      this.draggable = false;
      this.resizable = false;
      this.setStorage();
    },
    setStorage() {
      localStorage.setItem('layout', JSON.stringify(this.layout));
    },
    getStorage() {
      return JSON.parse(localStorage.getItem('layout'));
    },
  },
  mounted() {
    const layoutData = this.getStorage();
    if (!layoutData) {
      this.setStorage();
    } else {
      for (let i = 0; i < layoutData.length; i++) {
        this.layout[i].x = layoutData[i].x;
        this.layout[i].y = layoutData[i].y;
        this.layout[i].w = layoutData[i].w;
        this.layout[i].h = layoutData[i].h;
      }
    }
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #f1f3f4;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
.vue-grid-layout {
  max-width: 1200px;
  background: #f1f3f4;
  margin: 0 auto;
}
.vue-grid-item:not(.vue-grid-placeholder) {
  background: #fff;
  box-shadow: 0 0 0.5rem #c0c0c0;
}
.vue-grid-item .resizing {
  opacity: 0.9;
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

.btn__block {
  display: flex;
  justify-content: flex-end;
  max-width: 1200px;
  padding: 1rem 0;
  margin: 0 auto;
}
.btn {
  width: 8rem;
  margin: 0 0.5rem;
}
.btn:focus,
.btn:active,
.btn:hover {
  box-shadow: none !important;
  outline: 0;
}
</style>
