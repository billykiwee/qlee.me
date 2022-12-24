import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';


export async function download(name) {

    var node = document.getElementById('qr-code-img')

    htmlToImage.toPng(node)
    .then(dataUrl => {

        const link = document.createElement('a')
        link.download = name + '-QrCode.png'
        link.href = dataUrl

        link.click()
    })
    .catch(error=> {
        console.error(error);
    })
      
}