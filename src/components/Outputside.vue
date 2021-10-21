<template>
    <v-container>
        <div v-if="!input.submitStatus" class="noinput">No input values has been recieved.</div>
        <div v-if="simulationStatus" class="spinner">
            <v-progress-circular
                :size="150"
                :width="10"
                color="primary"
                indeterminate
            >Simulating</v-progress-circular>
        </div>
        <div v-if="input.submitStatus && !simulationStatus">
            {{ input.containerType }} containing {{ input.startTemp }} °C beer in a {{ input.surrTemp }} °C environment has a desired temperature of {{input.targetTemp}} °C.
        </div>
        <div v-if="input.submitStatus && !simulationStatus">
            <br>This takes <b>{{ textTime }}</b> ({{(finalTime/60).toFixed(0)}} minutes).
        </div>
        <div v-if="input.submitStatus && !simulationStatus">
            <div><line-chart :chartData="datacollection" :height="300"></line-chart></div>
        </div>



    </v-container>
</template>

<script>
  import LineChart from './LineChart.js'
    export default {
    components: {
      LineChart,
    },
    name: 'Outputside',
    props: ['input','submittedProp'],

    data: () => ({
        simulationStatus: false,
        txt: '',
        datacollection: null,
        vecTime: [0],
        vecTemp: [0],
        finalTime: 0,
        textTime: '',
        width: 0,
        height: 0,
        mass: 0,
        gradient: null,
    }),
    watch: {
        deep: true,
        immediate: true,
        simulationStatus(newSimStat, oldSimStat){
            this.txt = `sim stat changed from ${oldSimStat} to ${newSimStat}`
            console.log(this.txt)
        },
        finalTime(newTime, oldTime){
            console.log(`Final time changed from ${oldTime} to ${newTime}`)
            var d, h, min, s

            if (newTime < 30) {                 // Seconds
                this.textTime = newTime + " s"
            } else if (newTime < 3600) {        // Minutes
                min = Math.floor(newTime/60)
                if (min*60 < newTime){
                    s = newTime - min*60
                    this.textTime = min + " min and " + s + " s"
                } else {
                    this.textTime = min + " min"
                }
            } else if (newTime < 86400 ) {      // Hours
                h = Math.floor(newTime/3600)
                if (h*60 < newTime/60) {
                    min = newTime/60 - h*60
                    h == 1 ? this.textTime = h + " hour and " + min.toFixed(0) + " min" : this.textTime = h + " hours and " + min.toFixed(0) + " min"
                } else {
                    h == 1 ? this.textTime = h + " hour" : this.textTime = h + " hours"
                }
            } else if (newTime < 8640000) {      // Days
                d = Math.floor(newTime/86400)
                if (d*24 < newTime/3600) {
                    h = newTime/3600 - d*24
                    d == 1 ? this.textTime = d + " day and " + h.toFixed(0) + " hours" : this.textTime = d + " days and " + h.toFixed(0) + " hours"
                } else {
                    d == 1 ? this.textTime = d + " day" : this.textTime = d + " days"
                }
            }

        },
        submittedProp(newVal){
            console.log("Number of submits: ", newVal)
            this.simulationStatus = true
            if (this.input.containerType == 'Small can (0.25 L)') {
                this.width = 0.0663
                this.height = 0.092 
                this.mass = 0.25
            }
            if (this.input.containerType == 'Medium can (0.33 L)') {
                this.width = 0.0663
                this.height = 0.1152
                this.mass = 0.33
            }
            if (this.input.containerType == 'Small bottle (0.33 L)') {
                // https://www.univerre.ch/en/product/beer-bottle-crown-33cl-long-neck-black/
                // assuming cylindrical, width adjusted:
                //
                // V = pi*h*r^2 => r = sqrt(V/(pi*h)), w = 2r => w = 2*sqrt(V/(pi*h))
                this.height = 0.2265
                this.width = 2*Math.sqrt(0.00033/(Math.PI*this.height))
                this.mass = 0.33
            }
            if (this.input.containerType == 'Large bottle (0.75 L)') {
                this.height = 0.300
                this.width = 2*Math.sqrt(0.00075/(Math.PI*this.height))
                this.mass = 0.75
            }


            this.run()
            setTimeout(() => {console.log("Timeout for plot"); this.plot()}, 250)
            setTimeout(() => {console.log("Timeout for end"); this.simulationStatus = false}, 500)

        },
    },
    mounted () {      
        
        // this.gradient = this.$refs.canvas
        //     .getContext("2d")
        //     .createLinearGradient(0, 0, 0, 450);
        
        // this.gradient.addColorStop(0, "rgba(0, 231, 255, 0.9)");
        // this.gradient.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
        // this.gradient.addColorStop(1, "rgba(0, 231, 255, 0)");


        this.plot()
    },
    methods: {
        run(){
            this.vecTime = []
            this.vecTemo = []
            this.finalTime = this.simmulation(
                parseFloat(this.input.startTemp),
                parseFloat(this.input.surrTemp),
                parseFloat(this.input.targetTemp)
                )
        },
        diffTemperature (t, T){ // assuming cooling
            const r = this.width/2
            const SA = 2*Math.PI*r*this.height + 2*Math.PI*r*r
            const k = 0.5       // hvor fanden kom det her fra?
            return k*SA*(T-t)/this.height
        },
        simmulation ( startTemp, surroundTemp, targetTemp ) {
            var currentTemp = startTemp
            var time = 0
            const delta = 0.1
            const C = 4200
            this.vecTime = [ 0 ]
            this.vecTemp = [ startTemp ]

            console.log("Simulation initialized")

            while (currentTemp - targetTemp > delta) {
                time += 1
                var dT = this.diffTemperature(currentTemp, surroundTemp)
                var difference = dT/(this.mass*C)
                currentTemp = currentTemp + difference
                this.vecTime.push(time/60)           // For plot
                this.vecTemp.push(currentTemp)       // For plot

                if (time >= 10000000) {
                    break
                }
            }
            return time
        },
        plot(){
            var nticks = 10                 // Number of displayed ticks/increments
            const N = this.vecTemp.length 
            var X = []
            var Y = []
            var Xlabels = []
            const step = Math.floor(N/nticks)

            for (let i = 0; i <= nticks; i++) {
                X.push( this.vecTime[i*step] )
                Y.push( this.vecTemp[i*step] )
                Xlabels.push( X[i].toFixed(0) )
            }   

            this.datacollection = {
                labels: Xlabels ,
                datasets: [{
                    data: Y,
                    backgroundColor: "rgba(1, 116, 188, 0.05)",
                    // backgroundColor: this.gradient,
                    pointBorderColor: "rgba(1, 116, 188, 0.75)",
                    borderColor: "rgba(1, 116, 188, 0.50)",
                    label: "Show line",
                    showLine: true,
                }
                ],
                legendSettings: {visible: false},
                title: "Pissemand",
                xAxisID: "Time"
            }
        }
    }
  };
</script>

<style>
    .spinner {
        display: flex;
        align-items: center;
        justify-content: center;
        position:relative;
        top: 100px;
    }
    .noinput {
        display: flex;
        align-items: center;
        justify-content: center;
        color:gray;
        font-style: italic;
    }
</style>
