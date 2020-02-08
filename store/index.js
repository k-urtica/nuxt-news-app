import newsSource from "~/assets/json/news-sources.json";

export const state = () => ({
  /** トップニュース */
  topNewsList: [],
  /** ヘッドラインニュース */
  headlineNewsList: [],
  /** ワールドニュース */
  worldNewsList: [],
  /** ドロワー */
  drawer: null,
  /** スナックバー */
  snackBar: false,
  /** news source list */
  newsSouceList: newsSource
});

export const mutations = {
  setTopNews(state, newsList) {
    state.topNewsList = newsList;
  },
  setHeadlineNews(state, newsList) {
    state.headlineNewsList = newsList;
  },
  setWorldNews(state, newsList) {
    state.worldNewsList = newsList;
  },
  setDrawer(state, flag) {
    state.drawer = flag;
  },
  setSnackBar(state, flag) {
    state.snackBar = flag;
  }
};

export const actions = {
  async fetchTopNews({ commit }) {
    const res = await this.$axios.$get("/api/news");
    commit("setTopNews", res);
  },
  /** ヘッドラインニュースを取得する */
  async fetchHeadlineNews({ commit }, { params }) {
    const res = await this.$axios.$get("/api/news/headline", {
      params: { category: params.category }
    });
    commit("setHeadlineNews", res.articles);
  },
  async fetchWorldNews({ commit }, { params }) {
    const res = await this.$axios.$get("/api/news/world", {
      params: { sources: params.source }
    });
    commit("setWorldNews", res.articles);
  }
};

export const getters = {
  /** ニュースソースIDから詳細情報を取得する */
  getSouceDetail(state) {
    return (sourceId) => {
      for (const item of state.newsSouceList) {
        if (sourceId === item.id) {
          return item;
        }
      }
    };
  }
};
