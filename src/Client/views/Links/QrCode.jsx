import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import React from 'react'
import QRCode from 'react-qr-code'
import { download } from '../../lib/htmlToImage/download'

export default function QrCodeSection({Link, QrCode, setQrCode}) {

    if (QrCode)
    return (
        <div className='display align-top justify-s-b gap white border-r-2 border-b p-1 border'>
            <div className='display'>
                <div className='grid gap'>
                    <button className='border-b white hover h-3 p-1 border-r-1 border display gap' onClick={e=> download(Link.name)} >
                        <ArrowDownOnSquareIcon width={20} height={20} />
                        <span className='c-black f-s-16'>Télécharger</span>
                    </button>
                    <button className='border-b white hover h-3 p-1 border-r-1 border display gap' >
                        <PencilSquareIcon width={20} height={20} />
                        <span className='c-black f-s-16'>Modifier</span>
                    </button>
                </div>
            </div>
            <div className='display'>
                <div className='grid gap-1rem blue border-r-1 p-1 border-b gap-1rem' id='qr-code-img'>
                    <div className='display white p-1 border-r-04'>
                        <QRCode
                            bgColor='white'
                            fgColor='black'
                            className='click qr-code-svg'
                            level='H'
                            size={144}
                            value={Link.shortLink}
                        />
                    </div> 
                    <div className='display justify-c'>
                        <span className='f-s-25' contentEditable>Qlee me</span>  
                    </div> 
                </div>
            </div>
        </div>
    )
}
