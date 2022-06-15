import axios from 'axios';

function getEventOneAPI() {
  return axios
    .get('https://static.adbrix.io/front/coding-test/event_1.json')
    .then((res) => {
      const { rows: eventData = [] } = res.data.data;
      return eventData.sort((a, b) => new Date(a[0]) - new Date(b[0]));
    })
    .catch((err) => console.log(err));
}

function getEventThreeAPI() {
  return axios
    .get('https://static.adbrix.io/front/coding-test/event_3.json')
    .then((res) => {
      const { rows: eventData = [] } = res.data.data;
      const sortedData = eventData.sort((a, b) => b[1] - a[1]);
      const resultData = sortedData.reduce((acc, cur, i) => {
        if (i < 4) {
          acc.push([cur[0], Number(cur[1])]);
        } else {
          if (acc.length === 4) {
            acc.push(['etc', Number(cur[1])]);
          } else {
            acc[acc.length - 1][1] += Number(cur[1]);
          }
        }
        return acc;
      }, []);

      return resultData;
    })
    .catch((err) => console.log(err));
}

function getEventFourAPI() {
  return axios
    .get('https://static.adbrix.io/front/coding-test/event_4.json')
    .then((res) => {
      const { rows: eventData = [] } = res.data.data;
      console.log(eventData);

      return eventData;
    });
}

export { getEventOneAPI, getEventThreeAPI, getEventFourAPI };
