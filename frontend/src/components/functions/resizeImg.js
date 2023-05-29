export default function resizeImg(url, index, scale) {
  let urlArray = url.split("/");
  urlArray.splice(index, 0, scale);
  let imgUrl = urlArray.join("/");
  return imgUrl;
}
