<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <template v-if="error.statusCode === 404">
          <h2 class="mb-5">
            ページが見つかりませんでした &#x1f628;
          </h2>
        </template>
        <template v-else>
          <h2 class="mb-5">
            何らかのエラーが発生しました... &#x1f631;
          </h2>
          <p class="mb-5">{{ error.message }}</p>
        </template>
        <v-btn
          :to="{ name: 'index' }"
          nuxt
          text
          rounded
          color="light-blue darken-3"
        >
          トップへ戻る
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  }
};
</script>
