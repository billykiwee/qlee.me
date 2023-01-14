import React from 'react'

export function Performance({ stat }) {

    if (!stat) return <small className='c-grey'>Aucune données</small>

    return stat.type
    .map(item=> (
        <div className='display justify-s-b' >
            <div className='display gap'>
                <span>{item.title}</span>
            </div>
            <span>{item.data}</span>
        </div>
    ))
}
