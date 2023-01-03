import React from 'react'

export default function Background({color, img}) {
    return (
        <div style={{
            backgroundImage   : !color && `url(${img}`,
            filter            : 'blur(5px)',
            position          : 'fixed',
            left              : 0,
            right             : 0,
            width             : '100%',
            height            : '100%',
            backgroundSize    : 'cover',
            backgroundPosition: 'center',
            backgroundColor: color
        }}>
        </div>
    )
}
