import React from 'react'
import getFavicon from '../../../../../../App/utils/getFavicon'
import Set from './Set'


export function Edit({ props }) {

    const { link, blocks } = props


    return (
        <div className='display border white border-r-1 border-b p-1 click h-2' 
            style={{
                background  : blocks?.color,
                borderRadius: blocks?.radius + 'px',
                color       : blocks.textColor
            }}
        >
            {
                blocks?.icon &&
                <div className='display justify-c absolute'>
                    <img src={link.icon ?? getFavicon(link.url)} width={40} className='border-r-100' />
                </div>
            }
            <div className='display justify-c w-100p'>
                <span className='f-s-16' style={{color: blocks?.textColor}} >{link.name}</span>
            </div>

            <Set props={props} />
        </div>
    )
}