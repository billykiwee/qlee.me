import React from 'react'
import { SwitchInput } from '../../../../../../App/components/Switch'
import getFavicon from '../../../../../../App/utils/getFavicon'

export function LinksAsIcon({ ul, putLinkAsIcon }) {
  
    return (
        <label className='display gap-04 click' htmlFor={'l-' + ul.id}>
            <SwitchInput 
                dimension={0.6} 
                checked={ul.asIcon} 
                id={'l-' + ul.id}
                onChange={(e) => {
                    putLinkAsIcon({
                        id: ul.id,
                        checked: e.target.checked,
                    })
                }}
            />
            <img src={ul.icon ?? getFavicon(ul.url)} width={16} className='border-r-100' />
            <span>{ul.name}</span>
        </label>
    )
}
  