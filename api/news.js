import Express from "express";
import axios from "axios";

const app = Express();

const newsApi = axios.create({
  headers: {
    common: {
      Authorization: "Bearer " + process.env.API_KEY
    }
  }
});

// 共通ヘッダー
app.use((req, res, next) => {
  res.set({
    "Cache-Control": "public, max-age=300, s-maxage=7200",
    "Content-Type": "application/json; charset=utf-8",
    "X-XSS-Protection": "1; mode=block",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "deny"
  });
  next();
});

// トップニュース
app.get("/api/news", async (req, res, next) => {
  const endpoint = "https://newsapi.org/v2/top-headlines";
  const categorys = [
    "general",
    "technology",
    "business",
    "entertainment",
    "sports",
    "science",
    "health"
  ];
  const response = [];
  try {
    const resNews = await Promise.all(
      categorys.map((category) => {
        const params = { params: { country: "jp", pageSize: "5", category } };
        return newsApi.get(endpoint, params);
      })
    );
    categorys.map((category, index) => {
      response.push({ category, newsList: resNews[index].data.articles });
    });
    res.json(response);
  } catch (error) {
    error.statusCode = error.response.status;
    next(error);
  }
});

// ヘッドラインニュース
app.get("/api/news/headline", async (req, res, next) => {
  const endpoint = "https://newsapi.org/v2/top-headlines";
  const params = { params: { country: "jp", pageSize: "30" } };
  try {
    if (req.query.category) {
      Object.assign(params.params, { category: req.query.category });
    }
    const response = await newsApi.get(endpoint, params);
    res.json(response.data);
  } catch (error) {
    error.statusCode = error.response.status;
    next(error);
  }
});

// ワールドニュース
app.get("/api/news/world", async (req, res, next) => {
  const endpoint = "https://newsapi.org/v2/top-headlines";
  const params = { params: { pageSize: "30" } };
  try {
    if (req.query.sources) {
      Object.assign(params.params, { sources: req.query.sources });
    }
    const response = await newsApi.get(endpoint, params);
    res.json(response.data);
  } catch (error) {
    error.statusCode = error.response.status;
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  const msg = err.statusCode === 429 ? "Request limited" : err.message;
  res.status(err.statusCode).send({ message: msg });
});

export default app;
