// 末尾にスラッシュがなければスラッシュ付きのurlへ301リダイレクトする
export default function({ route, redirect }) {
  if (route.path.slice(-1) !== "/") {
    redirect(301, route.path + "/");
  }
}
