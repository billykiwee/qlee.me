import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProfilImg } from '../../Website/Home'
import { db } from '../database/firebase'
import { useStateValue } from '../provider/StateProvider'



export default function Header() {


    const [{user}] = useStateValue()

    const [getUsers, setgetUsers] = useState([])

    useEffect(e=> {
        db.collection('users').onSnapshot(snapshot => {
            setgetUsers(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    function getUser() {
        for (const v in getUsers) {
            if (getUsers[v].email === user?.email) return getUsers[v]
        }
    }
    const USER = getUser()


    const [Menu, setMenu] = useState(false)


    const menu = [
        {
            name: 'Acceuil',
            link: '/',
        },
        {
            name: 'Se connecter',
            link: '/login',
        },
        {
            name: 'Créer un lien',
            link: '/dashboard',
        },
        {
            name: 'Link in bio',
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


    useEffect(e=> {

        window.onclick = e => {
            if (!e.target.closest('header')) setMenu(false)
        }

    }, [Menu])





    
    return (
        <header className='shadow border-b border-r-2 p-1 border m-b-2 m-t-1 white transition'>
            <div className='align-top display justify-s-b'>
                <div className='display gap click'>
                    <Link to={user ? '/dashboard' : '/'}>
                        <span className='display'>
                            <img src='/images/logo.svg' width={140} />
                        </span>
                    </Link>
                </div>
                <div className='display gap'>
                    {
                        user 
                        ?
                        <Link to='/dashboard' className='display avatar-header' >
                            <img src={USER?.photoURL} className='border-r-100' width={40} height={40} />
                        </Link>
                        : 
                        <div className='display justify-c'>
                            <Link to='/login'>
                                <button className='border-b hover-blue border border-r-1 p-lr-1 gap-04 blue' style={{height: '40px'}}>
                                    <span className='display'>
                                        <img src='/images/user-solid.svg' width={14} style={{filter:' invert(100%)'}} />
                                    </span>
                                    <span className='display'>Se connecter</span>
                                </button>
                            </Link>
                        </div>
                    }
                    <button className='hamburger border-b hover border' onClick={e=> setMenu(Menu === false ? true : false)} >
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
                                    <Link to={menu.link} className='w-100p' key={menu.name} onClick={e=> setMenu(false)}>
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
    )
}
