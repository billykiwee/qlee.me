import React from 'react'
import QRCode from 'react-qr-code'
import getFavicon from '../../../../../../App/utils/getFavicon'


export function EditQrCode({ style, link }) {

    if (style.frameActive)
    return (
 
        <div className='grid gap-1rem border-r-1 gap-1rem p-1 border-b blue' id='qr-code-frame-img' style={{background: style.frameColor ?? 'var(--blue)'}} > 
            <div className='display white p-1 border-r-04 justify-c' style={{background : 'white'}} >
                {/* {
                    style.logo &&
                    <div 
                        style={{ 
                            backgroundImage : `url(${link?.icon || getFavicon(link?.url)})`, 
                            backgroundPosition: 'center', 
                            backgroundSize: 'cover' 
                        }}
                        className='w-2 h-2 border-r-100 absolute white' 
                    />
                } */}
                <QrCodeSvg style={style} link={link} />
            </div> 
            {
                style.text &&
                <div className='display justify-c'>
                    <span className='f-s-25'>{style.text}</span>  
                </div> 
            }
        </div> 
    )

    else return (
        <div className='grid gap-1rem border-r-1 gap-1rem p-1' id='qr-code-img' > 
            <div className='display p-1 border-r-04 justify-c' style={{background : 'white'}} >
               {/*  {
                    style.logo &&
                    <div 
                        style={{ 
                            backgroundImage : `url(${link?.icon || getFavicon(link?.url)})`, 
                            backgroundPosition: 'center', 
                            backgroundSize: 'cover' 
                        }}
                        className='w-2 h-2 border-r-100 absolute white' 
                    />
                } */}
               <QrCodeSvg style={style} link={link} />
            </div> 
        </div> 
    )
}


function QrCodeSvg({ style, link }) {

    console.log(style);
    return (
        <QRCode
            bgColor='white'
            fgColor={style.lineColor ?? 'black'}
            className='click qr-code-svg'
            level='H'
            size={144}
            value={link.shortLink}
        />
    )
}