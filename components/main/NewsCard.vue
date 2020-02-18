<template>
  <div>
    <v-card hover outlined>
      <a :href="news.url" target="_blank" rel="noopener">
        <v-hover v-slot:default="{ hover }">
          <v-img
            :src="getImageUrl(news.urlToImage)"
            :class="{ 'on-hover': hover }"
            :aspect-ratio="16 / 9"
          >
            <v-container fill-height fluid class="pa-0">
              <v-row class="mt-auto" no-gutters>
                <v-col cols="12" class="news-title-section pa-2">
                  <h2 class="white--text" align="left">{{ news.title }}</h2>
                </v-col>
              </v-row>
            </v-container>
          </v-img>
        </v-hover>
      </a>
      <v-card-text class="caption text-right pt-1 pb-0">
        <span class="mr-2">{{ news.author }}</span>
        <time>{{ getFormtedDate(news.publishedAt) }}</time>
      </v-card-text>
      <v-card-actions class="justify-center py-1 pb-0">
        <share-buttons :news-title="news.title" :news-url="news.url" />
      </v-card-actions>
    </v-card>
  </div>
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
  computed: {
    ...mapState(["headlineNewsList"])
  },
  methods: {
    getFormtedDate(date) {
      return this.$dayjs(date).format("M/DD HH:mm");
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
</style>
