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

export { getEventOneAPI };
