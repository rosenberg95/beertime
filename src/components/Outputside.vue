<template>
    <v-container>

        <div v-if="input.submitStatus">    
            {{ input.containerType }} containing {{ input.startTemp }} °C beer in a {{ input.surrTemp }} °C environment has a desired temperature of {{input.targetTemp}} °C.
            ok: {{ simmulation(input.startTemp,input.surrTemp, input.targetTemp) }}
        </div>

    </v-container>
</template>

<script>
// import RandomChart from './RandomChart.vue';
  export default {
//   components: { RandomChart },
    name: 'Outputside',
    props: ['input'],

    data: () => ({

    }),
    methods: {
        diffTemperature (t, T){ // assuming cooling
            const W = 0.0663        // TODO type dependant
            const H = 0.1152        // TODO type dependant

            const r = W/2
            const SA = 2*Math.PI*r*H + 2*Math.PI*r*r
            const k = 0.5
            return k*SA*(T-t)/H
        },
        simmulation ( startTemp, surroundTemp, targetTemp) {
            var currentTemp = startTemp
            var time = 0
            const delta = 0.01
            const m = 0.33          // TODO type dependant
            const C = 4200
            const vecTime = [ 0 ]
            const vecTemp = [ startTemp ]
            
            while (currentTemp - targetTemp > delta) {
                time += 1
                var dT = this.diffTemperature(currentTemp, surroundTemp)
                var difference = dT/(m*C)
                currentTemp = currentTemp + difference 
                vecTime.push(time/60)
                vecTemp.push(currentTemp)

                if (time >= 100000) {
                    break
                }
            }
            return time/60
        }
    }
  };
</script>