import React from 'react'
import getFavicon from '../../../../../../App/utils/getFavicon'

export function Read({ props }) {

    const { link, blocks } = props
    return (
        <a href={'https://' + link.shortLink} className='relative'>
            <div className='display border white border-r-1 border-b p-1 hover click h-2' >
                {
                    blocks?.img &&
                    <div className='display justify-c absolute'>
                        <img src={link.icon ?? getFavicon(link.url)} width={40} className='border-r-100' />
                    </div>
                }
                <div className='display justify-c w-100p'>
                    <span className='f-s-16'>{link.name}</span>
                </div>
            </div>
        </a>
    )
}