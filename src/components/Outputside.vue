<template>
    <v-container>

        <div v-if="input.submitStatus">    
            {{ input.containerType }} containing {{ input.startTemp }} °C beer in a {{ input.surrTemp }} °C environment has a desired temperature of {{input.targetTemp}} °C.
        </div>




    </v-container>
</template>

<script>
  export default {
    name: 'Outputside',
    props: ['input'],

    data: () => ({

    }),
  };
</script>