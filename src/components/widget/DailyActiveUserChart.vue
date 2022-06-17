<template lang="">
  <div class="block">
    <div class="block__header">
      <span class="title">DAU</span>
      <div class="btn-group">
        <button
          type="button"
          class="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ menuID }}
        </button>
        <ul class="dropdown-menu">
          <li v-for="item in menuList" :key="item">
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="clickMenu(item)"
              >{{ item }}</a
            >
          </li>
        </ul>
      </div>
    </div>
    <MixedChart :eventList="eventList" :chartHeight="chartHeight" />
  </div>
</template>

<script>
import MixedChart from '../chart/MixedChart.vue';
import { getEventOneAPI } from '../../api/index';

export default {
  name: 'DailyActiveUserChart',
  components: { MixedChart },
  props: {
    itemHeight: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      eventObject: {},
      eventList: [],
      chartHeight: 0,
      menuID: '5',
      menuList: [],
    };
  },
  mounted() {
    this.setList();
  },
  beforeUpdate() {
    this.chartHeight = this.itemHeight * 40 - 10;
  },
  methods: {
    async setList() {
      const tempList = await getEventOneAPI();
      const tempObject = {};
      for (let i = 0; i < tempList.length; i++) {
        let month = (new Date(tempList[i][0]).getMonth() + 1).toString();
        if (Object.keys(tempObject).includes(month)) {
          tempObject[month].push(tempList[i]);
        } else {
          tempObject[month] = [];
          tempObject[month].push(tempList[i]);
        }
      }
      let tmpeID = Object.keys(tempObject)[Object.keys(tempObject).length - 1];
      this.menuID = tmpeID;
      this.menuList = Object.keys(tempObject);
      this.eventObject = tempObject;
      this.eventList = tempObject[tmpeID];
    },
    clickMenu(id) {
      this.menuID = id;
      this.eventList = this.eventObject[id];
    },
  },
};
</script>

<style scoped>
* {
  min-height: 100%;
}
div {
  padding: 4px 0;
}
button {
  margin: 0;
}

.block {
  padding: 1rem 1.5rem;
}
.block__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  color: #4fa2eb;
  font-size: 1rem;
  font-weight: 600;
}

.btn-group {
  width: 50px;
}
</style>
