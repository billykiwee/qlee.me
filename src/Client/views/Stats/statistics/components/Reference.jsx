import React from 'react'
import getFavicon from '../../../../../App/utils/getFavicon'
import { isValidUrl } from '../../../../../App/utils/isValidUrl'
import { getHostName } from '../../../../lib/getHostName'
import { ProgressBar } from '../../components/ProgressBar'
import { percentage } from '../functions/percentage'


export function Reference({ data }) {

    const { stat } = data

    if (!Object.values(stat.array).length) return <small className='c-grey'>Aucune données</small>

    return Object.values(stat.array)
    .sort((x, y)=> y.count - x.count)
    .map(array=> {

        return (
            <div className='display justify-s-b'>
                <div className='display gap'>
                    <img src={getFavicon(array.name)} width={16} className='border-r-2' />
                    {
                        isValidUrl(array.name) 
                        ? <span>{getHostName(array.name)}</span> 
                        : <span>autres</span>
                    }
                    <small className='c-grey f-s-12'>{array.count}</small>
                </div>
                <ProgressBar percentage={percentage(stat, array)} />
            </div>
        )
    })
}
