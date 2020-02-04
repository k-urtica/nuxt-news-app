require("dotenv").config();
const { API_KEY } = process.env;

export default {
  mode: "spa",
  head: {
    htmlAttrs: {
      lang: "ja"
    },
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ]
  },
  loading: {
    color: "#81D4FA"
  },
  css: [],
  plugins: ["@/plugins/axios"],
  buildModules: ["@nuxtjs/eslint-module", "@nuxtjs/vuetify", "@nuxtjs/dotenv"],
  modules: ["@nuxtjs/axios"],
  axios: {
    baseURL: process.env.BASE_URL || "http://localhost:3000"
  },
  vuetify: {
    customVariables: ["~/assets/css/vuetify/variables.scss"]
  },
  serverMiddleware: ["~/api/news.js"],
  build: {
    //    extractCSS: true,
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
  env: {
    API_KEY
  }
};
