import React from 'react'

export function Performance({data}) {

    const { stat, active } = data

    if (!stat.count) return <small className='c-grey'>Aucune données</small>

    if (active) 
    return (
        <div className='display justify-s-b'>
            <div className='display gap'>
                <span>vitesse</span>
                <small className='c-grey f-s-12'>{stat.length}</small>
            </div>
            <span>{stat.count}</span>
        </div>
    ) 
}
