# 📰 Nuxt × News App

News application using [News API][*1] built with Nuxt.js and Vuetify.

⚡ **This Project is WIP!!** :wink:

## Build Setup

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

## Deploy to zeit now

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

## powered by NewsAPI.org

[*1]: https://newsapi.org/
[*2]: https://zeit.co/
[*3]: https://github.com/zeit/now
