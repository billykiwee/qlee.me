import { BuildingOfficeIcon, LockOpenIcon, PencilIcon, SwatchIcon, UserIcon } from "@heroicons/react/24/solid"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export function Menu({ props }) {

    const { User, menu, setMenu } = props


    const list = [
        {
            name: User ? 'Mon compte' : 'Se connecter',
            link:  User ? '/profil' : '/login',
            icon: <UserIcon width={16} className='c-black' />
        },
        {
            name: 'Créer un lien',
            link: '/dashboard',
            icon: <PencilIcon width={16} className='c-black' />
        },
        /* {
            name: 'Link in bio',
            link: '/edit/' + User.link_in_bio,
            icon: <SwatchIcon width={16} className='c-yellow' />
        }, */
        {
            name: 'Pricing',
            link: '/pricing',
            icon:  <LockOpenIcon width={16} className='c-black' />
        },
        {
            name: 'Terms',
            link: '/terms',
            icon:  <BuildingOfficeIcon width={16} className='c-black' />
        }
    ]

    useEffect(e=> {
        window.onclick = e => {
            if (!e.target.closest('header')) setMenu(false)
        }
    }, [setMenu])


    if (menu)
    return (
        <div className='display justify-c menu m-t-1'>
            <div className='grid w-100p'>
                {
                    list.map((menu, i)=> {
                        return (
                            <Link to={menu.link} className={'w-100p'} key={menu.name} onClick={e=> setMenu(false) }>
                                <button className='h-3 hover border-r-1 display gap p-1'>
                                    {menu.icon}
                                    <span className='f-s-16 c-black'>{menu.name}</span>
                                </button>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}