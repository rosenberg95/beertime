<template>
  <v-container>
      <v-container>
        <h3>How long does it take a beer to cool down to a desired temperature given a surrounding temperature?</h3>
        <p></p>
      <v-layout row wrap justify-center align-center > 
        <v-flex  xs20 sm8 md8 lg4 >
            <v-card class="ma-2" max-width="1000px" height=600px>
                <div>
                    <v-card-title><v-icon left>mdi-folder-text</v-icon>Input </v-card-title>
                    <v-card-subtitle><em>To calculate the time it takes for your beer to cool down from a start temperature to the desired target temperature, please fill out all the fields below in degrees Celcius.</em></v-card-subtitle>
                    <v-card-text v class="tis">
                        <Inputside @submitted="onSubmit"></Inputside>
                    </v-card-text>
                    
                </div>
            </v-card> 
        </v-flex>
        <v-flex xs20 sm8 md8 lg4>
            <v-card class="ma-2" max-width="1000px" height=600px>
                <div>
                    <v-card-title><v-icon left>mdi-chart-box</v-icon>Output</v-card-title>
                    <v-card-text>
                        <Outputside :input="input" :submittedProp="submitted"></Outputside>
                    </v-card-text>
                </div>
            </v-card> 
        </v-flex>
      </v-layout>
  </v-container>
  </v-container>
</template>



<script>

  import Inputside from './Inputside.vue'
  import Outputside from './Outputside.vue'

  export default {
    name: 'Main',
    
    components: {
      Inputside,
      Outputside
    },


    data() {
      return {
        input: {
          submitStatus: false,
          simulationSatus: false, 
          containerType: '',
          startTemp: '',
          surrTemp: '',
          targetTemp: ''
        },
        submitted: 0
      }
    },
      methods: {
        onSubmit (containerType, startTemp, surrTemp, targetTemp, pass){
          if (pass) {
            this.input.submitStatus = true
            this.input.containerType = containerType
            this.input.startTemp = startTemp
            this.input.surrTemp = surrTemp
            this.input.targetTemp = targetTemp
            this.submitted += 1
          }
        },

    }
  }
</script>

<style>
  h3 {text-align: center;}
  .tis {
    align-items: center;
    align-self: center;
    justify-content: center;
  }
</style>