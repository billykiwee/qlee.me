import React from 'react'


export default function Main({className, style, children, props}) {
    
    return (
        <main className={className} style={style}>
            {children}
        </main>
    )
}
