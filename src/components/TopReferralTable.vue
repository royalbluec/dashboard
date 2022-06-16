<template lang="">
  <div class="block">
    <div class="title">Top Referral</div>
    <TableChart :eventList="eventList" />
  </div>
</template>

<script>
import TableChart from './TableChart.vue';
import { getEventFourAPI } from '../api/index';

export default {
  name: 'TopReferralTable',
  data() {
    return {
      eventList: [],
    };
  },
  mounted() {
    this.setEventList();
  },
  components: { TableChart },
  methods: {
    async setEventList() {
      this.eventList = await getEventFourAPI();
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
  color: #4fa2eb;
  font-size: 1rem;
  font-weight: 600;
}
</style>
