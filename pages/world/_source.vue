<template>
  <v-row justify="center">
    <v-col cols="12" align="center">
      <div data-aos="fade-down" data-aos-duration="1200">
        <h2 class="news-category mb-1">
          <a :href="sourceDetail.url" target="_blank" rel="noopener">
            {{ sourceDetail.name }}
          </a>
        </h2>
        <p class="caption">{{ sourceDetail.description }}</p>
      </div>
      <v-divider />
    </v-col>

    <template v-if="worldNewsList">
      <v-col v-for="news in worldNewsList" :key="news.title" cols="12" sm="6">
        <news-card
          :news="news"
          data-aos="zoom-in-up"
          data-aos-anchor-placement="center-bottom"
        />
      </v-col>
    </template>
    <snack-bar message="ニュースリンクをコピーしました" />
  </v-row>
</template>

<script>
import { mapState, mapGetters } from "vuex";
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
  computed: {
    ...mapState(["worldNewsList"]),
    ...mapGetters(["getSouceDetail"])
  },
  async fetch({ store, params }) {
    await store.dispatch("fetchWorldNews", { params });
  },
  created() {
    this.sourceDetail = this.getSouceDetail(this.$route.params.source);
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
