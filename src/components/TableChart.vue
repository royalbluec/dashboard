<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">GroupBy</th>
        <th scope="col">Metrics</th>
      </tr>
      <tr class="subtitle">
        <th scope="col">Country (IP) > Region (IP) > City (IP)</th>
        <th scope="col">sum(Unique Event Count)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Mark</td>
        <td>Otto</td>
      </tr>
      <tr>
        <td>Jacob</td>
        <td>Thornton</td>
      </tr>
      <tr>
        <td>Larry</td>
        <td>Larry</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
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
    };
  },
  mounted() {
    // console.log(this.eventList);
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
              child: [],
            });
          }
        } else {
          // depth: 2
          // temp[index].child
          temp[index].child.push({ id: el[1], cnt: Number(el[3]), child: [] });

          let len = temp[index].child.length - 1;
          // depth: 3
          temp[index].child[len].child.push({
            id: el[2],
            cnt: Number(el[3]),
            child: [],
          });
        }
      } else {
        // depth: 1
        // temp
        temp.push({ id: el[0], cnt: Number(el[3]), child: [] });

        let len = temp.length - 1;
        // depth: 2
        temp[len].child.push({
          id: el[1],
          cnt: Number(el[3]),
          child: [],
        });

        // depth: 3
        temp[len].child[temp[len].child.length - 1].child.push({
          id: el[2],
          cnt: Number(el[3]),
          child: [],
        });
      }
    });

    // depth: 1
    temp.sort((a, b) => {
      return b.cnt - a.cnt;
    });

    // depth: 2
    for (let i = 0; i < temp.length; i++) {
      temp[i].child.sort((a, b) => {
        return b.cnt - a.cnt;
      });
    }

    // depth: 3
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp[i].child.length; j++) {
        temp[i].child[j].child.sort((a, b) => {
          return b.cnt - a.cnt;
        });
      }
    }

    this.tableChartList = temp;
  },
};
</script>

<style scoped>
.subtitle {
  font-size: 0.7rem;
}
</style>
