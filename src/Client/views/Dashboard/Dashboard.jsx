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
import { useReducer } from 'react';
import { BookmarkIcon, EyeIcon } from '@heroicons/react/24/solid';
import { dataFilter } from '../Stats/data/dataFilters';
import formatDate from '../../../App/utils/formatDate';
import { HeartIcon } from '@heroicons/react/24/solid';
import getFavicon from '../../../App/utils/getFavicon';
import Articles from './components/Articles';
import { formatNumber } from '../../../App/utils/formatNumber';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';


export default function Dashboard() {

    const history = useNavigate()

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
    

    function createLink(NameLink, LinkURL) {

        const linkID = 'qlee.me/' + UniqueID('', 5)
                        
        const link = {
            name     : NameLink.length < 1 ? getHostName(LinkURL) : NameLink,
            id       : linkID.split('/')[1],
            user     : user?.email,
            url      : isValidUrl(LinkURL).href,
            shortLink: linkID,
            date     : serverTimestamp(),
            views    : 0
        }    


        async function check() {

            if (NameLink.length) {
                if (NameLink.length > 40) {
                    throw 'Le nom doit comporté 40 charactères au maximum'
                }
            }
            
            if (!isValidUrl(LinkURL)) {
                throw 'Tu dois rentrer une URL valide'
            }
    
            if (isUserPremium(User).max_links <= UserLinks.length) {
                throw setMsg({
                        id: UniqueID('msg', 5),
                        text: 'Erreur',
                        subtext: `Tu as atteints la limite de ${isUserPremium(User).max_links} liens gratuits.`,
                        action: {
                            text : 'Débloque plus de lien ici !',
                            link: '/pricing',
                        },
                        status : 'error'
                    })
            }
        }

        check()
        .then(e=> {
        
            db.collection('links').doc(link.id).set(link)
            .then(showPopup=> {
                setMsg({
                            id: UniqueID('msg', 5),
                    text: 'Bravo 🎉',
                    subtext: `Le lien ${NameLink} a bien été crée`,
                    status: 'success'
            })
            })
            .then(linkCreated=> {
                document.querySelectorAll('input').forEach(e=> e.value = '')
                setLinkURL('')
                setNameLink('')
        
            })
        })
        .catch(Popup=> {
            setError(Popup)
        })

    }


    useEffect(() => {

        if (LinkURL) {
            window.onkeydown = e => {
                if (e.key === 'Enter') {
                    createLink(NameLink, LinkURL)
                }
            }
        }

    }, [LinkURL])




    return (

        <Main className='m-t-2'>
            <div className='grid gap-3rem blocks' >

                <div className='grid gap'>
                    <div className='grid gap-2rem'>

                        <div className='grid' >
                            <h2 className='m-t-0 m-b-1'>Bonjour, {User.name}</h2>
                            <Articles links={UserLinks} />
                        </div>

                        <div className='grid gap-2rem '>
                            <div className='grid gap-1rem'>
                                <div>
                                    <span className='f-s-25 f-w-500'>Créer un lien</span>
                                </div>
                                <div className='grid gap-1rem'>
                                    <div className='grid gap'>
                                        <div className='display w-100p'>
                                            <input type='text' onChange={e=> {setNameLink(e.target.value); setError('')}} className='div-input h-3 border-r-1 w-100p white' placeholder='Créer le nom du lien' />
                                        </div>
                                        <div className='display w-100p'>
                                            <input type='text' onChange={e=> {setLinkURL(e.target.value); setError('')}} className='div-input h-3 border-r-1 w-100p white' placeholder='Enter your website URL' />
                                        </div>
                                    </div>
                                    <div className='display h-4 align-top'>
                                        <button onClick={e=> createLink(NameLink, LinkURL) } className='border-r-1 blue p-1 h-4 p-lr-2 border-b hover-blue' >
                                            <span className='f-s-16'>Créer</span>
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
                        </div>
                    </div>
                </div>

                <div className='grid gap-2rem'>

                    <div className='grid gap-2rem'>
                        <div className='grid gap-2rem'>
                            <div className='display justify-s-b'>
                                <div className='display gap'>
                                    <span className='f-s-25 f-w-500'>Mes liens</span>
                                    <Link className='display justify-c hover border-r-2 w-2 h-2' to='/stats'>
                                        <EllipsisHorizontalIcon width={24} className='c-grey' />
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

            <SnackBar content={Msg} Msg={Msg} setMsg={setMsg} />
        </Main>
    )
}


