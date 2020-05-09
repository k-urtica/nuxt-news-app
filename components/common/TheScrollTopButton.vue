<template>
  <v-fab-transition>
    <v-btn
      v-show="isShow"
      v-scroll="onScroll"
      fixed
      bottom
      fab
      right
      color="indigo lighten-1"
      title="トップにスクロールします"
      @click="$vuetify.goTo(0, options)"
    >
      <v-icon color="white">mdi-chevron-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  data: () => ({
    options: {
      duration: 600,
    },
    isShow: false,
  }),
  methods: {
    onScroll() {
      if (window.pageYOffset > 100) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
};
</script>
