<template>
  <v-row justify="center">
    <v-col cols="12" align="center">
      <template v-if="headlineNewsList">
        <h2 class="news-category mb-1">{{ getNewsCategory() }}</h2>
        <v-divider />

        <news-list col-num="6" />
      </template>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
const NewsList = () => import("~/components/main/NewsList.vue");

export default {
  components: {
    NewsList
  },
  computed: {
    ...mapState(["headlineNewsList"])
  },
  async fetch({ store, params }) {
    await store.dispatch("fetchHeadlineNews", { params });
  },
  methods: {
    getNewsCategory() {
      switch (this.$route.params.category) {
        case "general":
          return "ヘッドライン";
        case "technology":
          return "テクノロジー";
        case "business":
          return "ビジネス";
        case "entertainment":
          return "エンターテイメント";
        case "sports":
          return "スポーツ";
        case "science":
          return "サイエンス";
        case "health":
          return "ヘルス";
        default:
          return this.$route.params.category;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.news-category {
  color: #616161;
  @media screen and (max-width: 600px) {
    font-size: 20px;
  }
}
</style>
