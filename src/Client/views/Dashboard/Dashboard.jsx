import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import Messages from '../../../App/utils/Messages';
import { isUserPremium } from '../../../Admin/settings/isPremium';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { createLink } from '../Links/functions/Create';
import Login from '../../../Website/views/Login/Login'
import Main from '../../../App/components/Main';
import { useStateProps } from '../../../App/provider/ContextProvider';
import { List } from './components/List';


export default function Dashboard() {

    const { auth, user, snackBar } = useStateProps()
    
    const User = user?.profil
    const UserLinks = user?.links

    const [Error, setError] = useState('')



    const range = document.querySelector('#range')
    const img1 = document.querySelector('#img-1')
    const img2 = document.querySelector('#img-2')

    useEffect(e=> {



        if (range.value) img1.style.width = range.value + '%'


    }, [range])


    if (!auth) return <Login />
    return (

        <Main>
            <div className='grid gap-3rem blocks w-100' >

                <div className='grid gap'>
                    <div className='grid gap-2rem'>

                       {/*  <div className='grid' >
                            <h2 className='m-t-0 m-b-1'>Bonjour, {User.name}</h2>
                            <Articles links={UserLinks} user={User} />
                        </div> */}


                            <input type='range' style={{zIndex: 9,width: '100%', top: '25%', bottom: '25%'}} id='range' />
                        <div className='display m-t-4'>
                            <img id='img-1' style={{
                                width: '100%',
                                height: '100%'
                            }} src='https://images.unsplash.com/photo-1675141194800-ae6f2f729ed9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80' />
                            <img id='img-2' style={{
                                width: '100%',
                            }} src='https://images.unsplash.com/photo-1675141194800-ae6f2f729ed9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80' />

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
                            <div className='grid gap-1rem p-2 border-r-1 white border border-b'>
                                <div>
                                    <span className='f-s-25 f-w-500'>Créer un lien</span>
                                </div>
                                <div className='grid gap-1rem'>
                                    <div className='grid gap'>
                                        <div className='display w-100p'>
                                            <input type='text' id='name'
                                                onChange={e=> setError('')} 
                                                className='div-input h-4 border-r-1 w-100p grey' placeholder='Créer le nom du lien' 
                                            />
                                        </div>
                                        <div className='display w-100p'>
                                            <input type='text' id='url'
                                                onChange={e=> setError('')}
                                                className='div-input h-4 border-r-1 w-100p grey' placeholder="Entrer l'URL du site" 
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
                                    UserLinks === 'no_data' 
                                    ? <span>👻 Pas de lien pour le moment</span>
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










