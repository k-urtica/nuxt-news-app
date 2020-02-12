<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    floating
    mobile-break-point="1020"
  >
    <v-list shaped dense class="py-5">
      <v-list-item
        v-for="item in drawerItems"
        :key="item.title"
        :to="item.link"
        exact
        nuxt
        color="primary"
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon" />
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>

      <v-list-item
        v-for="item in headlineCategory"
        :key="item.title"
        :to="item.link"
        exact
        nuxt
        color="primary"
        class="pl-8"
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon" />
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>

      <v-divider class="my-1" />

      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon>mdi-earth</v-icon>
          </v-list-item-icon>
          <v-list-item-title>ワールド</v-list-item-title>
        </template>

        <v-list-item
          v-for="source in $store.state.newsSouceList"
          :key="source.id"
          :to="{ name: 'world-source', params: { source: source.id } }"
          nuxt
          exact
        >
          <v-list-item-title>{{ source.name }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>

    <template v-slot:append>
      <v-row justify="center">
        <v-switch
          v-model="darkMode"
          color="warning"
          label="ダークモード"
          hide-details
          inset
          dense
        />
      </v-row>
      <div class="pa-3 text-center">
        <v-divider />
        <v-btn
          v-for="item in bottomItems"
          :key="item.title"
          :href="item.link"
          :title="item.title"
          target="_blank"
          rel="noopener"
          class="mr-3"
          icon
        >
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>

        <share-dialog />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
const ShareDialog = () => import("~/components/share/ShareDialog.vue");

export default {
  components: {
    ShareDialog
  },
  data: () => ({
    drawerItems: [
      {
        title: "トップニュース",
        icon: "mdi-newspaper-variant-multiple-outline",
        link: { name: "index" }
      },
      {
        title: "ヘッドライン",
        icon: "mdi-fire",
        link: {
          name: "headline-category",
          params: { category: "general" }
        }
      }
    ],
    headlineCategory: [
      {
        title: "テクノロジー",
        icon: "mdi-laptop-mac",
        link: {
          name: "headline-category",
          params: { category: "technology" }
        }
      },
      {
        title: "ビジネス",
        icon: "mdi-domain",
        link: {
          name: "headline-category",
          params: { category: "business" }
        }
      },
      {
        title: "エンターテイメント",
        icon: "mdi-filmstrip",
        link: {
          name: "headline-category",
          params: { category: "entertainment" }
        }
      },
      {
        title: "スポーツ",
        icon: "mdi-soccer",
        link: {
          name: "headline-category",
          params: { category: "sports" }
        }
      },
      {
        title: "サイエンス",
        icon: "mdi-atom",
        link: {
          name: "headline-category",
          params: { category: "science" }
        }
      },
      {
        title: "ヘルス",
        icon: "mdi-heart-circle-outline",
        link: {
          name: "headline-category",
          params: { category: "health" }
        }
      }
    ],
    bottomItems: [
      {
        title: "Twitter",
        link: "https://twitter.com/intent/follow?screen_name=k_urtica",
        icon: "mdi-twitter"
      },
      {
        title: "GitHub Repo",
        link: "https://github.com/kiysi/nuxt-news-app",
        icon: "mdi-github-circle"
      }
    ],
    darkMode: false
  }),
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("setDrawer", val);
      }
    }
  },
  watch: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
};
</script>
