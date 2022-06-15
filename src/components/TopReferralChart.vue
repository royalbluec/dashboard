<template>
  <div>TopReferralChart</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TopReferralChart',
  data() {
    return {};
  },
  mounted() {
    axios
      .get('https://static.adbrix.io/front/coding-test/event_3.json')
      .then((res) => {
        const { rows: apiData } = res.data.data;
        const sortedData = apiData.sort((a, b) => b[1] - a[1]);
        const resultData = sortedData.reduce((acc, cur, i) => {
          if (i < 4) {
            console.log(acc, cur);
            acc.push([cur[0], Number(cur[1])]);
          } else {
            if (acc.length !== 5) {
              acc.push(['etc', Number(cur[1])]);
            } else {
              acc[acc.length - 1][1] += Number(cur[1]);
            }
          }
          return acc;
        }, []);

        console.log(resultData);
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style></style>
