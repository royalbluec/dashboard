<template>
  <div>
    <Line
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarController,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarController
);

export default {
  extends: Line,
  name: 'MixedChart',
  components: { Line },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      type: String,
      default: '',
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
    eventList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartData: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: 'Unique Event Count',
            backgroundColor: '#6bb2a8',
            data: [],
            type: 'line',
            yAxisID: 'right-y-axis',
          },
          {
            label: 'Total Event Count',
            backgroundColor: '#22c3aa',
            data: [],
            type: 'bar',
            yAxisID: 'left-y-axis',
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          'left-y-axis': {
            type: 'linear',
            position: 'left',
            ticks: {
              color: '#22c3aa',
              callback: function (value) {
                var ranges = [
                  { divider: 1e6, suffix: 'M' },
                  { divider: 1e3, suffix: 'k' },
                ];
                function formatNumber(n) {
                  for (var i = 0; i < ranges.length; i++) {
                    if (n >= ranges[i].divider) {
                      return (
                        (n / ranges[i].divider).toString() + ranges[i].suffix
                      );
                    }
                  }
                  return n;
                }
                return formatNumber(value);
              },
            },
          },
          'right-y-axis': {
            type: 'linear',
            position: 'right',
            ticks: {
              color: '#6bb2a8',
            },
          },
        },
      },
    };
  },
  beforeUpdate() {
    this.chartData.labels = this.eventList.map((el) => el[0]);
    this.chartData.datasets[0].data = this.eventList.map((el) => el[1]);
    this.chartData.datasets[1].data = this.eventList.map((el) => el[2]);
  },
};
</script>
