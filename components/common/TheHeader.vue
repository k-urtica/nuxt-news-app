<template>
  <v-app-bar class="header-bar" flat dense app clipped-left>
    <v-app-bar-nav-icon @click.stop="drawer" dark aria-label="drawer" />
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
    }
  }
};
</script>

<style lang="scss" scoped>
.header-bar {
  background: linear-gradient(to bottom, #323232 0%, #3f3f3f 40%, #1c1c1c 150%),
    linear-gradient(
      to top,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(0, 0, 0, 0.25) 200%
    );
  background-blend-mode: multiply;
  opacity: 0.87;
}
a {
  text-decoration: none;
}
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
