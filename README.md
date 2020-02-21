<h1 align="center">📰 Nuxt × News App 📰</h1>

![nuxt-news-app](https://user-images.githubusercontent.com/46732829/74839888-633f8480-5369-11ea-9cb7-4da1f0fe2898.gif)

<p align="center">
	<a href="https://gitmoji.carloscuesta.me">
		<img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square"
			 alt="Gitmoji">
	</a>
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="prettier">
  </a>
  <a href="/LICENSE">
    <img src="http://img.shields.io/badge/license-MIT-blue.svg?style=flat" alt="MIT LICENCE">
  </a>
</p>

News application using [News API][*1] built with Nuxt.js and Vuetify.✨

You can see the latest Japanese news and world news.

## 📱 Mobile layout

<p align="center">
<img src="https://user-images.githubusercontent.com/46732829/74101738-6a53df00-4b80-11ea-9d6b-829c8504f26f.png">
</p>

## ⭐️ Application URL

[https://nuxt-news-app.now.sh](https://nuxt-news-app.now.sh)

## 🔧 Build Setup

### Environment

Create `.env` file and add `API_KEY`. Set the News API Key to the value.

```bash
BASE_URL=http://localhost:3000
API_KEY=<your News API Key>
```

### Run locally

```bash
$ yarn install

$ yarn dev
```

## 🌐 Deploy to zeit now

1. Create an account for [Zeit now][*2]
1. install [now cli][*3]

```bash
# login to zeit now
$ now login

# Add Secrets for building with now and for functions
$ now secrets add BASE_URL <your zeit now domain>
$ now secrets add API_KEY <your News API Key>

# So, When do you deploy？
$ now
```

```bash
# production deploy
$ now --prod
```

## Author

👀 **K**

- Twitter: [@k_urtica](https://twitter.com/k_urtica)
- Github: [@k-urtica](https://github.com/k-urtica)

## 📄 License

Copyright © 2020 [K](https://github.com/k-urtica).<br />
This project is [MIT](http://opensource.org/licenses/MIT) licensed.

## powered by NewsAPI.org

[*1]: https://newsapi.org/
[*2]: https://zeit.co/
[*3]: https://github.com/zeit/now
