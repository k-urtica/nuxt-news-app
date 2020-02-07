export const state = () => ({
  /** トップニュース */
  topNewsList: [],
  /** ヘッドラインニュース */
  headlineNewsList: [],
  /** ドロワー */
  drawer: null,
  /** スナックバー */
  snackBar: false
});

export const mutations = {
  setTopNews(state, newsList) {
    state.topNewsList = newsList;
  },
  setHeadlineNews(state, newsList) {
    state.headlineNewsList = newsList;
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
  }
};
