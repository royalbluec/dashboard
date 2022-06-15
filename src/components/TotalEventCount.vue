<template>
  <div>TotalEventCount</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TotalEventCount',
  data() {
    return {};
  },
  mounted() {
    axios
      .get('https://static.adbrix.io/front/coding-test/event_1.json')
      .then((res) => {
        const { rows: eventData } = res.data.data;
        const sortedData = eventData.sort(
          (a, b) => new Date(a[0]) - new Date(b[0])
        );

        let sumOfTotal = 0;
        let sumOfUnique = 0;
        sortedData.forEach((el) => {
          console.log(Number(el[1]), Number(el[2]));
          sumOfUnique += Number(el[1]);
          sumOfTotal += Number(el[2]);
          console.log(el);
        });
        console.log(sumOfUnique, sumOfTotal);

        const uniqueEvent = {};
        const totalEvent = {};
        uniqueEvent.sum = sumOfUnique;
        totalEvent.sum = sumOfTotal;
        const changeOfUnique = compare(
          Number(sortedData[sortedData.length - 1][1]),
          Number(sortedData[sortedData.length - 2][1])
        );
        const changeOfTotal = compare(
          Number(sortedData[sortedData.length - 1][2]),
          Number(sortedData[sortedData.length - 2][2])
        );
        console.log(changeOfUnique, changeOfTotal);

        function compare(a, b) {
          if (a > b) return ['rise', a - b];
          else if (a < b) return ['fall', b - a];
          else return ['even', 0];
        }
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style></style>
