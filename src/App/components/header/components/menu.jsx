import { BuildingOfficeIcon, LockOpenIcon, MoonIcon, PencilIcon, SunIcon, SwatchIcon, UserIcon } from "@heroicons/react/24/solid"
import { findByLabelText } from "@testing-library/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toggleTheme } from "../../../functions/setTheme"

export function Menu({ props }) {

    const { User, menu, setMenu } = props


    const list = [
        {
            name: User ? 'Mon compte' : 'Se connecter',
            link:  User ? '/profil' : '/login',
            icon: <UserIcon width={18} className='c-black' />
        },
        {
            name: 'Créer un lien',
            link: '/dashboard',
            icon: <PencilIcon width={18} className='c-black' />
        },
        /* {
            name: 'Link in bio',
            link: '/edit/' + User.link_in_bio,
            icon: <SwatchIcon width={18} className='c-yellow' />
        }, */
        {
            name: 'Pricing',
            link: '/pricing',
            icon:  <LockOpenIcon width={18} className='c-black' />
        },
        {
            name: 'Terms',
            link: '/terms',
            icon:  <BuildingOfficeIcon width={18} className='c-black' />
        }
    ]

    useEffect(e=> {
        window.onclick = e => {
            if (!e.target.closest('header')) setMenu(false)
        }
    }, [setMenu])


    const [theme, setTheme] = useState(localStorage.getItem('theme'))

    if (menu)
    return (
        <div className='menu'>
            <div className='grid w-100p'>
                {
                    list.map((menu, i)=> {
                        return (
                            <Link to={menu.link} key={menu.name} onClick={e=> setMenu(false) }>
                                <button className='h-3 border-r-1 display p-1 menu__btn' style={{
                                    display       : 'flex',
                                    alignItems    : 'stretch',
                                    justifyContent: 'flex-start'
                                }}>
                                    <div className="display gap-1rem">
                                        {menu.icon}
                                        <span className='f-s-16 c-black'>{menu.name}</span>
                                    </div>
                                </button>
                            </Link>
                        )
                    })
                }
                <button className='hamburger border-r-100 hover' onClick={e=> { toggleTheme(localStorage.getItem('theme')) ; setTheme(localStorage.getItem('theme'))}}>
                        <span className='display'>
                            {theme === 'light' ? <MoonIcon width={18} className='c-black' /> : <SunIcon width={20} className='c-black' />}
                        </span>
                    </button>
            </div>
        </div>
    )
}