<template lang="">
  <div>UniqueEventCount</div>
  <div>{{ uniqueEvent }}</div>
  <div>{{ uniqueEvent.sum.toLocaleString('ko-KR') }}</div>
  <div>{{ uniqueEvent.change[0] }}</div>
  <div>{{ uniqueEvent.change[1].toLocaleString('ko-KR') }}</div>
</template>

<script>
import { getEventOneAPI } from '../api/index';

export default {
  name: 'UniqueEventCount',
  data() {
    return {
      idx: 1,
      uniqueEvent: {
        sum: 0,
        change: ['even', 0],
      },
    };
  },
  mounted() {
    this.setUniqueEvent();
  },
  methods: {
    async setUniqueEvent() {
      const result = await getEventOneAPI();
      result.forEach((el) => {
        this.uniqueEvent.sum += Number(el[this.idx]);
      });
      this.uniqueEvent.change = this.compare(
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

<style lang=""></style>
