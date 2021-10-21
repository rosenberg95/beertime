import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  date () {
    return {
      options: {
        scales:{
          yAxes: [{
            ticks: { beginAtZero: true },
            gridLines: { display: true }
          }],
          xAxes: [{
            gridLines: {display: true }
          }],
          // zoom: {
          //   enableMouseWheelZooming: true,
          //   enablePinchZooming: true,
          //   enableSelectionZooming: true
          // },
          legend: {display: true},
          label: {display: false},
          responsive: true,
          maintainAspectRatio: false,
        }
      }
    }
  },
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}