<template>
  <v-row justify="center">
    <v-col cols="12" align="center">
      <h2 class="news-category mb-1">{{ getNewsCategory() }}</h2>
      <v-divider />
    </v-col>

    <v-col v-for="news in newsList" :key="news.title" cols="12" sm="6">
      <news-card
        :news="news"
        data-aos="zoom-in-up"
        data-aos-anchor-placement="top-bottom"
      />
    </v-col>

    <snack-bar message="ニュースリンクをコピーしました" />
  </v-row>
</template>

<script>
const NewsCard = () => import("~/components/main/NewsCard.vue");
const SnackBar = () => import("~/components/parts/SnackBar.vue");

export default {
  head() {
    return {
      title: "ヘッドライン - " + this.getNewsCategory()
    };
  },
  components: {
    NewsCard,
    SnackBar
  },
  async asyncData({ $axios, params, error }) {
    try {
      const res = await $axios.$get("/api/news/headline", {
        params: { category: params.category }
      });
      return {
        newsList: res.articles
      };
    } catch (e) {
      error({ statusCode: 404, message: "something error!!" });
    }
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
