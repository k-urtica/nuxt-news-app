export default function ({ $axios, error }) {
  $axios.onError((e) => {
    error({
      statusCode: e.response.status,
      message: e.response.data.message,
    });
  });
}
