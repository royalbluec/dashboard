<template lang="">
  <div>TopReferralTable</div>
  <!-- <div>{{ eventList }}</div> -->
</template>

<script>
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
  methods: {
    async setEventList() {
      this.eventList = await getEventFourAPI();
    },
  },
};
</script>

<style lang=""></style>
