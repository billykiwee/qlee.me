import React from 'react'

export function Clics({ data }) {

    const { stat } = data
    
    return (
        <div className='display justify-s-b '>
            <span>{stat.count}</span>
        </div>
    )
}
