<template>
  <v-row justify="center">
    <template v-if="topNewsList">
      <v-col
        v-for="newsItems in topNewsList"
        :key="newsItems.category"
        cols="12"
        align="center"
      >
        <h2 class="mb-1 text-left news-category">
          {{ getNewsCategory(newsItems.category) }}
        </h2>
        <v-divider class="mb-3" />

        <v-card
          v-for="news in newsItems.newsList"
          :key="news.title"
          outlined
          hover
          class="mb-3"
          data-aos="fade-left"
          data-aos-duration="800"
        >
          <v-container class="pt-3 pb-0">
            <a :href="news.url" target="_brank" rel="noopener">
              <v-row>
                <v-col class="text-left py-1 pb-0" cols="8">
                  <h3 class="news-title mb-2">{{ news.title }}</h3>
                  <p class="news-author mb-0 text-right">
                    <span class="mr-2">{{ news.author }}</span>
                    <time>{{ getFormtedDate(news.publishedAt) }}</time>
                  </p>

                  <template
                    v-if="
                      $vuetify.breakpoint.smAndUp && news.description !== null
                    "
                  >
                    <v-card-text class="news-text pl-1 py-2">
                      {{ getNewsText(news.description) }}
                    </v-card-text>
                  </template>
                </v-col>
                <v-col class="px-2" cols="4">
                  <v-img
                    :src="getImageUrl(news.urlToImage)"
                    :height="$vuetify.breakpoint.smAndUp ? 150 : 90"
                    style="border-radius: 6px;"
                  />
                </v-col>
              </v-row>
            </a>

            <share-buttons
              :news-title="news.title"
              :news-url="news.url"
              align="center"
            />
          </v-container>
        </v-card>
        <v-btn
          :to="{
            name: 'headline-category',
            params: { category: newsItems.category }
          }"
          nuxt
          small
          color="blue darken-2"
          rounded
          outlined
          min-width="50%"
          class="my-3"
        >
          {{ getNewsCategory(newsItems.category) }}
          ニュースをさらに見る
        </v-btn>
      </v-col>
      <snack-bar message="ニュースリンクをコピーしました" />
    </template>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import ShareButtons from "~/components/share/ShareButtons.vue";
const SnackBar = () => import("~/components/parts/SnackBar.vue");

export default {
  head() {
    return {
      titleTemplate: null
    };
  },
  components: {
    ShareButtons,
    SnackBar
  },
  computed: {
    ...mapState(["topNewsList"])
  },
  async fetch({ store }) {
    if (store.state.topNewsList.length === 0) {
      await store.dispatch("fetchTopNews");
    }
  },
  methods: {
    getNewsCategory(category) {
      switch (category) {
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
          return category;
      }
    },
    getNewsText(text) {
      const limitedText = text.substr(0, 120);
      if (limitedText.slice(-3) === "...") {
        return limitedText;
      }
      return limitedText + "...";
    },
    getFormtedDate(date) {
      const d = new Date(date);
      const formatted = `${d.getMonth() + 1}/${d.getDate()} ${d
        .getHours()
        .toString()
        .padStart(2, "0")}:${d
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      return formatted;
    },
    getImageUrl(imageUrl) {
      if (imageUrl !== null && imageUrl.match(/^https?:\/\//)) {
        return imageUrl;
      } else {
        return require("@/assets/img/no-image.png");
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
.news-title {
  font-size: 17px;
  color: #616161;
  @media screen and (max-width: 600px) {
    font-size: 13px;
  }
}
.news-author {
  font-size: 11.5px;
  color: #757575;
}
.news-text {
  font-size: 12px;
  color: #757575;
}
a {
  text-decoration: none;
}
</style>
