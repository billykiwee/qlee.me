import React, { useState } from 'react'
import QRCode from 'react-qr-code'


export default function QRcode({link, close}) {



    function downloadQRCode(data) {
        const svg = document.getElementById('qr-code-svg');
        let downloadLink = document.createElement('a');
        downloadLink.href = 'data:image/svg;base64,' + btoa(svg.outerHTML)

        downloadLink.download = 'qr-code.svg'
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    
    if (link)
    return (
        <div className='frame-qrcode black' >

            <div className='display w-100p justify-c'>
                <div className='grid gap-1rem'>
                    <div className='display'>
                        <div className='display gap'>
                            <button className='border-b white h-3 p-lr-1 border-r-1' onClick={close} >
                                <span>Retour</span>
                            </button>
                            <button className='border-b blue h-3 p-lr-1 border-r-1' >
                                <span>Modifier</span>
                            </button>
                            <button className='border-b white h-3 p-lr-1 border-r-1' onClick={e=> downloadQRCode(link)} >
                                <span className='display'>
                                    <img src='/images/dowload.svg' width={20} height={20} />
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className='display white border-r-2 p-2 border-b gap-1rem'>
                        <QRCode
                            id="qr-code-svg"
                            bgColor={'white'}
                            fgColor={'black'}
                            className='click'
                            level='H'
                            size={200}
                            value={link}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
