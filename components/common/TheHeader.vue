<template>
  <v-app-bar flat dense dark app clipped-left>
    <v-app-bar-nav-icon @click.stop="drawer" aria-label="drawer" />

    <v-col class="py-0" align="center">
      <nuxt-link to="/">
        <h1 class="justify-center">Nuxt × News API</h1>
      </nuxt-link>
    </v-col>

    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-switch v-model="darkMode" v-on="on" hide-details inset />
      </template>
      <span class="caption">ダークモード (実験的機能)</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    darkMode: false
  }),
  watch: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  },
  methods: {
    drawer() {
      this.$store.commit("setDrawer", !this.$store.state.drawer);
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
h1 {
  color: #ff7c00;
  background: -webkit-linear-gradient(
    top,
    #ffb76b 0%,
    #ffa73d 50%,
    #ff7c00 51%,
    #ff7f04 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  @media screen and (max-width: 600px) {
    font-size: 23px;
  }
}
</style>
