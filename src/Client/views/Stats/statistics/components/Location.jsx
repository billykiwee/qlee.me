import React from 'react'
import { ProgressBar } from '../../components/ProgressBar'


export function Location({ data }) {

    const { stat, percentage, active } = data
    
    if (!Object.values(stat.array).length) return <small className='c-grey'>Aucune données</small>
    
    if (active) 
    return Object.values(stat.array)
    .sort((x, y)=> y.count - x.count)
    .map(array=> {
        return (
            <div className='display justify-s-b'>
                <div className='display gap'>
                    <span>{array.name.split('__')[1]}</span> 
                    <small className='c-grey f-s-12'>{array.count}</small>
                </div>
                <ProgressBar percentage={percentage(stat, array)} />
            </div>
        )
    })
}
