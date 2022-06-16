<template>
  <div class="block">
    <div class="title">Top Referral</div>
    <div><PieChart height="200" :eventList="eventList" /></div>
  </div>
</template>

<script>
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
  components: { PieChart },
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
  color: #4fa2eb;
  font-size: 1rem;
  font-weight: 600;
}
</style>
