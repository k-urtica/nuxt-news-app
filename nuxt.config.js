require("dotenv").config();
const { BASE_URL, API_KEY } = process.env;

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
      lang: "ja",
    },
    titleTemplate: "%s | " + siteTitle,
    title: siteTitle,
    meta: [
      {
        charset: "utf-8",
        prefix: "og: http://ogp.me/ns#",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: description,
      },
      // OGP
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: siteTitle,
      },
      {
        hid: "og:type",
        property: "og:type",
        content: "website",
      },
      {
        hid: "og:url",
        property: "og:url",
        content: basePath,
      },
      {
        hid: "og:title",
        property: "og:title",
        content: siteTitle,
      },
      {
        hid: "og:description",
        property: "og:description",
        content: description,
      },
      {
        hid: "og:image",
        property: "og:image",
        content: baseUrl + "/img/ogp.png",
      },
      // twitter
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:site",
        content: "@k_urtica",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css",
      },
    ],
  },
  router: {
    trailingSlash: true,
    middleware: "redirect",
  },
  loading: {
    color: "#81D4FA",
  },
  css: ["~/assets/css/global.scss"],
  plugins: [
    "@/plugins/axios",
    { src: "~/plugins/aos", mode: "client" },
    "~/plugins/dayjs.js",
  ],
  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/dotenv"],
  modules: ["@nuxtjs/axios", "@nuxtjs/pwa"],
  axios: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
  },
  vuetify: {
    customVariables: ["~/assets/css/vuetify/variables.scss"],
    defaultAssets: {
      icons: false,
    },
  },
  serverMiddleware: ["~/api/news.js"],
  build: {
    extractCSS: true,
  },
  pwa: {
    manifest: {
      lang: "ja",
      name: "NUXT×NEWS APP",
      short_name: "NUXT×NEWS APP",
      description,
      background_color: "#f0f0f0",
      display: "standalone",
    },
    icon: {
      iconSrc: "static/img/icon.png",
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: "^https://fonts.(?:googleapis|gstatic).com/(.*)",
          handler: "cacheFirst",
        },
      ],
    },
  },
  env: {
    BASE_URL,
    API_KEY,
  },
};
