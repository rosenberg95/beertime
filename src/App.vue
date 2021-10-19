<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-icon left>mdi-glass-mug</v-icon>
        Beertime
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://poulrosenberg.dk"
        target="_blank"
        text
      >
        <span class="mr-2">My Live Resume</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Main/>
    </v-main>
  </v-app>
</template>

<script>
  import Main from './components/Main';

  export default {
    name: 'App',

    components: {
      Main,
    },

    data: () => ({
      //
    }),
  };
</script>
