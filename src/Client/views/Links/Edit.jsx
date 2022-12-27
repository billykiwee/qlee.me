import React, { useEffect, useReducer, useState } from 'react'
import { Link as Redirect, useNavigate, useParams } from 'react-router-dom'
import { db, storage } from '../../../App/database/firebase'
import getFavicon from '../../../App/utils/getFavicon'
import formatDate from '../../../App/utils/formatDate'
import QRCode from 'react-qr-code'
import { minimizeString } from '../../../App/utils/minimizeString'
import { isValidUrl } from '../../../App/utils/isValidUrl'
import Popup, { PopUpcontent } from '../../../App/components/Popup'
import { useStateValue } from '../../../App/provider/StateProvider'
import Main from '../../../App/components/Main'
import Messages from '../../../App/utils/Messages'
import { serverTimestamp } from 'firebase/firestore'
import { download } from '../../lib/htmlToImage/download'
import { fetchUserLinks } from '../../lib/database/fetchUserLinks'
import { fetchStats } from '../../lib/database/fetchStats'
import { isUserPremium } from '../../../Admin/settings/isPremium'
import { fetchUser } from '../../lib/database/fetchUser'
import { uploadPhoto } from '../../lib/database/upload/uploadPhoto'
import { deleteObject, ref } from 'firebase/storage'
import { BookmarkIcon, EyeIcon, QrCodeIcon } from '@heroicons/react/24/solid'
import { addToLinkInBio } from './functions/addToLinkInBio'
import { checkShortLinkAvailable } from '../Links/functions/checkShortLinkAvailable'
import { SwitchInput } from '../../../App/components/Switch'
import { formatNumber } from '../../../App/utils/formatNumber'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { SnackBar } from '../../../App/components/SnackBar'
import UniqueID from '../../../App/utils/uniqueID'


export default function Edit() {

    const history = useNavigate()
    const { LinkID } = useParams()

    const [{user}] = useStateValue()


    const [User, setUser] = useState([])

    const [Stats, setStats] = useState([])

    useEffect(e=> {
        fetchUserLinks(setUser, user?.email)
        fetchStats(setStats, LinkID)

        fetchUser(setUser, user?.email)
    }, [user])


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
    const [Msg, setMsg] = useState([])

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
        .then(deletePhoto=> {
            if (Link.icon) {
                let refPhoto = ref(storage, `links/favicon/${Link.id}`)
                deleteObject(refPhoto)
            }
        })
        .then(e=> {
            setPopUpMessage({loader: false})
            history('/dashboard')
        })
    }


    const [editLink, seteditLink] = useState({})


    const [EditShortLink, setEditShortLink] = useState('')

    function EditLink() {

        if (!EditShortLink) {

            if (Object.values(editLink).length === 0) return 
    
            async function Check(editLink) {

                if (editLink.name) {
                    if (editLink.name.length > 40)
                    throw { id:'name', error: 'Le nom doit faire entre 0 et 40 charactères' }
                }
                if (editLink.url) {
                    if (!isValidUrl(editLink.url)) 
                    throw { id:'url', error:'Tu dois rentrer une URL valide' }
                }
            }
    
            Check(editLink)
            .then(valid=> {
    
                db.collection('links').doc(Link.id).update(editLink)
    
                document.querySelector('#error-name').innerHTML = ''
                document.querySelector('#error-url').innerHTML = ''
            })
            .then(e=> {
                document.querySelectorAll('input').forEach(e=> e.value = '')
    
                seteditLink({})
    
                setMsg({
                    id: UniqueID('m-', 5),
                    text: 'Modifications enregistrées 🎉',
                    subtext: 'Le lien à bien été modifié',
                    status: 'success'
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

                for (const v in statsLink) {
                    db.collection('links').doc(EditShortLink).collection('stats').doc(statsLink[v].id).set(statsLink[v])
                }
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
                                                    <div className='edit-image-link'>
                                                        <img src={getFavicon(Link)} width={80} height={80} className='border-r-100' /> 
                                                        <div className='display justify-c border-r-100 white shadow border hover-white absolute click p-04' onClick={e=> document.querySelector('#upload-img').click()}  > 
                                                            <PencilSquareIcon width={16} />
                                                            <input 
                                                                type='file' 
                                                                hidden 
                                                                id='upload-img' 
                                                                onChange={input => { uploadPhoto(input, LinkID) }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='grid gap-1rem text-align-c'>
                                                    <div className='grid'>
                                                        <div className='display justify-c gap'>
                                                            <span className='f-s-20'>{Link?.name}</span>
                                                            {
                                                                Link.linkInBio &&
                                                                <BookmarkIcon width={12} className='c-yellow' />
                                                            }
                                                        </div>
                                                        <a href={'https://' + Link?.shortLink} className='f-s-20 link hover-link'>{Link?.shortLink}</a>
                                                    </div>
                                                    <div className='display justify-c gap-04'>
                                                        <EyeIcon  width={22}/>
                                                        <span className='f-s-20'>{formatNumber(Link?.views)} clics</span>
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                            <div className='display justify-c'>
                                                <div className='grid gap w-100p'>
                                                    <Redirect to={'/stats/' + Link.id}>
                                                        <button className='grey h-3 border-r-04 p-lr-1 display gap hover'>
                                                            <img src='/images/charts.svg' width={20} />
                                                            <span className='f-s-16'>Statistiques</span>
                                                        </button>
                                                    </Redirect>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className='display align-top'>
                                        <div className='grid justify-c gap white border-r-1 border-b p-1 w-100p'>
                                            <div className='display justify-s-b'>
                                                <div className='display gap'>
                                                    <QrCodeIcon width={22} />
                                                    <div className='grid'>
                                                        <span>Qr code</span>
                                                    </div>
                                                </div>
                                                <div className='display gap'>
                                                    {
                                                        QrCode &&
                                                        <button className='border-b white hover h-3 p-1 border-r-1 border display gap' onClick={e=> download(Link.name)} >
                                                            <span className='c-black f-s-16'>Télécharger</span>
                                                            <img src='/images/dowload.svg' width={20} height={20} />
                                                        </button>
                                                    }
                                                    <button className='border-b h-3 blue hover-blue p-1 border-r-1 border' onClick={e=> setQrCode(QrCode === true ? false : true)} >
                                                        <span className='f-s-16'>{QrCode ? '-' : 'voir'}</span>
                                                    </button>
                                                </div>
                                            </div>
                                            {
                                                QrCode &&
                                                <div className='display w-100p justify-c m-t-2'>
                                                    <div className='grid gap-1rem blue border-r-2 p-1 border-b gap-1rem' id='qr-code-img'>
                                                        <div className='display white p-1 border-r-1'>
                                                            <QRCode
                                                                bgColor='white'
                                                                fgColor='black'
                                                                className='click qr-code-svg'
                                                                level='H'
                                                                size={200}
                                                                value={Link.shortLink}
                                                            />
                                                        </div> 
                                                        <div className='display justify-c'>
                                                            <span className='f-s-2rem' contentEditable>Qlee me</span>  
                                                        </div> 
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>

                                </div>

                                <div className='grid gap-2rem'>

                                    <div className='grid gap-1rem' >
                                        <div className='grid gap w-100p'>
                                            <span>Modifier le nom</span>
                                            <input type='text' className='div-input h-3 border-r-1 w-100p white' placeholder={Link.name} onChange={e=> seteditLink({...editLink, name : e.target.value})} />
                                            <small className='c-red' id='error-name'></small>
                                        </div>
                                        <div className='grid gap w-100p'>
                                            <span>Modifier le lien principal</span>
                                            <input type='text' className='div-input h-3 border-r-1 w-100p white' placeholder={Link.url} onChange={e=> seteditLink({...editLink, url : e.target.value})} />
                                            <small className='c-red' id='error-url'></small>
                                        </div>

                                        <div className='grid gap w-100p'>
                                            <div className='display gap'>
                                                <span>Modifier le lien court</span>
                                                {
                                                    isUserPremium(User).plan === 'FREE' &&
                                                    <GoToPricing />
                                                }
                                            </div>
                                            <div 
                                                className='display div-input h-3 border border-r-1 w-100p white'
                                                style={ 
                                                    isUserPremium(User).plan === 'FREE' ? 
                                                    {
                                                        opacity : 0.4,
                                                        pointerEvents: 'none'
                                                    }
                                                    : 
                                                    {
                                                        opacity : 1,
                                                        pointerEvents: 'visible'
                                                    }
                                                } 
                                            >
                                                <span className='c-blue p-l-1 p-r-04'>{Link.shortLink.split('/')[0]}/</span>
                                                <input 
                                                    type='text' 
                                                    className='border-0 p-0' 
                                                    placeholder={Link.id} 
                                                    onChange={e=> {
                                                        setEditShortLink(e.target.value)
                                                        checkShortLinkAvailable(e.target.value, UserLinks)
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


                                        <div className='grid gap'>
                                            <div className='display gap'>
                                                <span>Fonctionnalités</span>
                                                {
                                                    isUserPremium(User).plan === 'FREE' &&
                                                    <GoToPricing />
                                                }
                                            </div>
                                            
                                            <div className='grid gap' 
                                                style={ 
                                                    isUserPremium(User).plan === 'FREE' ? 
                                                    {
                                                        opacity : 0.4,
                                                        pointerEvents: 'none'
                                                    }
                                                    : 
                                                    {
                                                        opacity : 1,
                                                        pointerEvents: 'visible'
                                                    }
                                                } 
                                            >
                                                <div className='display'>
                                                    <label htmlFor='active_views' className='display gap-1rem click'>
                                                        <SwitchInput dimension={0.8} checked={Link.linkInBio ? true : false} onChange={e=> addToLinkInBio(e.target.checked, LinkID) } id='active_views'  />
                                                        <span className='f-w-300'>Ajouter a mon link in bio</span>
                                                    </label>
                                                </div>

                                                <div className='display'>
                                                    <label htmlFor='active_adds' className='display gap-1rem click'>
                                                        <SwitchInput dimension={0.8} id='active_adds' />
                                                        <span className='f-w-300'>Activer la monétisation</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='grid gap'>
                                        <div 
                                            className='display' 
                                            style={ 
                                                Object.values(editLink).filter(e=> e !== '').length < 1 && !EditShortLink 
                                                ? {pointerEvents: 'none', opacity: 0.8} 
                                                : {pointerEvents: 'visible', opacity: 1}}
                                            >
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


                <SnackBar content={Msg} setMsg={setMsg} />
            </Main>
            }

        </>

    )
}


export function GoToPricing({children}) {
    return (
        <Redirect to='/pricing' className='yellow border-r-04 border-b hover-yellow p-04' style={{width : !children ? '1rem' : ''}}>
            <div className='display justify-c gap'>
                {
                    children
                }
                <div className='display click'>
                    <div className='display justify-c'>
                        <span className='display'>
                            <img src='/images/lock-solid.svg' width={14} />
                        </span>
                    </div>
                </div>
            </div>
        </Redirect>
    )
}