import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getDevice } from '../../Client/lib/getDevice'
import { ProfilImg } from '../../Website/Home'
import { db } from '../database/firebase'
import { useStateValue } from '../provider/StateProvider'
import { ArrowDownCircleIcon, BeakerIcon, BuildingOfficeIcon, LockOpenIcon, PencilIcon, SwatchIcon, UserIcon, UsersIcon } from '@heroicons/react/24/solid'
import { fetchLinks } from '../../Client/lib/database/fetchLinks'
import { fetchUser } from '../../Client/lib/database/fetchUser'


export default function Header({visible}) {


    const [{user}] = useStateValue()

    const [User, setUser] = useState([])

    useEffect(e=> {
       fetchUser(setUser, user?.email)
    }, [user])


    const [Menu, setMenu] = useState(false)


    const menu = [
        {
            name: user ? 'Mon compte' : 'Se connecter',
            link:  user ? '/profil' : '/login',
            icon: <UserIcon width={16} className='c-black' />
        },
        {
            name: 'Créer un lien',
            link: '/dashboard',
            icon: <PencilIcon width={16} className='c-black' />
        },
        {
            name: 'Link in bio',
            link: '/dashboard',
            icon: <SwatchIcon width={16} className='c-black' />
        },
        {
            name: 'Pricing',
            link: '/pricing',
            icon:  <LockOpenIcon width={16} className='c-black' />
        }
        ,
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

    }, [Menu])




    const location = useLocation()    

    function isLinkInBio() {
        return location.pathname === '/link-in-bio'
    }
    

    if (!isLinkInBio())
    return (
        <header className='border-b border-r-2 p-1 border m-b-2 m-t-1 white transition'>
            <div className='display justify-s-b'>
                <div className='display gap click'>
                    <Link to='/' >
                        <span className='display'>
                            {
                                getDevice() === 'mobile'
                                ? <img src='/images/logo-icon.png' width={44} />
                                : <img src='/images/logo.svg' width={122} />
                            }
                            </span>
                    </Link>
                </div>
                <div className='display gap'>
                    {
                        user 
                        ?
                        <Link to='/dashboard' className='display avatar-header' >
                            <img src={User?.photoURL} className='border-r-100' width={38} height={38} />
                        </Link>
                        : 
                        <div className='display justify-c'>
                            <Link to='/login'>
                                <button className='hover-blue border-r-2 p-1 gap-04 blue' style={{height: '40px'}}>
                                    <span className='display'>
                                        <img src='/images/user-solid.svg' width={14} style={{filter:' invert(100%)'}} />
                                    </span>
                                    <span className='display'>Se connecter</span>
                                </button>
                            </Link>
                        </div>
                    }
                    <button className='hamburger border-r-100' onClick={e=> setMenu(Menu === false ? true : false)} >
                        <span className='display'>
                            <img src='/images/hamburger.svg' width={20} height={20}  />
                        </span>
                    </button>
                </div>
            </div>
            {
                Menu &&
                <div className='display justify-c m-t-1 menu'>
                    <div className='grid w-100p'>
                        {
                            menu.map((menu, i)=> {
                                return (
                                    <Link to={menu.link} className={'w-100p'} key={menu.name} onClick={e=> setMenu(false)}>
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
            }
        </header>
    )
}
