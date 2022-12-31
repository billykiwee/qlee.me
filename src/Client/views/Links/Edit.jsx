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
import { addToLinkInBio } from './lib/addToLinkInBio'
import { checkShortLinkAvailable } from './lib/checkShortLinkAvailable'
import { SwitchInput } from '../../../App/components/Switch'
import { formatNumber } from '../../../App/utils/formatNumber'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { SnackBar } from '../../../App/components/SnackBar'
import UniqueID from '../../../App/utils/uniqueID'
import QrCodeSection from './QrCode'
import { DeleteLink } from './functions/Delete'
import { IsLinkInBio } from './lib/IsLinkInBio'
import { EditLink } from './functions/Edit'


export default function Edit() {

    const history = useNavigate()
    const { LinkID } = useParams()

    const [{user}] = useStateValue()

    const [User, setUser] = useState({})

    const [Stats, setStats] = useState([])
    

    useEffect(e=> {
        fetchUserLinks(setUser, user?.email)
        fetchStats(setStats, LinkID)
        fetchUser(setUser, user?.email)
    }, [user, LinkID])


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


    const [editLink, seteditLink] = useState({})

  
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

                                <div className='grid gap-1rem'>

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
                                                            <IsLinkInBio Link={Link} />

                                                        </div>
                                                        <a href={'https://' + Link?.shortLink} className='f-s-20 link hover-link'>{Link?.shortLink}</a>
                                                    </div>
                                                    <div className='display justify-c gap-04'>
                                                        <EyeIcon  width={22}/>
                                                        <span className='f-s-20'>{formatNumber(Link?.views)} clics</span>
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                            <div className='display justify-c wrap gap'>
                                                <div className='grid gap'>
                                                    <Redirect to={'/stats/' + Link.id}>
                                                        <button className='grey h-3 border-r-04 p-lr-1 display gap hover'>
                                                            <PencilSquareIcon width={16} />
                                                            <span className='f-s-14'>Modifier</span>
                                                        </button>
                                                    </Redirect>
                                                </div>
                                                <div className='grid gap'>
                                                    <Redirect to={'/stats/' + Link.id}>
                                                        <button className='grey h-3 border-r-04 p-lr-1 display gap hover'>
                                                            <img src='/images/charts.svg' width={16} />
                                                            <span className='f-s-14'>Statistiques</span>
                                                        </button>
                                                    </Redirect>
                                                </div>
                                                <div className='grid gap'>
                                                    <button className='grey h-3 border-r-04 p-lr-1 display gap hover' onClick={e=> setQrCode(QrCode ? false : true)}>
                                                        <QrCodeIcon width={16} />
                                                        <span className='f-s-14'>Qr code</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <QrCodeSection 
                                        Link={Link} 
                                        QrCode={QrCode}
                                        setQrCode={setQrCode}  
                                    />

                                </div>

                                <div className='grid gap-2rem'>

                                    <div className='grid gap-1rem' >

                                        <div className='grid gap-1rem white shadow border-r-1 border p-2' >
                                            <div className='grid gap w-100p'>
                                                <span>Modifier le nom</span>
                                                <input type='text' className='div-input h-3 border-r-1 w-100p white' placeholder={Link.name} onChange={e=> seteditLink({...editLink, name : e.target.value})} />
                                                <small className='c-red' id='error-name'></small>
                                            </div>

                                            <div className='grid gap w-100p'>
                                                <div className='display gap'>
                                                    <span>Modifier le lien principal</span>
                                                    { isUserPremium(User).plan === 'FREE' && <GoToPricing /> }
                                                </div>
                                                <div 
                                                    className='display h-3 border-r-1 w-100p white'
                                                    style={ 
                                                        isUserPremium(User).plan === 'FREE' 
                                                        ? { pointerEvents: 'none', opacity: 0.8} 
                                                        : { pointerEvents: 'visible',  opacity: 1 }
                                                    } 
                                                >
                                                    <input type='text' className='div-input h-3 border-r-1 w-100p white' placeholder={Link.url} onChange={e=> seteditLink({...editLink, url : e.target.value})} />
                                                </div>
                                                <small className='c-red' id='error-url'></small>
                                            </div>

                                            <div className='grid gap w-100p'>
                                                <div className='display gap'>
                                                    <span>Modifier le lien court</span>
                                                    { isUserPremium(User).plan === 'FREE' && <GoToPricing /> }
                                                </div>
                                                <div 
                                                    className='display div-input h-3 border border-r-1 w-100p white'
                                                    style={ 
                                                        isUserPremium(User).plan === 'FREE' 
                                                        ? { pointerEvents: 'none', opacity: 0.8} 
                                                        : { pointerEvents: 'visible',  opacity: 1 }
                                                    } 
                                                >
                                                    <span className='c-blue p-l-1 p-r-04'>qlee.me/</span>
                                                    <input 
                                                        type='text' 
                                                        className='border-0 p-0 w-100p' 
                                                        placeholder='mon-lien' 
                                                        onChange={e=> {
                                                            seteditLink({
                                                                ...editLink, 
                                                                shortLink: e.target.value 
                                                            })
                                                            checkShortLinkAvailable(e.target.value, UserLinks)
                                                        }} 
                                                        pattern="\S*"
                                                        onKeyPress={event=> event.key === ' ' && event.preventDefault()}
                                                    />
                                                </div>
                                                <small id='alert-shortlink'></small>
                                            </div>
                                        </div>

                                        <div className='grid gap white shadow border-r-1 border p-2'>
                                            <div className='display gap'>
                                                <span>Fonctionnalités</span>
                                                { isUserPremium(User).plan === 'FREE' && <GoToPricing /> }
                                            </div>
                                            
                                            <div className='grid gap' 
                                                style={ 
                                                    isUserPremium(User).plan === 'FREE' 
                                                    ? { pointerEvents: 'none', opacity: 0.8} 
                                                    : { pointerEvents: 'visible',  opacity: 1 }
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
                                               !Object.values(editLink).toString().split(',').join('')
                                                ? { pointerEvents: 'none', opacity: 0.8} 
                                                : { pointerEvents: 'visible',  opacity: 1 }
                                            }
                                        >
                                            <button className='border-r-1 blue p-1 h-4 p-lr-2 border-b hover-blue' 
                                                onClick={e=> 
                                                    EditLink({
                                                        Link,
                                                        LinkID,
                                                        user,
                                                        Stats,
                                                        editLink,
                                                        seteditLink,
                                                        setMsg,
                                                        setPopUpMessage,
                                                        history,
                                                    }) 
                                                }
                                            >
                                                <span className='f-s-16'>Modifier</span>
                                            </button>
                                        </div>
                                        <div className='display'>
                                            <button className='red hover-red p-1 h-4 border-b border-r-1'
                                                onClick={e=> 
                                                    DeleteLink({
                                                        Stats,
                                                        link: Link,
                                                        setMsg: setPopUpMessage
                                                    })
                                                } 
                                            >
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
        <Redirect to='/pricing' className='display justify-c yellow border-r-100 hover-yellow p-04' style={{width : !children ? '1rem' : ''}} >
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