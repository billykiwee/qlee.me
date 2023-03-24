import * as htmlToImage from "html-to-image";

export async function download(name, QrCode) {
  var node = document.querySelector("#" + QrCode);

  htmlToImage
    .toPng(node)
    .then((dataUrl) => {
      console.log(dataUrl);

      const link = document.createElement("a");
      link.download = name + "-QrCode.png";
      link.href = dataUrl;

      link.click();
    })
    .catch((error) => {
      console.error(error);
    });
}
