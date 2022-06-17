<template lang="">
  <div class="widget__block">
    <div class="widget__title">접속유저</div>
    <div class="widget__subtitle">
      <span class="widget__summary">SUM</span>
      <span>Unique Event Count</span>
    </div>
    <div class="widget__result">
      {{ uniqueEvent.sum.toLocaleString('ko-KR') }}
    </div>
    <div>
      <span v-if="uniqueEvent.change[0] === 'rise'" class="rise">
        <font-awesome-icon icon="fa-solid fa-caret-up" />
        <span class="widget__change">{{
          uniqueEvent.change[1].toLocaleString('ko-KR')
        }}</span>
      </span>
      <span v-if="uniqueEvent.change[0] === 'fall'" class="fall">
        <font-awesome-icon icon="fa-solid fa-caret-down" />
        <span class="widget__change">{{
          uniqueEvent.change[1].toLocaleString('ko-KR')
        }}</span>
      </span>
      <span v-if="uniqueEvent.change[0] === 'even'" class="even">
        <span>{{ uniqueEvent.change[1].toLocaleString('ko-KR') }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { getEventOneAPI } from '../../api/index';
import { compareWidgetChange } from '../../utils/index';

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
      this.uniqueEvent.change = compareWidgetChange(
        Number(result[result.length - 1][this.idx]),
        Number(result[result.length - 2][this.idx])
      );
    },
  },
};
</script>

<style scoped>
* {
  white-space: nowrap;
}
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
.widget__subtitle {
  color: #a9a9a9;
  font-size: 0.8rem;
  font-weight: 400;
}
.widget__result {
  font-size: 2rem;
  font-weight: 600;
}
.widget__summary {
  background: #f5f5f5;
  padding: 2px 4px;
  border-radius: 4px;
  margin-right: 4px;
}
.widget__change {
  padding-left: 4px;
}

.rise {
  color: #c84a31;
}
.fall {
  color: #278de6;
}
.even {
  color: #333;
}
</style>
