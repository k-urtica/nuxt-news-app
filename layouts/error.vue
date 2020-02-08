<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 v-if="error.statusCode === 404" class="mb-5">
          ページが見つかりませんでした &#x1f628;
        </h2>
        <h2 v-else>
          何らかのエラーが発生しました... &#x1f631;
        </h2>
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
