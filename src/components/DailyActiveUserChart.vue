<template lang="">
  <div class="block">
    <div class="title">DAU</div>
    <MixedChart :eventList="eventList" height="200" />
  </div>
</template>

<script>
import MixedChart from './MixedChart.vue';
import { getEventOneAPI } from '../api/index';

export default {
  name: 'DailyActiveUserChart',
  components: { MixedChart },
  data() {
    return {
      eventList: [],
    };
  },
  mounted() {
    this.setList();
  },
  methods: {
    async setList() {
      this.eventList = await getEventOneAPI();
    },
  },
};
</script>

<style scoped>
div {
  padding: 4px 0;
}
.block {
  padding: 1rem 1.5rem;
}
.title {
  color: #1261c4;
  font-size: 1rem;
  font-weight: 600;
}
</style>
