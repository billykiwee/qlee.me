
import { BuildingOfficeIcon, LockOpenIcon, PencilIcon, UserIcon } from "@heroicons/react/24/outline"
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toggleTheme } from "../../../functions/setTheme"


export function Menu({ props }) {

    const { User, menu, setMenu } = props


    const [theme, setTheme] = useState(localStorage.getItem('theme'))

    const list = [
        {
            name: User ? 'Mon compte' : 'Se connecter',
            link:  User ? '/profil' : '/login',
            icon: <UserIcon width={18} className='currentColor' />
        },
        {
            name: 'Créer un lien',
            link: '/dashboard',
            icon: <PencilIcon width={18} className='currentColor' />
        },
        /* {
            name: 'Link in bio',
            link: '/edit/' + User.link_in_bio,
            icon: <SwatchIcon width={18} className='c-yellow' />
        }, */
        {
            name: 'Pricing',
            link: '/pricing',
            icon:  <LockOpenIcon width={18} className='currentColor' />
        },
        {
            name: 'Terms',
            link: '/terms',
            icon:  <BuildingOfficeIcon width={18} className='currentColor' />
        },
        {
            id: 'theme',
            name: theme[0].toUpperCase() + theme.split(theme[0])[1],
            icon: theme === 'light' ? <MoonIcon width={18} /> : <SunIcon width={20} />
        }
    ]

    useEffect(e=> {

        window.onclick = e => {
            if (!e.target.closest('header')) setMenu(false)
        }

    })


    if (menu)
    return (
        <div className='menu'>
            <div className='grid w-100p'>
                {
                    list
                    .map(menu => {
                        return (
                            <>
                                {
                                    menu.id === 'theme'
                                    ?
                                    <button className='h-3 border-r-1 display p-1 menu__btn' onClick={e=> { toggleTheme(localStorage.getItem('theme')) ; setTheme(localStorage.getItem('theme'))}}>
                                        <div className="display gap-1rem">
                                            {menu.icon}
                                            <span className='f-s-16'>{menu.name}</span>
                                        </div>
                                    </button>
                                    :
                                    <Link to={menu.link} key={menu.name} onClick={e=> setMenu(false) } >
                                        <button className='h-3 border-r-1 display p-1 menu__btn' >
                                            <div className="display gap-1rem">
                                                {menu.icon}
                                                <span className='f-s-16'>{menu.name}</span>
                                            </div>
                                        </button>
                                    </Link>
                                }
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}