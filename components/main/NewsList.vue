<template>
  <v-row justify="center">
    <v-col
      v-for="news in headlineNewsList"
      :key="news.title"
      :cols="colNum"
      align="center"
    >
      <v-card
        :href="news.url"
        target="_blank"
        rel="noopener"
        hover
        outlined
        class="mb-3"
      >
        <v-img
          :src="news.urlToImage === null ? '' : news.urlToImage"
          height="400px"
        >
          <v-row align="end" class="fill-height px-3">
            <v-col class="news-title-section py-2">
              <h2 class="white--text" align="left">{{ news.title }}</h2>
              <p class="mb-0 white--text caption text-right">
                {{ news.author }}
              </p>
            </v-col>
          </v-row>
        </v-img>

        <v-card-actions class="py-0 px-3">
          <v-spacer />
          <v-btn icon>
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    colNum: {
      type: String,
      default: "6"
    }
  },
  computed: {
    ...mapState(["headlineNewsList"])
  }
};
</script>

<style lang="scss" scoped>
.news-title-section {
  background-color: rgba(20, 20, 20, 0.65);
  h2 {
    font-size: 18px;
    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
  }
}
</style>
