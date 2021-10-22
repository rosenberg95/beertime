<template>
    <v-container>
    <form @submit.prevent="simuler"  >
        <v-layout row>
            <v-flex xs8>
                <v-select
                :items="items"
                :rules="[v => !!v || 'Item is required']"
                label="Container Type"
                name="type"
                id="type"
                v-model="containerType"
                required
                ></v-select>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs8>
                <v-text-field
                name="startTemp"
                label="Start Temperature"
                id="startTemp"
                v-model="startTemp"
                type="float"
                required
                suffix="°C"
                :rules="numberRule"
                > </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs8>
                <v-text-field
                name="surrTemp"
                label="Surrounding Temperature"
                id="surrTemp"
                v-model="surrTemp"
                type="float"
                :rules="numberRule"
                suffix="°C"
                required> </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs8>
                <v-text-field
                name="targetTemp"
                label="Target Temperature"
                id="targetTemp"
                v-model="targetTemp"
                type="float"
                :rules="numberRule"
                suffix="°C"
                required> </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs8>
                <v-card-actions>
                <v-btn type="Submit" color="primary">Calculate</v-btn>
                </v-card-actions>
            </v-flex>
        </v-layout>
    </form>
    </v-container>
</template>



<script>

export default {
    name: "Input",
    data() {
        return {
            containerType: '',
            startTemp: '',
            surrTemp: '',
            targetTemp: '',
            select: null,
            items: [
                'Small can (0.25 L)',
                'Medium can (0.33 L)',
                'Small bottle (0.33 L)',
                'Large bottle (0.75 L)',
            ],
            numberRule: [v => (!isNaN(parseFloat(v)) && v >= -273.15 && v <= 5500) || 'Number has to be between absolute zero and the surface temperature of the Sun'],
        }
    },
    computed: {
        // TODO: lav en compareTemperatures() rule: target temp skal være mellem starttemp og surrtemp
        compareTemperatures(){
            if (parseFloat(this.targetTemp) > parseFloat(this.startTemp)) {         // user wants warm beer
                console.log("A: " + this.targetTemp + " > " + this.startTemp)
                alert("The app can only cool beers. Make sure that: \n Start Temperature ≥ Target Temperature ≥ Surrounding Temperature")
                return false
            } else if (parseFloat(this.targetTemp) < parseFloat(this.surrTemp)) {   // user wants unachievable temperature
                console.log("B : " + this.targetTemp  + " < " + this.surrTemp) 
                alert("The app can only cool beers. Make sure that: \n Start Temperature ≥ Target Temperature ≥ Surrounding Temperature")
                return false
            } else {
                return true
            }
        }
    },
    methods: {
        simuler () {
            console.log("compareTemperatures giver: ", this.compareTemperatures)
            console.log("containerType giver: ", this.containerType)
            var pass = this.compareTemperatures && !(this.containerType == '')
            this.$emit('submitted', this.containerType, this.startTemp, this.surrTemp, this.targetTemp, pass)
        }
    }

}
</script>
