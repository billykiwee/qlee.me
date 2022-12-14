import React, { useState } from 'react'
import QRCode from 'react-qr-code'
import Link from '../Link'

export default function QRcode({link, close}) {

    if (link)
    return (
        <div className='frame-qrcode black' >

            <div className='display w-100p justify-c'>
                <div className='grid gap-1rem'>
                    <div className='display'>
                        <div className='display'>
                            <button className='border-b white h-3' onClick={close} >
                                <span>Retourner en arrière</span>
                            </button>
                        </div>
                    </div>
                    <div className='display white border-r-2 p-2 border-b gap-1rem'>
                        <QRCode
                            bgColor={'white'}
                            fgColor={'black'}
                            className='click'
                            size={200}
                            value={link}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
