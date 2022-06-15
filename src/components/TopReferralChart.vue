<template>
  <div>TopReferralChart</div>
  <div>{{ eventList }}</div>
</template>

<script>
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
};
</script>

<style></style>
