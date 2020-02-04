<template>
  <v-fab-transition>
    <v-btn
      v-show="isShow"
      v-scroll="onScroll"
      @click="$vuetify.goTo(0, options)"
      fixed
      bottom
      fab
      right
      color="indigo lighten-1"
      title="トップにスクロールします"
    >
      <v-icon color="white">mdi-chevron-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  data: () => ({
    options: {
      duration: 600
    },
    isShow: false
  }),
  // data() {
  //   return {
  //     options: {
  //       duration: 600
  //     },
  //     isShow: false
  //   };
  // },
  methods: {
    onScroll() {
      if (window.pageYOffset > 100) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  }
};
</script>
