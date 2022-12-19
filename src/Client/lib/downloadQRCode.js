export function downloadQRCode(name) {

    const svg = document.getElementById('qr-code-svg');
    let downloadLink = document.createElement('a');
    downloadLink.href = 'data:image/svg;base64,' + btoa(svg.outerHTML)

    downloadLink.download = name + '.svg'
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}