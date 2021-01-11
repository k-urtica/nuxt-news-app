<template>
  <v-app-bar color="grey darken-4" app clipped-left hide-on-scroll>
    <v-app-bar-nav-icon dark aria-label="drawer" @click.stop="drawer" />
    <v-toolbar-title>
      <nuxt-link :to="{ name: 'index' }">
        <h1>NUXT×NEWS APP</h1>
      </nuxt-link>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    drawer() {
      this.$store.commit("setDrawer", !this.$store.state.drawer);
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 28px;
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
