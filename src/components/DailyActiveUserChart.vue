<template lang="">
  <div class="block">
    <div class="title">DAU</div>
    <MixedChart :eventList="eventList" :chartHeight="chartHeight" />
  </div>
</template>

<script>
import MixedChart from './MixedChart.vue';
import { getEventOneAPI } from '../api/index';

export default {
  name: 'DailyActiveUserChart',
  components: { MixedChart },
  props: {
    itemHeight: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      eventList: [],
      chartHeight: 0,
    };
  },
  mounted() {
    this.setList();
  },
  beforeUpdate() {
    this.chartHeight = this.itemHeight * 40 - 10;
  },
  methods: {
    async setList() {
      this.eventList = await getEventOneAPI();
    },
  },
};
</script>

<style scoped>
* {
  min-height: 100%;
}
div {
  padding: 4px 0;
}
.block {
  padding: 1rem 1.5rem;
}
.title {
  color: #4fa2eb;
  font-size: 1rem;
  font-weight: 600;
}
</style>
