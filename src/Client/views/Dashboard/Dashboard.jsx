import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Messages from '../../../App/utils/Messages';
import { isUserPremium } from '../../../Admin/settings/isPremium';
import Articles from './components/Articles';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { createLink } from '../Links/functions/Create';
import Login from '../../../Website/views/connection/Login'
import Main from '../../../App/components/Main';
import { useStateProps } from '../../../App/provider/ContextProvider';
import List from './components/List';


export default function Dashboard({ props }) {

    const { auth, user, snackBar } = useStateProps()
    
    const User = user?.profil
    const UserLinks = user?.links?.links

    const [Error, setError] = useState('')

    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    

    if (!auth) return <Login />
    return (

        <Main>
            <div className='grid gap-3rem blocks w-100' >


                <div className='grid gap'>
                    <div className='grid gap-2rem'>

                        <div className='grid' >
                            <h2 className='m-t-0 m-b-1'>Bonjour, {User.name}</h2>
                            <Articles links={UserLinks} user={User} />
                        </div>

                        <form className='grid gap-2rem ' 
                            onSubmit={e=> {
                                e.preventDefault()

                                createLink({
                                    elements: e.target.elements,
                                    setError,
                                    User,
                                    UserLinks,
                                    snackBar 
                                })
                            }}
                        >
                            <div className='grid gap-1rem'>
                                <div>
                                    <span className='f-s-25 f-w-500'>Créer un lien</span>
                                </div>
                                <div className='grid gap-1rem'>
                                    <div className='grid gap'>
                                        <div className='display w-100p'>
                                            <input type='text' id='name'
                                                onChange={e=> setError('')} 
                                                className='div-input h-4 border-r-1 w-100p white' placeholder='Créer le nom du lien' 
                                            />
                                        </div>
                                        <div className='display w-100p'>
                                            <input type='text' id='url'
                                                onChange={e=> setError('')}
                                                className='div-input h-4 border-r-1 w-100p white' placeholder="Entrer l'URL du site" 
                                            />
                                        </div>
                                    </div>
                                    <div className='display h-4 align-top'>
                                        <button id='btn-create' className='border-r-1 blue p-1 h-4 p-lr-2 border-b hover-blue' >
                                            <span className='f-s-16 c-white'>Créer</span>
                                        </button>
                                    </div>
                                </div>
                                {
                                    Error && 
                                    <div className='display justify-c'>
                                        <small className='c-red'>{Error}</small>
                                    </div>
                                }
                            </div>
                        </form>
                    </div>
                </div>

                <div className='grid gap-2rem'>

                    <div className='grid gap-2rem'>
                        <div className='grid gap-2rem'>
                            <div className='display justify-s-b'>
                                <div className='display gap'>
                                    <span className='f-s-25 f-w-500'>Mes liens</span>
                                    <Link className='display justify-c hover border-r-2 w-2 h-2' to='/stats'>
                                        <EllipsisHorizontalIcon width={30} />
                                    </Link>
                                </div>
                                <Link to='/pricing'>
                                    <div className='display gap-04 border-r-04 border-b yellow p-04 click hover-yellow'>
                                        <small style={{color: 'black'}}>{UserLinks.length} / {isUserPremium(User).max_links}</small>
                                        <div className='display justify-c'>
                                            <span className='display'>
                                                <img src='/images/lock-solid.svg' width={14} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className='grid gap'>
                                {
                                    UserLinks === 'no link' 
                                    ? <span>Pas de lien</span>
                                    :  
                                    (
                                        UserLinks.length < 1
                                        ? <Messages loader={true} /> 
                                        : <List links={UserLinks} User={User} />
                                    )
                                }
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </Main>
    )
}




