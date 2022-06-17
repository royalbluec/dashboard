<template lang="">
  <div class="widget__block">
    <div class="widget__title">Top Referral</div>
    <div class="table-responsive" :style="{ height: chartHeight - 60 + 'px' }">
      <TableChart :eventList="eventList" />
    </div>
  </div>
</template>

<script>
import TableChart from '../chart/TableChart.vue';
import { getEventFourAPI } from '../../api/index';

export default {
  name: 'TopReferralTable',
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

.widget__block {
  padding: 1rem 1.5rem;
}
.widget__title {
  color: #4fa2eb;
  font-size: 1rem;
  font-weight: 600;
}
</style>
