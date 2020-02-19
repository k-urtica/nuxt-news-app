<template>
  <div>
    <div class="text-center" data-aos="zoom-in" data-aos-duration="1000">
      <h2 class="news-category mb-1">
        <a :href="sourceDetail.url" target="_blank" rel="noopener">
          {{ sourceDetail.name }}
        </a>
      </h2>
      <p class="caption">{{ sourceDetail.description }}</p>
    </div>
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
    SnackBar
  },
  head() {
    return {
      title: "ワールド - " + this.sourceDetail.name
    };
  },
  data: () => ({
    sourceDetail: {}
  }),
  async asyncData({ $axios, params, error }) {
    try {
      const res = await $axios.$get("/api/news/world", {
        params: { sources: params.source }
      });
      return {
        newsList: res.articles
      };
    } catch (e) {
      error({
        statusCode: e.response.status,
        message: e.response.data.message
      });
    }
  },
  created() {
    this.sourceDetail = this.$store.getters.getSouceDetail(
      this.$route.params.source
    );
  }
};
</script>

<style lang="scss" scoped>
.news-category {
  font-size: 26px;
  @media screen and (max-width: 600px) {
    font-size: 22px;
  }
  a {
    text-decoration: none;
    color: #607d8b;
  }
}
</style>
