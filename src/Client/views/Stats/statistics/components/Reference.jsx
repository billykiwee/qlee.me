import React from 'react'
import getFavicon from '../../../../../App/utils/getFavicon'
import { isValidUrl } from '../../../../../App/utils/isValidUrl'
import { getHostName } from '../../../../lib/getHostName'
import { ProgressBar } from '../../components/ProgressBar'
import { percentage } from '../functions/percentage'


export function Reference({ stat }) {

    if (!stat.length) return <small className='c-grey'>Aucune données</small>
                                    
    return stat
    .sort((x, y)=> y.count - x.count)
    .map((item, i) => {      
    
        let sum =  stat.map(e=> e.count).reduce((x,y)=> x+y)
    
        return (
            <div className='display justify-s-b' key={i}>
                <div className='display gap'>
                <img src={getFavicon(item.url)} width={16} className='border-r-2' />
                {
                    isValidUrl(item.url) 
                    ? <span>{getHostName(item.url)}</span> 
                    : <span>autres</span>
                }
                    <small className='c-grey f-s-12'>{item.count}</small>
                </div>
                <div className='w-50p'>
                    <ProgressBar percentage={percentage(sum, item.count)} /> 
                </div>
            </div>
        )
    })
}


