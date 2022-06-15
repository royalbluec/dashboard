<template lang="">
  <div>DailyActiveUserChart</div>
  <div>{{ eventList.length }}</div>
  <div>{{ eventList }}</div>
</template>

<script>
import { getEventOneAPI } from '../api/index';

export default {
  name: 'DailyActiveUserChart',
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

<style lang=""></style>
