import React from 'react'
import UniqueID from '../../../../../App/utils/uniqueID'

export function Clics({ stat }) {


    return (
        <div className='display justify-s-b ' >
            <span>{stat.count}</span>
        </div>
    )
}
