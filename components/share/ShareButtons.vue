<template>
  <div>
    <v-btn
      v-for="item in itemList"
      :key="item.type"
      @click.stop="shareNews(item.type)"
      :title="item.title"
      icon
    >
      <v-icon :color="item.color" small class="share-btn">
        {{ item.icon }}
      </v-icon>
    </v-btn>

    <v-btn @click.stop="copyNewsUrl()" icon title="ニュースリンクをコピー">
      <v-icon small>mdi-link</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    newsTitle: {
      type: String,
      default: "",
      required: true
    },
    newsUrl: {
      type: String,
      default: "",
      required: true
    }
  },
  data: () => ({
    itemList: [
      {
        type: "twitter",
        icon: "mdi-twitter",
        color: "#1da1f2",
        title: "Twitterでシェア"
      },
      {
        type: "facebook",
        icon: "mdi-facebook",
        color: "#3B5998",
        title: "Facebookでシェア"
      },
      { type: "hatebu", icon: "B!", color: "#008fde", title: "はてブに追加" },
      {
        type: "pocket",
        icon: "mdi-pocket",
        color: "#ee4056",
        title: "Pocketに追加"
      }
    ]
  }),
  methods: {
    shareNews(type) {
      const twitterUrl = "https://twitter.com/intent/tweet?url={0}&text={1}";
      const faceBookUrl = "https://facebook.com/sharer/sharer.php?u={0}";
      const hatebuUrl = "https://b.hatena.ne.jp/entry/{0}";
      const pocketUrl = "https://getpocket.com/edit?url={0}&title={1}";

      let shareUrl = "";
      switch (type) {
        case "twitter":
          shareUrl = this.formatByArr(twitterUrl, this.newsUrl, this.newsTitle);
          break;
        case "facebook":
          shareUrl = this.formatByArr(faceBookUrl, this.newsUrl);
          break;
        case "hatebu":
          shareUrl = this.formatByArr(hatebuUrl, this.newsUrl, this.newsTitle);
          break;
        case "pocket":
          shareUrl = this.formatByArr(pocketUrl, this.newsUrl, this.newsTitle);
          break;
        default:
          return;
      }
      window.open(shareUrl, "_blank", "noopener");
    },
    formatByArr(msg) {
      let args = [];
      for (let i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
      // URLエンコード
      args = args.map((x) => encodeURI(x));
      return msg.replace(/\{(\d+)\}/g, function(m, k) {
        return args[k];
      });
    },
    copyNewsUrl() {
      navigator.clipboard.writeText(this.newsUrl);
      this.$store.commit("setSnackBar", true);
    }
  }
};
</script>

<style lang="scss" scoped>
.share-btn {
  opacity: 0.5;
  &:hover {
    transition: all 0.2s ease;
    opacity: 1;
  }
}
</style>
