<template>
  <v-lazy
    v-model="isActive"
    :options="{
      threshold: 0.4
    }"
    :min-height="$vuetify.breakpoint.smAndUp ? 400 : 200"
    transition="scale-transition"
  >
    <v-card hover outlined>
      <a :href="getNewsUrl()" target="_blank" rel="noopener">
        <v-hover v-slot:default="{ hover }">
          <v-img
            :src="getImageUrl(news.urlToImage)"
            :height="$vuetify.breakpoint.smAndUp ? 370 : 195"
            :class="{ 'on-hover': hover }"
            class="test-class"
          >
            <v-row align="end" class="fill-height px-3">
              <v-col class="news-title-section py-2">
                <h2 class="white--text" align="left">{{ news.title }}</h2>
              </v-col>
            </v-row>
          </v-img>
        </v-hover>
      </a>
      <v-card-text class="caption text-right pt-1 pb-0">
        <span class="mr-2">{{ news.author }}</span>
        <time>{{ getFormtedDate(news.publishedAt) }}</time>
      </v-card-text>

      <v-row justify="center">
        <v-col class="py-0" cols="auto">
          <template v-if="$route.name === 'world-source'">
            <v-btn-toggle
              v-model="btnToggle"
              color="success"
              rounded
              dense
              borderless
              class="mr-3"
            >
              <v-btn small>
                <v-icon small class="mr-1">mdi-google-translate</v-icon>
                <span class="toggle-text">翻訳</span>
              </v-btn>
            </v-btn-toggle>
          </template>
          <share-buttons :news-title="news.title" :news-url="news.url" />
        </v-col>
      </v-row>
    </v-card>
  </v-lazy>
</template>

<script>
import { mapState } from "vuex";
import ShareButtons from "~/components/share/ShareButtons.vue";

export default {
  components: {
    ShareButtons
  },
  props: {
    news: {
      type: Object,
      default: null,
      required: true
    }
  },
  data: () => ({
    isActive: false,
    btnToggle: undefined
  }),
  computed: {
    ...mapState(["headlineNewsList"])
  },
  methods: {
    getFormtedDate(date) {
      return new Date(date).toLocaleString("ja");
    },
    getImageUrl(imageUrl) {
      if (imageUrl !== null && imageUrl.match(/^https?:\/\//)) {
        return imageUrl;
      } else {
        return require("@/assets/img/no-image.png");
      }
    },
    getNewsUrl() {
      if (this.btnToggle !== undefined) {
        const transBaseUrl =
          "https://translate.google.co.jp/translate?hl=ja&sl=auto&tl=ja&u=";
        return transBaseUrl + this.news.url;
      }
      return this.news.url;
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.news-title-section {
  background-color: rgba(20, 20, 20, 0.65);
  h2 {
    font-size: 18px;
    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
  }
}
.on-hover {
  transition: 0.3s;
  opacity: 0.7;
}
.toggle-text {
  font-size: 11px;
}
</style>
