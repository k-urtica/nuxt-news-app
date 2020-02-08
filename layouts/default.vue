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
  </v-app>
</template>

<script>
import TheScrollTopButton from "@/components/common/TheScrollTopButton.vue";
import TheHeader from "~/components/common/TheHeader.vue";
import TheDrawer from "~/components/common/TheDrawer.vue";

export default {
  components: {
    TheHeader,
    TheDrawer,
    TheScrollTopButton
  }
};
</script>

<style lang="scss" scoped>
#main {
  max-width: 1380px;
  margin: auto;
}
</style>
