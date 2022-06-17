<template>
  <div class="block">
    <div class="title">Top Referral</div>
    <PieChart :eventList="eventList" :chartHeight="chartHeight" />
  </div>
</template>

<script>
import PieChart from './PieChart.vue';
import { getEventThreeAPI } from '../api/index';

export default {
  name: 'TopReferralChart',
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
    this.setEventList();
  },
  beforeUpdate() {
    this.chartHeight = this.itemHeight * 40 - 10;
  },
  methods: {
    async setEventList() {
      this.eventList = await getEventThreeAPI();
    },
  },
  components: { PieChart },
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
