import React from 'react'

export default function Container({children, style}) {

    return (
        <div className={'container ' + style }>
            <div className='grid'>{children}</div>
        </div>
    )

}