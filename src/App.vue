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
        href="https://github.com/rosenberg95/beertime/wiki"
        target="_blank"
        text
      >
        <span class="mr-2">Documentation</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Main/>
    </v-main>

        <v-footer
      dark
      padless
    >
      <v-card
        class="flex"
        flat
        tile
      >
        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong><a href="https://poulrosenberg.dk/">Poul Rosenberg</a></strong>
        </v-card-text>
      </v-card>
    </v-footer>

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
