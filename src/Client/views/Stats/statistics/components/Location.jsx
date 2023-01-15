import React from 'react'
import { ProgressBar } from '../../components/ProgressBar'
import { percentage } from '../functions/percentage'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'


export function Location({ stat }) {

    if (!stat.length) return <small className='c-grey'>Aucune données</small>

    return stat
    .sort((x, y)=> y.count - x.count)
    .map((item, i) => {      

        let sum =  stat.map(e=> e.count).reduce((x,y)=> x+y)

        return (
            <div className='display justify-s-b' key={i}>
                <div className='display gap'>

                    { getUnicodeFlagIcon(item.adress.split('__')[0]) }

                    <span>{item.adress.split('__')[1]}</span> 
                    <small className='c-grey f-s-12'>{item.count}</small>
                </div>
                <ProgressBar percentage={percentage(sum, item.count)} /> 
            </div>
        )
    })
}
