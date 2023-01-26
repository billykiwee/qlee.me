import React, { useState } from 'react'
import { useStateProps } from '../provider/ContextProvider'
import { Menu } from './header/components/menu'


export default function Main({className, style, children}) {

    const User = useStateProps()?.user.profil
    
    const [menu, setMenu] = useState(true)

    return (
        <main className={className} style={style}>

            <Menu props={{ User, menu, setMenu }} />
            {children}
        </main>
    )
}
