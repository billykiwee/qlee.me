import React from 'react'
import { Menu } from './header/components/menu'


export default function Main({className, style, children}) {

    return (
        <main className={className} style={style}>
            {children}
        </main>
    )
}
