import { serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Main from '../App/components/Main';
import Popup from '../App/components/Popup';
import { useStateValue } from '../App/provider/StateProvider';
import { db } from '../App/database/firebase';
import { isValidUrl } from '../App/utils/isValidUrl';
import UniqueID from '../App/utils/uniqueID';
import ListLink from './components/ListLink';
import { getHostName } from './lib/getHostName';
import { fetchUserLinks } from './lib/database/fetchUserLinks';
import Messages from '../App/utils/Messages';
import { isUserPremium } from '../Admin/settings/isPremium';
import { fetchUser } from './lib/database/fetchUser';
import { setSnackbar, SnackBar } from '../App/components/SnackBar';
import { useReducer } from 'react';


export default function Dashboard() {

    const history = useNavigate()

    const [{user}] = useStateValue()


    const [User, setUser] = useState([])

    const [UserLinks, setUserLinks] = useState([])

    useEffect(() => {

        fetchUserLinks(setUserLinks, user?.email)

        fetchUser(setUser, user?.email)

    }, [user?.email])



    const [LinkURL,setLinkURL] = useState('')
    const [NameLink,setNameLink] = useState('')


    const [Message, setMessage] = useState('')
    const [Error, setError] = useState('')



    const isLinkAlreadyExist = UserLinks.some(data => {
        if (data.name === NameLink && data.url === LinkURL) return true
    })

    const [Msg, setMsg] = useState([])
    

    function createLink() {

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






    const artcles = [
        {
            name : 'Mon compte',
            img : 'https://images.unsplash.com/photo-1664574654578-d5a6a4f447bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
            id: 'account',
            link: '/login'
        },
        {
            name : 'Link in bio',
            img : 'https://images.unsplash.com/photo-1572456606764-80a4f00cbe52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
            id: 'linkinbio'
        }
    ]

    useEffect(() => {

        if (LinkURL) {
            window.onkeydown = e => {
                if (e.key === 'Enter') {
                    createLink(LinkURL)
                }
            }
        }

    }, [LinkURL])




    return (

        <Main>
            <div className='grid gap-3rem blocks' >

                <div className='grid gap'>
                    <div className='grid gap-2rem'>
                        <div className='grid swiper' style={{overflowX: 'scroll' }}>
                            <div className='display gap-1rem transition' >
                                {
                                    artcles.map(article=> {
                                        return (
                                            <Link to={article.link} key={article.id}>
                                                <div className='display click' >
                                                    <div className='grid gap-1rem border-r-2 black' style={{width: '244px', height: '244px'}}>
                                                        <div className='grid gap-1rem border-r-2 w-100p h-100p opacity-08' id={'img-' + article.id} style={{backgroundSize: 'cover', backgroundImage: `url(${article.img})`}}></div>
                                                    </div>
                                                    <div className='display justify-c absolute' style={{width: '244px', height: '244px'}}>
                                                        <span className='f-s-20 c-white'>{article.name}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
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
                                        <button onClick={e=> createLink(LinkURL) } className='border-r-1 blue p-1 h-4 p-lr-2 border-b hover-blue' >
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
                                <span className='f-s-25 f-w-400'>Mes liens</span>
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
                            <div className='grid gap-1rem'>
                                {
                                    UserLinks.length < 1 
                                    ? <Messages loader={true} /> 
                                    : <ListLink links={UserLinks} User={User} />
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


