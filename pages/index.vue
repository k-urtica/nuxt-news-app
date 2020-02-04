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
        >
          <v-container class="pt-2 pb-1">
            <a :href="news.url" target="_brank" rel="noopener">
              <v-row>
                <v-col class="text-left py-1 pb-0" cols="9" sm="8">
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
                <v-col class="px-2" cols="3" sm="4">
                  <v-img
                    :src="news.urlToImage === null ? '' : news.urlToImage"
                    :height="$vuetify.breakpoint.smAndUp ? 150 : 90"
                  />
                </v-col>
              </v-row>
            </a>

            <v-row>
              <v-col class="py-0 text-left" cols="12">
                <v-btn
                  v-for="item in shareButtns"
                  :key="item.title"
                  :title="item.title"
                  @click="shareNews(news.url, news.title, item.type)"
                  class="mr-3"
                  icon
                  small
                >
                  <v-icon :color="item.color">{{ item.icon }}</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-btn
          :to="{
            name: 'headline-category',
            params: { category: newsItems.category }
          }"
          nuxt
          small
          text
          color="primary"
          outlined
          min-width="50%"
        >
          {{ getNewsCategory(newsItems.category) }}
          ニュースをさらに見る
        </v-btn>
      </v-col>

      <v-snackbar v-model="snackbar" :timeout="3000" color="success">
        ニュースリンクをコピーしました
        <v-btn @click="snackbar = false" text>閉じる</v-btn>
      </v-snackbar>
    </template>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    shareButtns: [
      {
        type: "twitter",
        icon: "mdi-twitter",
        title: "twitterでシェア",
        color: "#1DA1F2"
      },
      {
        type: "facebook",
        icon: "mdi-facebook",
        title: "facebookでシェア",
        color: "#3B5998"
      },
      {
        type: "link",
        icon: "mdi-link",
        title: "リンクをコピーする",
        color: "#888"
      }
    ],
    snackbar: false
  }),
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
      return new Date(date).toLocaleString("ja");
    },
    shareNews(url, title, type) {
      if (type === "link") {
        navigator.clipboard.writeText(url);
        this.snackbar = true;
        return;
      }
      const twitterUrl = "https://twitter.com/intent/tweet?url={0}&text={1}";
      const faceBookUrl = "https://facebook.com/sharer/sharer.php?u={0}";
      let shareSnsUrl = "";
      if (type === "twitter") {
        shareSnsUrl = this.formatByArr(twitterUrl, url, title);
      } else {
        shareSnsUrl = this.formatByArr(faceBookUrl, url);
      }
      window.open(shareSnsUrl, "_blank", "noopener");
    },
    formatByArr(msg) {
      let args = [];
      for (let i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
      args = args.map((x) => encodeURI(x));
      return msg.replace(/\{(\d+)\}/g, function(m, k) {
        return args[k];
      });
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
