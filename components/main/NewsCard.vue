<template>
  <v-lazy
    v-model="isActive"
    :options="{
      threshold: 0.4
    }"
    :min-height="$vuetify.breakpoint.smAndUp ? 400 : 200"
    transition="slide-y-reverse-transition"
  >
    <v-card hover outlined>
      <a :href="news.url" target="_blank" rel="noopener">
        <v-hover v-slot:default="{ hover }">
          <v-img
            :src="news.urlToImage === null ? '' : news.urlToImage"
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

      <share-buttons
        :news-title="news.title"
        :news-url="news.url"
        align="center"
      />
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
    isActive: false
  }),
  computed: {
    ...mapState(["headlineNewsList"])
  },
  methods: {
    getFormtedDate(date) {
      return new Date(date).toLocaleString("ja");
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
