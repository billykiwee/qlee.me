import React from 'react'
import UniqueID from '../../../../../App/utils/uniqueID'

export function Clics({ stat }) {

    console.log(stat);
    return (
        <div className='display justify-s-b ' >
            <span>{stat}</span>
        </div>
    )
}
