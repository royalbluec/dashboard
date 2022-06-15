<template>
  <div>TotalEventCount</div>
  <div>{{ totalEvent }}</div>
  <div>{{ totalEvent.sum.toLocaleString('ko-KR') }}</div>
  <div>{{ totalEvent.change[0] }}</div>
  <div>{{ totalEvent.change[1].toLocaleString('ko-KR') }}</div>
</template>

<script>
import { getEventOneAPI } from '../api/index';

export default {
  name: 'TotalEventCount',
  data() {
    return {
      idx: 2,
      totalEvent: {
        sum: 0,
        change: ['even', 0],
      },
    };
  },
  mounted() {
    this.setTotalEvent();
  },
  methods: {
    async setTotalEvent() {
      const result = await getEventOneAPI();
      result.forEach((el) => {
        this.totalEvent.sum += Number(el[this.idx]);
      });
      this.totalEvent.change = this.compare(
        Number(result[result.length - 1][this.idx]),
        Number(result[result.length - 2][this.idx])
      );
    },
    compare(a, b) {
      if (a > b) return ['rise', a - b];
      else if (a < b) return ['fall', b - a];
      else return ['even', 0];
    },
  },
};
</script>

<style></style>
