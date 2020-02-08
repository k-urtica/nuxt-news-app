<template>
  <v-dialog v-model="isShareDialog" max-width="480">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon title="SNSでシェア">
        <v-icon>
          mdi-share-variant
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row>
          <v-col
            v-for="item in shareButtons"
            :key="item.type"
            cols="6"
            class="py-2"
          >
            <v-btn
              :color="item.color"
              @click.stop="shareSns(item.type)"
              block
              outlined
              class="text-none"
            >
              <v-icon left>{{ item.icon }}</v-icon>
              {{ item.type }}
            </v-btn>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-btn @click="isShareDialog = false" text block>閉じる</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    isShareDialog: false,
    shareButtons: [
      { type: "twitter", icon: "mdi-twitter", color: "#1DA1F2" },
      { type: "facebook", icon: "mdi-facebook", color: "#3B5998" },
      { type: "はてブ", icon: "B!", color: "#00A4DE" },
      { type: "pocket", icon: "mdi-pocket", color: "#ee4056" }
    ]
  }),
  methods: {
    shareSns(type) {
      const twitterUrl = "https://twitter.com/intent/tweet?url={0}&text={1}";
      const faceBookUrl = "https://facebook.com/sharer/sharer.php?u={0}";
      const hatebuUrl = "https://b.hatena.ne.jp/entry/{0}";
      const pocketUrl = "https://getpocket.com/edit?url={0}&title={1}";

      // シェアする現在のページを生成
      let shareUrl = "";
      if (this.$route.fullPath === "/") {
        shareUrl = process.env.BASE_URL;
      } else {
        shareUrl = process.env.BASE_URL + this.$route.fullPath;
      }
      // シェア先を判定してシェアURLを生成
      const pageTitle = document.title;
      let shareSnsUrl = "";
      switch (type) {
        case "twitter":
          shareSnsUrl = this.formatByArr(twitterUrl, shareUrl, pageTitle);
          break;
        case "facebook":
          shareSnsUrl = this.formatByArr(faceBookUrl, shareUrl);
          break;
        case "はてブ":
          shareSnsUrl = this.formatByArr(hatebuUrl, shareUrl, pageTitle);
          break;
        case "pocket":
          shareSnsUrl = this.formatByArr(pocketUrl, shareUrl, pageTitle);
          break;
        default:
          return;
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
