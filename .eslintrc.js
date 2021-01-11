module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: ["@nuxtjs", "prettier", "prettier/vue", "plugin:nuxt/recommended"],
  plugins: [],
  rules: {
    "vue/max-attributes-per-line": "off",
    "no-console": "off",
    "vue/comment-directive": "off",
  },
};
