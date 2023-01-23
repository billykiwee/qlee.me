import React, { useState } from 'react'
import { Link as Redirect, useNavigate, useParams } from 'react-router-dom'
import { isUserPremium } from '../../../../../Admin/settings/isPremium'
import { ChartPieIcon, ChatBubbleLeftIcon, ChatBubbleOvalLeftEllipsisIcon, EyeIcon, MegaphoneIcon, PencilIcon, QrCodeIcon, TrashIcon } from '@heroicons/react/24/solid'

import { checkShortLinkAvailable } from '../../lib/checkShortLinkAvailable'
import { SwitchInput } from '../../../../../App/components/Switch'
import { formatNumber } from '../../../../../App/utils/formatNumber'
import QrCodeSection from '../QrCode/QrCode'
import { DeleteLink } from '../../functions/Delete'
import { IsLinkInBio } from './components/IsLinkInBio'
import { EditLink } from '../../functions/Edit'
import Main from '../../../../../App/components/Main'
import { useStateProps } from '../../../../../App/provider/ContextProvider'
import { addtoLinkInBio } from '../../../LinkInBio/functions/add'
import LinkIcon from './components/LinkIcon'



export default function Edit() {

    const { user, snackBar, popUp } = useStateProps()

    const history = useNavigate()
    const { LinkID } = useParams()

    const User = user?.profil

    const UserLinks = user?.links 

    const stats = () => {
        if (UserLinks.length === 0) return 
        return UserLinks.filter(e=> e.LinkID === LinkID)
    }
    const Stats = stats()
    

    const Link = UserLinks
    .filter(data=> data.user === User.email && data.id === LinkID)
    .map(link=> link)[0]



    const [editLink, seteditLink] = useState({})

    const [QrCode, setQrCode] = useState(false)
    const [navSelected, setNavSelected] = useState('edit')

    return (
        <Main>
   
            <div className='grid'>
                <h2 className='m-0'>Modifier le lien</h2>
            </div>

            {
                Link &&
                <div className='grid gap-2rem m-t-1' key={Link.id}>

                    <div className='grid blocks gap-1rem'>

                        <div className='grid gap-1rem'>
                            <div className='display align-top'>
                                <div className='grid gap-1rem justfy-s-b border-r-1 border p-1 white w-100p'>
                                    <div className='grid gap'>
                                    
                                        <LinkIcon upload={{ Link }} />

                                        <div className='grid gap-1rem text-align-c'>
                                            <div className='grid'>
                                                <div className='display justify-c gap'>
                                                    <span className='f-s-20'>{Link?.name}</span>
                                                    <IsLinkInBio Link={Link} />
                                                </div>
                                                <a href={'https://' + Link?.shortLink} className='f-s-20 link hover-link'>{Link?.shortLink}</a>
                                            </div>
                                            <div className='display justify-c gap-04'>
                                                <EyeIcon width={22} />
                                                <span className='f-s-20'>{formatNumber(Stats.length)} clics</span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <nav className='display justify-c wrap gap'>
                                        <div className='grid gap'>
                                            <button className='grey h-3 w-3 border-r-2 p-lr-1 display gap hover' onClick={e=> setNavSelected('edit')} 
                                                style={ navSelected === 'edit' ? { 
                                                    background : 'var(--blue-secondary)' ,
                                                    color: 'var(--blue)'
                                                } : null}
                                            >
                                                <PencilIcon width={24} />
                                            </button>
                                        </div>
                                        <div className='grid gap'>
                                            <button className='grey h-3 w-3 border-r-2 p-lr-1 display gap hover' onClick={e=> setNavSelected('qr-code')}
                                                style={ navSelected === 'qr-code' ? { 
                                                    background : 'var(--blue-secondary)' ,
                                                    color: 'var(--blue)'
                                                } : null}
                                            >
                                                <QrCodeIcon width={24} />
                                            </button>
                                        </div>
                                        <div className='grid gap'>
                                            <Redirect to={'/stats/' + Link.id}>
                                                <button className='grey h-3 w-3 border-r-2 p-lr-1 display gap hover'>
                                                    <ChartPieIcon width={24} />
                                                </button>
                                            </Redirect>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        

                        {

                            navSelected === 'qr-code' ?
                                <QrCodeSection 
                                    Link={Link} 
                                    setQrCode={setQrCode}  
                                />
                            :
                            <div className='grid gap-1rem'>

                                <div className='grid gap-1rem' >

                                    <div className='grid gap-1rem white shadow border-r-1 border p-2' >
                                        <div className='grid gap w-100p'>
                                            <span>Modifier le nom</span>
                                            <input type='text' className='div-input h-4 border-r-1 w-100p grey' placeholder={Link.name} onChange={e=> seteditLink({...editLink, name : e.target.value})} />
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
                                                <input type='text' className='div-input h-4 border-r-1 w-100p grey' placeholder={Link.url} onChange={e=> seteditLink({...editLink, url : e.target.value})} />
                                            </div>
                                            <small className='c-red' id='error-url'></small>
                                        </div>

                                        <div className='grid gap w-100p'>
                                            <div className='display gap'>
                                                <span>Modifier le lien court</span>
                                                { isUserPremium(User).plan === 'FREE' && <GoToPricing /> }
                                            </div>
                                            <div 
                                                className='display div-input h-4 border-r-1 w-100p grey'
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
                                            {/* { isUserPremium(User).plan === 'FREE' && <GoToPricing /> } */}
                                            <div className='display justify-c green border-r-04 p-04 h-1 gap-04'>
                                                <ChatBubbleLeftIcon width={14} className='c-white' />
                                                <small>Bientôt disponible</small>
                                            </div>
                                        </div>
                                        
                                        <div className='grid gap opacity' 
                                            style={ 
                                            /*  isUserPremium(User).plan === 'FREE' 
                                                ? { pointerEvents: 'none', opacity: 0.8} 
                                                : { pointerEvents: 'visible',  opacity: 1 } */
                                                { pointerEvents: 'none', opacity: 0.8 }
                                            } 
                                        >
                                            <div className='display'>
                                                <label htmlFor='active_views' className='display gap-1rem click'>
                                                    <SwitchInput dimension={0.8} checked={Link.linkInBio ? true : false} onChange={e=> addtoLinkInBio(e.target.checked, LinkID, User, UserLinks.filter(e=> e.linkInBio), Link) } id='active_views'  />
                                                    <span className='f-w-300'>Ajouter a mon link in bio</span>
                                                </label>
                                            </div>

                                            <div className='display gap'>
                                                <label htmlFor='active_adds' className='display gap-1rem click'>
                                                    <SwitchInput dimension={0.8} id='active_adds' />
                                                    <span className='f-w-300'>Activer la monétisation</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className='grid gap-1rem'>
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
                                                    User,
                                                    Stats,
                                                    editLink,
                                                    seteditLink,
                                                    snackBar,
                                                    popUp,
                                                    history,
                                                }) 
                                            }
                                        >
                                            <span className='f-s-16'>Modifier</span>
                                        </button>
                                    </div>
                                    <div className='display justify-c'>
                                        <div className='display justify-c gap click red-secondary p-1 h-1 border-r-1'
                                            onClick={e=> 
                                                DeleteLink({
                                                    Stats,
                                                    link: Link,
                                                    snackBar,
                                                    popUp,
                                                    history
                                                })
                                            } 
                                        >
                                            <TrashIcon width={16} className='c-red' />
                                            <span className='f-s-16 c-red'>Supprimer le lien</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        }

                    </div>   


                </div>
            }

        </Main>

    )
}


export function GoToPricing({children}) {
    return (
        <Redirect to='/pricing' className='display justify-c yellow border-r-100 hover-yellow p-04 h-1 w-1 hover-yellow' style={{width : !children ? '1rem' : ''}} >
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