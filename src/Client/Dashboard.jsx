import { serverTimestamp } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import Checkbox from '../App/components/Checkbox';
import Main from '../App/components/Main';
import Popup from '../App/components/Popup';
import { useStateValue } from '../App/provider/StateProvider';
import { db } from '../App/database/firebase';
import getFavicon from '../App/utils/getFavicon';
import { isValidUrl } from '../App/utils/isValidUrl';
import { minimizeString } from '../App/utils/minimizeString';
import UniqueID from '../App/utils/uniqueID';


const MAX_LINK_BEFORE_UPDATE = 10


export default function Dashboard() {

    const [{user}] = useStateValue()

    const [UserLinks, setUserLinks] = useState([])

    useEffect(e=> {

        const getUser = new Promise((resolve, reject) => {
            resolve(user?.email)
        })
    
        getUser
        .then(userEmail => {
            db.collection('links').orderBy('date').onSnapshot(snapshot => {
                setUserLinks(snapshot.docs.map(doc => doc.data()))
            })
        })
    }, [user])


    const AllUserLinks = UserLinks
        .filter(data=> data.user === user?.email)
        .map(userlinks=> userlinks)



    const [LinkURL,setLinkURL] = useState('')
    const [NameLink,setNameLink] = useState('')


    const [Message, setMessage] = useState('')
    const [Error, setError] = useState('')



    const isLinkAlreadyExist = UserLinks.some(data => {
        if (data.name === NameLink && data.url === LinkURL) return true
    })



    function createLink() {

        if (NameLink.length) {
            if (NameLink.length > 40) throw setError('Le nom doit comporté 40 charactères au maximum')
        }
        if (!isValidUrl(LinkURL)) throw setError('Tu dois rentrer une URL valide')
        if (isLinkAlreadyExist) throw setError('Un lien exitse déjà avec ce nom et cet URL')
        if (MAX_LINK_BEFORE_UPDATE <= AllUserLinks.length) {
            throw setMessage({
                title: 'Oups...',
                message: `Tu as atteints la limite de ${MAX_LINK_BEFORE_UPDATE} liens gratuits.`,
                buttonText: 'Voir les plans',
                buttonColor: 'yellow',
                valid: () => setMessage({}),
                close: () => setMessage({}),
                statu: 'error'
            })
        }
        
        const linkID = 'qlee.me/' + UniqueID('', 5)
                
        const link = {
            name     : NameLink.length < 1 ? isValidUrl(LinkURL).hostname : NameLink,
            id       : linkID.split('/')[1],
            user     : user?.email,
            url      : isValidUrl(LinkURL).href,
            shortLink: linkID,
            date     : serverTimestamp(),
            views    : 0
        }    

        db.collection('links').doc(link.id).set(link)
        .then(e=> {
            document.querySelectorAll('input').forEach(e=> e.value = '')

            setLinkURL(false)
            setNameLink(false)
        })
        .then(showPopup=> {
            setMessage({
                title: 'Bravo 🎉',
                message: `Lien crée avec succés`,
                buttonText: 'Continuer',
                buttonColor: 'blue',
                valid: () => setMessage({}),
                close: () => setMessage({}),
                statu: 'success'
            })
        })
    }    


    const artcles = [
       /*  {
            name : 'Mon compte',
            img : 'https://images.unsplash.com/photo-1664574654578-d5a6a4f447bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
            id: 'account',
            link: '/login'
        },
        {
            name : 'Link in bio',
            img : 'https://images.unsplash.com/photo-1572456606764-80a4f00cbe52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
            id: 'linkinbio'
        } */
    ]

    const TopLinks = (
        UserLinks
            .filter(isUserAuth=> isUserAuth.user === user?.email)
            .map(links=> links)
            .sort((a, b) => b.views - a.views)
            .splice(0,3)
    )






    return (

        <Main>

            <Popup content={Message} />
            
            <div className='grid gap-2rem blocks' >

                <div className='grid gap-2rem'>
                    <div className='grid swiper' style={{overflowX: 'scroll' }}>
                        <div className='display gap-1rem transition' >

                            <div className='display white border-r-2 border-b border' >
                                <div className='display w-100p' >
                                    <div className='grid gap-2rem align-top w-100p p-1'>
                                        <div className='display justify-s-b w-100p'>
                                            <span>Top liens</span>
                                            <div>
                                                <button className='blue border-b h-2 border-r-04'>
                                                    <span>Voir les stats</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className='grid gap-1rem w-100p'>
                                            {
                                                TopLinks.map(link=> {
                                                    return (
                                                        <div className='display '>
                                                            <div className='display justify-s-b w-100p'>
                                                                <div className='display justify-c gap'>
                                                                    <img src={getFavicon(link.url)} className='w-2 h-2 border-r-2' />
                                                                    <div className='grid'>
                                                                        <small>{link.views} clics</small>
                                                                        <small className='link'>{link.shortLink}</small>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <span className='link'>
                                                                        +
                                                                        {
                                                                            (((link.views - link.viewsLastWeek) / link.viewsLastWeek) * 100).toFixed(0)
                                                                        }%
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                        <div className='grid gap'>
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
                                    <button onClick={e=> createLink(LinkURL)} className='border-r-1 blue p-1 h-4 p-lr-2 border-b hover-blue' >
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

                <div className='grid gap-2rem'>

                    <div className='grid gap-1rem'>
                        <div className='grid gap'>
                            <div className='display justify-s-b'>
                                <span className='f-s-25 f-w-500'>Mes liens</span>
                                
                                <Link to='/pricing'>
                                    <div className='display gap-04 border-r-04 border-b yellow p-04 click hover-yellow'>
                                        <small className='c-black'>{AllUserLinks.length} / {MAX_LINK_BEFORE_UPDATE}</small>
                                        <div className='display justify-c'>
                                            <span className='display'>
                                                <img src='/images/lock-solid.svg' width={14} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>

                            </div>
                            {
                                AllUserLinks
                                .map(userlink=> {

                                    return (
                                        <div className='display gap p-1 border-b border-r-1 border justify-s-b white h-3' key={userlink?.id}>
                                            <div className='display gap-1rem'>
                                                <Link to={'/edit/' + userlink?.shortLink.split('/')[1]} className='display'>
                                                    <img src={getFavicon(userlink?.url)} className='w-2 h-2 border-r-100' />
                                                </Link>
                                                <div className='grid '> 
                                                    <div className='display gap'>
                                                        <span className='f-s-16'>{minimizeString(userlink?.name, 20)}</span>
                                                    </div>

                                                    <div className='grid gap'>
                                                        <div className='display gap'>
                                                            <a href={userlink?.shortLink}  rel="noopener noreferrer" className='hover-link link'>{userlink?.shortLink}</a>
                                                            <div className='display gap'>
                                                                <button 
                                                                    className='display border-r-04 w-2 hover h-2 border border-b' 
                                                                    onClick={e=> {
                                                                        navigator.clipboard.writeText(userlink?.shortLink)
                                                                        let div = document.querySelector('#link-' + userlink?.id)
                                                                        div.style.display = 'flex'
                                                                        setTimeout(e=> div.style.display = 'none', 1500)
                                                                    }} 
                                                                >
                                                                    <img src='/images/copy.svg' width={16} />
                                                                </button>
                                                                <div className='display disable green absolute border-r-04 p-04' id={'link-' + userlink?.id} >
                                                                    <small>Copié</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <Link to={'/edit/' + userlink?.id}>
                                                    <button className=' hover'>
                                                        <span className='display w-1 h-2'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                                                        </span>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }).reverse()
                            }

                        </div>
                        <div className='display justify-c'>
                            {
                                AllUserLinks.length < MAX_LINK_BEFORE_UPDATE 
                                ?
                                <div className='display gap'>
                                    <img src='/images/info.svg' className='w-1 h-1 opacity'  />
                                    <small className='c-grey f-w-300'>
                                        Il te reste encore {MAX_LINK_BEFORE_UPDATE - AllUserLinks.length} {MAX_LINK_BEFORE_UPDATE - AllUserLinks.length > 1 ? 'liens gratuits' : 'lien gratuit'}
                                    </small>
                                </div>
                                :
                                <div className='grid gap-04'>
                                    <div className='display gap'>
                                        <img src='/images/info.svg' className='w-1 h-1'  />
                                        <small className='c-red f-w-300'>Tu dois upgrade ton compte</small>
                                    </div>
                                    <div className='display justify-c'>
                                        <a className='f-w-300 link'>Voir les plans</a>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                </div>

            </div>
        </Main>
    )
}
