import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ProfilImg } from '../../Website/Home'
import { useStateValue } from './StateProvider'

export default function Header() {


    const [{user}] = useStateValue()

    const [Menu, setMenu] = useState(false)
    
    const menu = [
        {
            name: 'Acceuil',
            link: '/',
        },
        {
            name: 'Créer un lien',
            link: '/dashboard',
        },
        {
            name: 'Créer un Link in bio',
            link: '/dashboard',
        },
        {
            name: 'Pricing',
            link: '/pricing',
        }
        ,
        {
            name: 'Terms',
            link: '/terms',
        }
    ]

    
    return (
        <div className='m-b-2 m-t-1'>
            <header className='shadow border-r-2 p-1 border'>
                <div className='align-top display justify-s-b'>
                    <div className='display gap click'>
                        <a href='/' className='display'>
                            <img src='/images/logo.png' width={40} height={40} />
                        </a>
                    </div>
                    <div className='display gap-1rem'>
                        <Link to='/dashboard' className='display avatar-header' >
                            <img src={user?.photoURL} className='border-r-100' width={40} height={40} />
                        </Link>
                        <button className='hamburger border-b hover border' onClick={e=> setMenu(Menu === false ? true : false)}>
                            <span className='display'>
                                <img src='/images/hamburger.svg' width={24} height={24}  />
                            </span>
                        </button>
                    </div>
                </div>
                {
                    Menu &&
                    <div className='display justify-c m-t-2 menu'>
                        <div className='grid gap-04 w-100p'>
                            {
                                menu.map(menu=> {
                                    return (
                                        <Link to={menu.link} className='w-100p' key={menu.name}>
                                            <button className='h-3 hover border-r-1 '>
                                                <span className='f-s-16'>{menu.name}</span>
                                            </button>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </header>
        </div>
    )
}
