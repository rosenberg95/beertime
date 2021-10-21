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
          legend: {display: true},
          label: {display: true},
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