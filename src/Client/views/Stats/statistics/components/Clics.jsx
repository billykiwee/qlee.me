import React from 'react'
import UniqueID from '../../../../../App/utils/uniqueID'

export function Clics({ data }) {

    const { stat } = data
    
    return (
        <div className='display justify-s-b ' >
            <span>{stat.count}</span>
        </div>
    )
}
