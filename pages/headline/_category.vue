<template>
  <v-row justify="center">
    <v-col cols="12" align="center">
      <h2 class="news-category mb-1">{{ getNewsCategory() }}</h2>
      <v-divider />
    </v-col>

    <template v-if="headlineNewsList">
      <v-col
        v-for="news in headlineNewsList"
        :key="news.title"
        cols="12"
        sm="6"
      >
        <news-card :news="news" />
      </v-col>
    </template>
    <snack-bar message="ニュースリンクをコピーしました" />
  </v-row>
</template>

<script>
import { mapState } from "vuex";
const NewsCard = () => import("~/components/main/NewsCard.vue");
const SnackBar = () => import("~/components/parts/SnackBar.vue");

export default {
  components: {
    NewsCard,
    SnackBar
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
