require("dotenv").config();
const { BASE_URL, API_KEY, ANALYTICS_ID } = process.env;

const siteTitle = "NUXT×NEWS APP";
const description =
  "今、日本国内・世界で起きている話題のニュースを新聞や通信社など様々なニュースソースから取得して掲載しています。";
const baseUrl = BASE_URL;
const baseDir = "/";
const basePath = baseUrl + baseDir;

export default {
  mode: "spa",
  head: {
    htmlAttrs: {
      lang: "ja"
    },
    titleTemplate: "%s | " + siteTitle,
    title: siteTitle,
    meta: [
      {
        charset: "utf-8",
        prefix: "og: http://ogp.me/ns#"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: description
      },
      // OGP
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: siteTitle
      },
      {
        hid: "og:type",
        property: "og:type",
        content: "website"
      },
      {
        hid: "og:url",
        property: "og:url",
        content: basePath
      },
      {
        hid: "og:title",
        property: "og:title",
        content: siteTitle
      },
      {
        hid: "og:description",
        property: "og:description",
        content: description
      },
      {
        hid: "og:image",
        property: "og:image",
        content: baseUrl + "/img/ogp.png"
      },
      // twitter
      {
        name: "twitter:card",
        content: "summary_large_image"
      },
      {
        name: "twitter:site",
        content: "@k_urtica"
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
  router: {
    trailingSlash: true,
    middleware: "redirect"
  },
  loading: {
    color: "#81D4FA"
  },
  css: [],
  plugins: [
    "@/plugins/axios",
    { src: "~/plugins/aos", mode: "client" },
    "~/plugins/dayjs.js"
  ],
  buildModules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/vuetify",
    "@nuxtjs/dotenv",
    ["@nuxtjs/google-analytics", { id: process.env.ANALYTICS_ID }]
  ],
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
    BASE_URL,
    API_KEY,
    ANALYTICS_ID
  }
};
