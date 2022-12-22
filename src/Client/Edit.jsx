import React, { useEffect, useReducer, useState } from 'react'
import { Link as Redirect, useNavigate, useParams } from 'react-router-dom'
import Container from '../App/components/Container'
import { db } from '../App/database/firebase'
import getFavicon from '../App/utils/getFavicon'
import formatDate from '../App/utils/formatDate'
import QRCode from 'react-qr-code'
import { minimizeString } from '../App/utils/minimizeString'
import { isValidUrl } from '../App/utils/isValidUrl'
import Popup, { PopUpcontent } from '../App/components/Popup'
import { useStateValue } from '../App/provider/StateProvider'
import Main from '../App/components/Main'
import Messages from '../App/utils/Messages'
import { serverTimestamp } from 'firebase/firestore'
import { downloadQRCode } from './lib/downloadQRCode'
import { fetchUserLinks } from './lib/database/fetchUserLinks'
import { getStats } from './lib/database/getStats'



export default function Edit() {

    const history = useNavigate()
    const { LinkID } = useParams()

    const [{user}] = useStateValue()


    const [User, setUser] = useState([])

    const [Stats, setStats] = useState([])

    useEffect(e=> {
        fetchUserLinks(setUser, user?.email)
        getStats(setStats, LinkID)
    }, [user])

    const isUserPremium = User.filter(e=> e.email === user?.email).map(e=> e)[0]?.plan !== 'FREE'


    const statsLink = Stats


    const [UserLinks, setUserLinks] = useState([])

    useEffect(e=> {
        db.collection('links').orderBy('date').onSnapshot(snapshot => {
            setUserLinks(snapshot.docs.map(doc => doc.data()))
        })
    }, [])



    const Link = UserLinks
        .filter(data=> data.user === user?.email && data.id === LinkID)
        .map(link=> link)[0]


    
    const [PopUpMessage, setPopUpMessage] = useState({})


    function preDeleteLink() {
        setPopUpMessage({
            title: 'Attention',
            message: 'Vous êtes sur le point de supprimer ce lien',
            question: 'Voulez-vous continuer ?',
            buttonText: 'Supprimer',
            buttonColor: 'red',
            valid: () => deleteLink(),
            close: () => setPopUpMessage({}),
            statu: 'question'
        })
    }

    function deleteLink() {

        setPopUpMessage({loader: true})

        db.collection('links').doc(Link.id).delete()
        .then(e=> {
            setPopUpMessage({loader: false})
            window.location.href = '/dashboard'
        })
    }



    const [editLink, seteditLink] = useState({})


    const [EditShortLink, setEditShortLink] = useState('')

    function EditLink() {

        if (!EditShortLink) {

            if (Object.values(editLink).length === 0) return 
    
            async function Check() {
                
                if (editLink.name) {
                    if (editLink.name.length > 40)
                    throw {id:'name', error: 'Le nom doit faire entre 0 et 40 charactères'}
                }
                if (editLink.nurlame) {
                    if (!isValidUrl(editLink.url)) 
                    throw {id:'url', error:'Tu dois rentrer une URL valide'}
                }
            }
    
            Check()
            .then(valid=> {
    
                db.collection('links').doc(Link.id).update(editLink)
    
                document.querySelector('#error-name').innerHTML = ''
                document.querySelector('#error-url').innerHTML = ''
            })
            .then(e=> {
                document.querySelectorAll('input').forEach(e=> e.value = '')
    
                seteditLink({})
    
                setPopUpMessage({
                    title: 'Modifications enregistrées',
                    message: 'Le lien à bien été modifié',
                    buttonText: 'Continuer',
                    buttonColor: 'blue',
                    valid: () => setPopUpMessage({}),
                    close: () => setPopUpMessage({}),
                    statu: 'success'
                })
            })
            .catch(e=> {
               document.querySelector('#error-'+ e.id).innerHTML = e.error
            })
        }

        else {
            db.collection('links').doc(EditShortLink).set({
                name     : Link.name,
                id       : EditShortLink,
                user     : user?.email,
                url      : Link.url,
                shortLink: 'qlee.me/' + EditShortLink,
                date     : serverTimestamp(),
                views    : Link.views
            })
            .then(addStat=> {
                if (statsLink[0])  
                    db.collection('links').doc(EditShortLink).collection('stats').add(statsLink[0])
            })
            .then(deleteOldStat=> {

                for (const v in statsLink) {
                    db.collection('links').doc(Link.id).collection('stats').doc(statsLink[v]?.id).delete()
                }
            })
            .then(deleteOldID=> {
                db.collection('links').doc(Link.id).delete()
            })
            .then(popup=> {
                document.querySelectorAll('input').forEach(e=> e.value = '')
    
                setEditShortLink('')
    
                setPopUpMessage({
                    title: 'Modifications enregistrées',
                    message: 'Le lien à bien été modifié',
                    buttonText: 'Continuer',
                    buttonColor: 'blue',
                    valid: () => setPopUpMessage({}),
                    close: () => setPopUpMessage({}),
                    statu: 'success'
                })
            })
            .then(redirect=> {
                history('/edit/' + EditShortLink)
            })
        }

    }
    

    function checkShortLinkAvailable(input) {
        const divAlert = document.querySelector('#alert-shortlink')


        if (input.length) {

            let isIDExist = UserLinks.filter(link=> link.id === input)[0]

            if (!isIDExist) {
                divAlert.style.color = 'var(--green)'
                divAlert.innerHTML = `Le lien court "${input}" est disponible`
            }

            else {
                divAlert.style.color = 'var(--red)'
                divAlert.innerHTML = `Le lien court "${input}" n'est pas disponible`
            }

        }
        else divAlert.innerHTML = ''

    } 
  



    const [QrCode,setQrCode] = useState(false)
    


    if (PopUpMessage?.loader) return <Messages loader={PopUpMessage?.loader}/>
    return (

        <>
        {
            PopUpMessage?.loader
            ? <Messages loader={PopUpMessage?.loader}/>
            :
            <Main>
                <Popup content={PopUpMessage} />
                <div className='display'>
                    <h2>Modifier le lien</h2>
                </div>

                <div>
                    {
                        Link &&
                        <div className='grid gap-2rem' key={Link.id}>

                            <div className='grid blocks gap-2rem'>

                                <div className='grid gap'>

                                    <div className='display align-top'>
                                        <div className='grid gap-1rem justfy-s-b border-r-2 border border-b p-1 white w-100p'>
                                            <div className='grid gap'>
                                                <div className='display justify-c'>
                                                    <img src={getFavicon(Link?.url)} width={88} className='border-r-100' /> 
                                                </div>
                                                <div className='grid text-align-c'>
                                                    <span className='f-s-20'>{Link?.name}</span>
                                                    <a href={'https://' + Link?.shortLink} className='f-s-20 link hover-link'>{Link?.shortLink}</a>
                                                </div>
                                            </div>
                                            <div className='display justify-c'>
                                                <div className='grid gap'>
                                                    <div className='display'>
                                                        <Redirect to={'/stats/' + Link.id}>
                                                            <button className='grey hover h-3 border-r-04 p-lr-1 display gap'>
                                                                <img src='/images/charts.svg' width={20} />
                                                                <span className='f-s-16'>Statistiques</span>
                                                            </button>
                                                        </Redirect>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className='display align-top'>
                                        <div className='grid justify-c gap white border-r-1 border-b p-1 w-100p'>
                                            <div className='display justify-s-b'>
                                                <div className='display gap'>
                                                    <div className='display p-04 border-r-04 border shadow click' onClick={e=> setQrCode(Link.url)}>
                                                        <QRCode
                                                            onClick={e=> setQrCode(Link.shortLink)}
                                                            bgColor='white'
                                                            fgColor='black'
                                                            className='w-2 h-2'
                                                            value={Link.shortLink}
                                                        />
                                                    </div>
                                                    <div className='grid'>
                                                        <span>Qr code</span>
                                                    </div>
                                                </div>
                                                <div className='display gap'>
                                                    <button className='border-b h-2 blue hover-blue p-1 border-r-1 border' onClick={e=> setQrCode(QrCode ===true ? false : true)} >
                                                        <span className='display'>{QrCode ? 'Ok' : 'Voir'}</span>
                                                    </button>
                                                    <button className='border-b white hover w-40 h-40 p-1 border-r-04 border' onClick={e=> downloadQRCode(Link.url)} >
                                                        <span className='display'>
                                                            <img src='/images/dowload.svg' width={20} height={20} />
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                            {
                                                QrCode &&
                                                <div className='display w-100p justify-c'>
                                                    <div className='display white border-r-2 p-2 border border-b gap-1rem'>
                                                        <QRCode
                                                            id="qr-code-svg"
                                                            bgColor={'white'}
                                                            fgColor={'black'}
                                                            className='click'
                                                            level='H'
                                                            size={200}
                                                            value={Link.shortLink}
                                                        />
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>

                                </div>

                                <div className='grid gap-2rem'>
                                    <div className='grid gap-1rem'>
                                        <div className='grid gap-04 w-100p'>
                                            <span>Modifier le nom</span>
                                            <input type='text' className='div-input h-3 border-r-1 w-100p white' placeholder={Link.name} onChange={e=> seteditLink({...editLink, name : e.target.value})} />
                                            <small className='c-red' id='error-name'></small>
                                        </div>
                                        <div className='grid gap-04 w-100p'>
                                            <span>Modifier le lien principal</span>
                                            <input type='text' className='div-input h-3 border-r-1 w-100p white' placeholder={Link.url} onChange={e=> seteditLink({...editLink, url : e.target.value})} />
                                            <small className='c-red' id='error-url'></small>
                                        </div>

                                        {
                                            !isUserPremium
                                            ?
                                            <>
                                                <div className='grid gap-04 w-100p'>
                                                    <div className='display gap'>
                                                        <span>Modifier le lien court</span>
                                                        <GoToPricing />
                                                    </div>
                                                    <div className='opacity no-click'>
                                                        <input type='text' className='div-input h-3 border-r-1 w-100p ' placeholder={Link.shortLink} onChange={e=> seteditLink({...editLink, shortLink : e.target.value})} />
                                                        <small className='c-grey'>ex: loop.me/mon-lien-perso</small>
                                                    </div>
                                                </div>
                                                <div className='grid gap-04'>
                                                    <div className='display gap'>
                                                        <span>Fonctionnalités</span>
                                                        <GoToPricing />
                                                    </div>

                                                    <div className='grid gap-04 opacity no-click'>
                                                        <div className='display'>
                                                            <label htmlFor='active_views' className='display gap click'>
                                                                <input type='checkbox' className='h-1' id='active_views' />
                                                                <span className='f-w-300'>Ajouter a mon link in bio</span>
                                                            </label>
                                                        </div>

                                                        <div className='display no-click'>
                                                            <label htmlFor='active_adds' className='display gap click'>
                                                                <input type='checkbox' className='h-1' id='active_adds' />
                                                                <span className='f-w-300'>Activer la monétisation</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className='grid gap-04 w-100p'>
                                                    <div className='display gap'>
                                                        <span>Modifier le lien court</span>
                                                    </div>
                                                    <div className='display'>
                                                        <span className='c-blue'>{Link.shortLink.split('/')[0]}/</span>
                                                        <input 
                                                            type='text' 
                                                            className='div-input h-3 border-r-1 w-100p white' 
                                                            placeholder={Link.id} 
                                                            onChange={e=> {
                                                                setEditShortLink(e.target.value)
                                                                checkShortLinkAvailable(e.target.value)
                                                            }} 
                                                            pattern="\S*"
                                                            onKeyPress={event=> {
                                                                if (event.key === ' ') {
                                                                    event.preventDefault();
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <small id='alert-shortlink'></small>
                                                </div>
                                                <div className='grid gap-04'>
                                                    <div className='display gap'>
                                                        <span>Fonctionnalités</span>
                                                    </div>

                                                    <div className='grid gap-04'>
                                                        <div className='display'>
                                                            <label htmlFor='active_views' className='display gap click'>
                                                                <input type='checkbox' className='h-1' id='active_views' />
                                                                <span className='f-w-300'>Ajouter a mon link in bio</span>
                                                            </label>
                                                        </div>

                                                        <div className='display'>
                                                            <label htmlFor='active_adds' className='display gap click'>
                                                                <input type='checkbox' className='h-1' id='active_adds' />
                                                                <span className='f-w-300'>Activer la monétisation</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>

                                        }
                                    </div>


                                    <div className='grid gap'>
                                        <div className='display'>
                                            <button className='border-r-1 blue p-1 h-4 p-lr-2 border-b hover-blue' onClick={EditLink} >
                                                <span className='f-s-16'>Modifier</span>
                                            </button>
                                        </div>
                                        <div className='display'>
                                            <button className='red hover-red p-1 h-4 border-b border-r-1' onClick={preDeleteLink} >
                                                <span className='f-s-16'>Supprimer le lien</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>   


                        </div>
                    }
                </div>
            </Main>
            }

        </>

    )
}


function GoToPricing() {
    return (
        <Redirect to='/pricing'>
            <div className='display click'>
                <div className='display justify-c yellow border-r-04 border-b hover-yellow w-1 p-04'>
                    <span className='display'>
                        <img src='/images/lock-solid.svg' width={14} />
                    </span>
                </div>
            </div>
        </Redirect>
    )
}