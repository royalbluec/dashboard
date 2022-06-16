<template>
  <div class="block">
    <div class="title">Top Referral</div>
    <div><MixedChart /></div>
    <div><PieChart /></div>
  </div>
  <!-- <div>TopReferralChart</div>
  <div>{{ eventList }}</div> -->
</template>

<script>
import MixedChart from './MixedChart.vue';
import PieChart from './PieChart.vue';
import { getEventThreeAPI } from '../api/index';

export default {
  name: 'TopReferralChart',
  data() {
    return {
      eventList: [],
    };
  },
  mounted() {
    this.setEventList();
  },
  methods: {
    async setEventList() {
      this.eventList = await getEventThreeAPI();
    },
  },
  components: { MixedChart, PieChart },
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
