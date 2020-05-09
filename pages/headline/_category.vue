<template>
  <div>
    <h2 class="news-category text-center mb-1">{{ getNewsCategory() }}</h2>
    <v-divider class="mb-2" />

    <v-row justify="center">
      <v-col
        v-for="news in newsList"
        :key="news.title"
        class="mb-2"
        cols="12"
        sm="6"
      >
        <news-card
          :news="news"
          data-aos="zoom-in-up"
          data-aos-anchor-placement="top-bottom"
        />
      </v-col>
      <snack-bar message="ニュースリンクをコピーしました" />
    </v-row>
  </div>
</template>

<script>
const NewsCard = () => import("~/components/main/NewsCard.vue");
const SnackBar = () => import("~/components/parts/SnackBar.vue");

export default {
  components: {
    NewsCard,
    SnackBar,
  },
  async asyncData({ $axios, params }) {
    const res = await $axios.$get("/api/news/headline", {
      params: { category: params.category },
    });
    return {
      newsList: res.articles,
    };
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
    },
  },
  head() {
    return {
      title: "ヘッドライン - " + this.getNewsCategory(),
    };
  },
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
