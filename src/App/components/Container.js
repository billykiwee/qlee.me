import React from 'react'

export default function Container({children, style}) {

    return (
        <div className={'container'}>
            {children}
        </div>
    )

}