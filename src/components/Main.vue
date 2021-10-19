<template>
  <v-container>
      <v-container>
      <v-layout row wrap justify-center align-center > 
        <v-flex xs16 sm8 md6 lg4>
            <v-card class="ma-3" max-width="800px" height=600px>
                <div>
                    <v-card-title><v-icon left>mdi-folder-text</v-icon>Input </v-card-title>
                    <v-card-subtitle><em>To calculate the time it takes for your beer to cool down from a start temperature to the desired target temperature, please fill out all the fields below. The temperature has to be in degrees Celcius, because fuck Fahrenheit you dumb freedomunit-using noob. We btw assume atmospherical pressure.</em></v-card-subtitle>
                    <v-card-text center>
                        <Inputside/>
                    </v-card-text>
                    
                </div>
            </v-card> 
        </v-flex>
        <v-flex xs16 sm8 md6 lg4>
            <v-card class="ma-3" max-width="800px" height=600px>
                <div>
                    <v-card-title><v-icon left>mdi-chart-box</v-icon>Output</v-card-title>
                    <v-card-text>
                        <div class="my-4 text-subtitle-1" height="200px">
                        her står lidt text
                        </div>
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

  export default {
    name: 'Main',
    
    components: {
      Inputside,
    },


    data: () => ({
      
    })

  }
</script>
