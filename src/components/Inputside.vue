<template>
    <v-container>
    <form @submit.prevent="simuler">
        <v-layout row>
            <v-flex xs8>
                <v-select
                v-model="select"
                :items="items"
                :rules="[v => !!v || 'Item is required']"
                label="Container Type"
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
            select: null,
            items: [
                'Small can (0.25 L)',
                'Medium can (0.33 L)',
                'Small bottle (0.33 L)',
                'Large bottle (dont know u fuck)',
            ],
            numberRule: [v => (!isNaN(parseFloat(v)) && v >= -273.15 && v <= 5500) || 'Number has to be between absolute zero and the surface temperature of the Sun'],
        }
    },
    computed: {
  
    },
    methods: {
        simuler () {
            console.log(this.startTemp)
        }
    }

}
</script>
