import { ArrowDownTrayIcon, InboxIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { MdColorLens } from 'react-icons/md'
import QRCode from 'react-qr-code'
import { colors } from '../../../../App/utils/generateLetterImage'

export default function Qrcode() {

    const [qrCodeSettings, setqrCodeSettings] = useState({
        color: 'white',
        frame: {
            color: 'var(--blue)',
            active: true
        }
    })

    return (
        <div className='display justify-c w-100p border-r-1 overflow-hidden' >
            <div className='grid gap-2rem'>
                <div className='display justify-c'>
                    <div className='display border-r-1 p-1' style={{ background : qrCodeSettings.color }}>
                        <QRCode
                            bgColor={qrCodeSettings.color}
                            fgColor='black'
                            className='click qr-code-svg'
                            size={180}
                            value={'https://qlee.me'}
                        />
                    </div>
                </div>

                <div className='display justify-s-a border-r-2 grey'>
                    <div>
                        <button className='grey border-r-100 w-3 h-3'>
                            <span className='f-s-18'>Aa</span>
                        </button>
                    </div>
                    <div>
                        <button className='grey border-r-100 w-3 h-3' onClick={e=> setqrCodeSettings(prev=> {return {...prev, color: colors[Math.floor(Math.random() * colors.length)]}} )}>
                            <MdColorLens size={20} className={'c-black'} />
                        </button>
                    </div>
                    <div>
                        <button className='grey border-r-100 w-3 h-3'>
                            <InboxIcon width={20} className='c-black' />
                        </button>
                    </div>
                    <div>
                        <button className='grey border-r-100 w-3 h-3'>
                            <ArrowDownTrayIcon width={20} className='c-black' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
