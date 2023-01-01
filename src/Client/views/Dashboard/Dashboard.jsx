import { serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Main from '../../../App/components/Main';
import Popup from '../../../App/components/Popup';
import { useStateValue } from '../../../App/provider/StateProvider';
import { db } from '../../../App/database/firebase';
import { isValidUrl } from '../../../App/utils/isValidUrl';
import UniqueID from '../../../App/utils/uniqueID';
import ListLink from './components/ListLink';
import { getHostName } from '../../lib/getHostName';
import { fetchUserLinks } from '../../lib/database/fetchUserLinks';
import Messages from '../../../App/utils/Messages';
import { isUserPremium } from '../../../Admin/settings/isPremium';
import { fetchUser } from '../../lib/database/fetchUser';
import { setSnackbar, SnackBar } from '../../../App/components/SnackBar';
import Articles from './components/Articles';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { createLink } from '../Links/functions/Create';
import Login from '../../../Website/connection/Login'


export default function Dashboard() {

    const [{user}] = useStateValue()

    const [User, setUser] = useState([])
    const [UserLinks, setUserLinks] = useState([])

    useEffect(() => {

        fetchUserLinks(setUserLinks, user?.email)
        fetchUser(setUser, user?.email)

    }, [user?.email])


    const [LinkURL, setLinkURL] = useState('')
    const [NameLink, setNameLink] = useState('')

    const [Msg, setMsg] = useState([])
    const [Error, setError] = useState('')


    window.onkeydown = e => {
        if (e.key === 'Enter') {
            if (LinkURL) {
                document.querySelector('#btn-create').click()
            }
        }
    }





    
    if (!user) return <Login />
    
    return (

        <Main>
            <div className='grid gap-3rem blocks' >

                <div className='grid gap'>
                    <div className='grid gap-2rem'>

                        <div className='grid' >
                            <h2 className='m-t-0 m-b-1'>Bonjour, {User.name}</h2>
                            <Articles links={UserLinks} />
                        </div>

                        <form className='grid gap-2rem ' 
                            onSubmit={e=> {
                                e.preventDefault()
                                
                                createLink({
                                    elements: e.target.elements,
                                    setError,
                                    User,
                                    UserLinks,
                                    setMsg 
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
                                                onChange={e=> {setNameLink(e.target.value); setError('')}} 
                                                className='div-input h-3 border-r-1 w-100p white' placeholder='Créer le nom du lien' 
                                            />
                                        </div>
                                        <div className='display w-100p'>
                                            <input type='text' id='url'
                                                onChange={e=> {setLinkURL(e.target.value); setError('')}} 
                                                className='div-input h-3 border-r-1 w-100p white' placeholder='Enter your website URL' 
                                            />
                                        </div>
                                    </div>
                                    <div className='display h-4 align-top'>
                                        <button 
                                            /* onClick={e=> 
                                                createLink({
                                                    NameLink,
                                                    LinkURL,
                                                    setLinkURL,
                                                    setNameLink,
                                                    setError,
                                                    User,
                                                    UserLinks,
                                                    setMsg 
                                                }) 
                                            }  */
                                            id='btn-create'
                                            className='border-r-1 blue p-1 h-4 p-lr-2 border-b hover-blue' 
                                        >
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
                                        <small className='c-black'>{UserLinks.length} / {isUserPremium(User).max_links}</small>
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
                                        : <ListLink links={UserLinks} User={User} />
                                    )
                                }
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            <SnackBar content={Msg} setMsg={setMsg} />
        </Main>
    )
}


