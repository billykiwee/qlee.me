import React from 'react'

export function Performance({ stat }) {

    if (!stat.count) return <small className='c-grey'>Aucune données</small>

    return (
        <div className='display justify-s-b' >
            <div className='display gap'>
                <span>vitesse</span>
                <small className='c-grey f-s-12'>{stat.length}</small>
            </div>
            <span>{stat.count}</span>
        </div>
    ) 
}
