import newsSource from "~/assets/json/news-sources.json";

export const state = () => ({
  /** ドロワー */
  drawer: null,
  /** スナックバー */
  snackBar: false,
  /** news source list */
  newsSouceList: newsSource
});

export const mutations = {
  setDrawer(state, flag) {
    state.drawer = flag;
  },
  setSnackBar(state, flag) {
    state.snackBar = flag;
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
