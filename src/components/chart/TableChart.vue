<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">GroupBy</th>
        <th scope="col">Metrics</th>
      </tr>
      <tr class="table__subtitle">
        <th scope="col">
          <span>Country (IP) > Region (IP) > City (IP)</span>
          <font-awesome-icon
            class="table__icon"
            v-if="isSortDownIP === 'down'"
            icon="fa-solid fa-arrow-down"
            @click="setIsSortUpIP"
          />
          <font-awesome-icon
            class="table__icon"
            v-else-if="isSortDownIP === 'up'"
            icon="fa-solid fa-arrow-up"
            @click="setIsSortDownIP"
          />
          <font-awesome-icon
            class="table__icon"
            v-else
            icon="fa-solid fa-arrow-down-short-wide"
            @click="setIsSortUpIP"
          />
        </th>
        <th scope="col">
          <span>sum(Unique Event Count)</span>
          <font-awesome-icon
            class="table__icon"
            v-if="isSortDownCount === 'down'"
            icon="fa-solid fa-arrow-down"
            @click="setIsSortUpCount"
          />
          <font-awesome-icon
            class="table__icon"
            v-else-if="isSortDownCount === 'up'"
            icon="fa-solid fa-arrow-up"
            @click="setIsSortDownCount"
          />
          <font-awesome-icon
            class="table__icon"
            v-else
            icon="fa-solid fa-arrow-down-short-wide"
            @click="setIsSortUpCount"
          />
        </th>
      </tr>
    </thead>
    <tbody>
      <TableChartRow :tableChartList="tableChartList" />
    </tbody>
  </table>
</template>

<script>
import TableChartRow from './TableChartRow';
import {
  compareIP,
  compareReverseIP,
  compareCount,
  compareReverseCount,
} from '../../utils/index';

export default {
  name: 'TableChart',
  props: {
    eventList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableChartList: [],
      isSortDownCount: 'down',
      isSortDownIP: '',
    };
  },
  beforeUpdate() {
    let temp = [];

    this.eventList.forEach((el) => {
      let index = temp.findIndex((x) => x.id === el[0]);

      if (index !== -1) {
        // depth: 1
        // temp
        temp[index].cnt += Number(el[3]);

        let regionIndex = temp[index].child.findIndex((x) => x.id === el[1]);

        if (regionIndex !== -1) {
          // depth: 2
          // temp[index].child
          temp[index].child[regionIndex].cnt += Number(el[3]);

          let cityIndex = temp[index].child[regionIndex].child.findIndex(
            (x) => x.id === el[2]
          );

          if (cityIndex != -1) {
            // depth: 3
            // temp[index].child[regionIndex].child
            temp[index].child[regionIndex].child[cityIndex].cnt += Number(
              el[3]
            );
          } else {
            // depth: 3
            // temp[index].child[regionIndex].child
            temp[index].child[regionIndex].child.push({
              id: el[2],
              cnt: Number(el[3]),
              depth: 3,
              isOpened: false,
              child: [],
            });
          }
        } else {
          // depth: 2
          // temp[index].child
          temp[index].child.push({
            id: el[1],
            cnt: Number(el[3]),
            depth: 2,
            isOpened: false,
            child: [],
          });

          let len = temp[index].child.length - 1;
          // depth: 3
          temp[index].child[len].child.push({
            id: el[2],
            cnt: Number(el[3]),
            depth: 3,
            isOpened: false,
            child: [],
          });
        }
      } else {
        // depth: 1
        // temp
        temp.push({
          id: el[0],
          cnt: Number(el[3]),
          depth: 1,
          isOpened: false,
          child: [],
        });

        let len = temp.length - 1;
        // depth: 2
        temp[len].child.push({
          id: el[1],
          cnt: Number(el[3]),
          depth: 2,
          isOpened: false,
          child: [],
        });

        // depth: 3
        temp[len].child[temp[len].child.length - 1].child.push({
          id: el[2],
          cnt: Number(el[3]),
          depth: 3,
          isOpened: false,
          child: [],
        });
      }
    });

    if (this.isSortDownCount === 'down') {
      this.sortDownCount(temp);
    } else if (this.isSortDownCount === 'up') {
      this.sortUpCount(temp);
    }

    if (this.isSortDownIP === 'down') {
      this.sortDownIP(temp);
    } else if (this.isSortDownIP === 'up') {
      this.sortUpIP(temp);
    }
  },
  methods: {
    sortDownCount(list) {
      const temp = list;
      // depth: 1
      temp.sort(compareReverseCount);

      // depth: 2
      for (let i = 0; i < temp.length; i++) {
        temp[i].child.sort(compareReverseCount);
      }

      // depth: 3
      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp[i].child.length; j++) {
          temp[i].child[j].child.sort(compareReverseCount);
        }
      }

      this.tableChartList = temp;
    },
    sortUpCount(list) {
      const temp = list;
      // depth: 1
      temp.sort(compareCount);

      // depth: 2
      for (let i = 0; i < temp.length; i++) {
        temp[i].child.sort(compareCount);
      }

      // depth: 3
      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp[i].child.length; j++) {
          temp[i].child[j].child.sort(compareCount);
        }
      }

      this.tableChartList = temp;
    },
    sortDownIP(list) {
      const temp = list;
      // depth: 1
      temp.sort(compareReverseIP);

      // depth: 2
      for (let i = 0; i < temp.length; i++) {
        temp[i].child.sort(compareReverseIP);
      }

      // depth: 3
      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp[i].child.length; j++) {
          temp[i].child[j].child.sort(compareReverseIP);
        }
      }

      this.tableChartList = temp;
    },
    sortUpIP(list) {
      const temp = list;
      // depth: 1
      temp.sort(compareIP);

      // depth: 2
      for (let i = 0; i < temp.length; i++) {
        temp[i].child.sort(compareIP);
      }

      // depth: 3
      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp[i].child.length; j++) {
          temp[i].child[j].child.sort(compareIP);
        }
      }

      this.tableChartList = temp;
    },
    setIsSortDownCount() {
      this.isSortDownCount = 'down';
      this.isSortDownIP = '';
    },
    setIsSortUpCount() {
      this.isSortDownCount = 'up';
      this.isSortDownIP = '';
    },
    setIsSortDownIP() {
      this.isSortDownCount = '';
      this.isSortDownIP = 'down';
    },
    setIsSortUpIP() {
      this.isSortDownCount = '';
      this.isSortDownIP = 'up';
    },
  },
  components: { TableChartRow },
};
</script>

<style scoped>
.table__subtitle {
  font-size: 0.7rem;
}
.table__icon {
  float: right;
}
</style>
