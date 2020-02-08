<template>
  <v-app-bar flat dense dark app clipped-left hide-on-scroll>
    <v-app-bar-nav-icon @click.stop="drawer" aria-label="drawer" />

    <v-col class="py-0" align="center">
      <nuxt-link :to="{ name: 'index' }">
        <h1 class="justify-center">NUXT×NEWS APP</h1>
      </nuxt-link>
    </v-col>
  </v-app-bar>
</template>

<script>
export default {
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
