<template>
  <v-app>
    <the-header />

    <the-drawer />

    <v-content>
      <v-container id="main" class="mt-4 mb-10">
        <nuxt />
      </v-container>
    </v-content>

    <the-scroll-top-button />
    <the-footer />
  </v-app>
</template>

<script>
import TheScrollTopButton from "@/components/common/TheScrollTopButton.vue";
import TheHeader from "~/components/common/TheHeader.vue";
import TheDrawer from "~/components/common/TheDrawer.vue";
import TheFooter from "~/components/common/TheFooter.vue";

export default {
  components: {
    TheHeader,
    TheDrawer,
    TheScrollTopButton,
    TheFooter,
  },
};
</script>

<style lang="scss" scoped>
#main {
  max-width: 1380px;
  margin: auto;
}
</style>
