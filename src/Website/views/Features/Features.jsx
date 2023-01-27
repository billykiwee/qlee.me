import { ArrowDownTrayIcon, CameraIcon, ChartPieIcon, Cog6ToothIcon, DevicePhoneMobileIcon, EyeIcon, GlobeEuropeAfricaIcon, InboxIcon, PencilIcon, QrCodeIcon, RocketLaunchIcon, VideoCameraIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Link } from 'react-router-dom'
import Main from '../../../App/components/Main'
import { useStateProps } from '../../../App/provider/ContextProvider'
import getFavicon from '../../../App/utils/getFavicon'
import { GetWidth } from '../../../App/utils/GetWidth'
import Blocks from '../../../Client/views/LinkInBio/views/Edit/settings/components/Blocks'
import { ProgressBar } from '../../../Client/views/Stats/components/ProgressBar'
import { Block } from '../../../Client/views/Stats/statistics/Block'
import {makeFriendly} from '../../../App/utils/makeFriendly'
import Stats from './views/Stats'
import QRCode from 'react-qr-code'
import { MdColorLens } from 'react-icons/md'
import { useState } from 'react'
import { colors } from '../../../App/utils/generateLetterImage'
import List from '../../../Client/views/Stats/components/List'

export default function Features() {


    const width = GetWidth()



    const [qrCodeSettings, setqrCodeSettings] = useState({
        color: 'white',
        frame: {
            color: 'var(--blue)',
            active: true
        }
    })


    const links = [
        {
            name: 'Youtube',
            id  : 'link-1',
            shortLink: 'youtube'
        }
    ]

    return (
        <Main>
            <h2 className='m-0'>Fonctionnalités</h2>

            <div className='display justify-c'>

                <div className='grid gap-2rem m-t-2'>

                    <div className='grid gap white p-2 border-r-1 shadow' >
                        <div className='display gap-1rem'>
                            <h3 className='m-0'>Créer & Personaliser</h3>
                        </div>
                        <div className='grid blocks align-top gap-2rem f-w-200'>
                            <div className='grid gap-1rem p-1'>
                                <p className='f-s-18'>
                                    Créer facilement des liens URL raccourcis pour tes liens longs et encombrants et personnalise ces liens en modifiant le lien court, l'image et même l'URL principale.
                                </p>
                                <div className='display gap'>
                                    <div className='display'>
                                        <Link className='display' to='/dashboard'>
                                            <button className='blue h-3 p-1 border-r-1'>
                                                <span className='f-s-16'>Commencer</span>
                                            </button>
                                        </Link>
                                    </div>
                                    <div className='display'>
                                        <Link className='display' to='/dashboard'>
                                            <button className='display gap green h-3 w-3 p-1 border-r-2'>
                                                <VideoCameraIcon width={16} />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className='display justify-c w-100p border-r-1 overflow-hidden' >
                                <div>
                                    {
                                        links.map(link=> {
                                            return (
                                                <div    
                                                    className='display gap p-1 border-b border-r-1 hover border justify-s-b white h-2 click ' 
                                                    key={link.id} onClick={e=> setShowStat(link.id)} 
                                                >
                                                    <div className='display gap-1rem'>
                                                        <img src={getFavicon(link)} className='border-r-100' width={30} />
                                                        <div className='grid '> 
                                                            <div className='display gap-04'>
                                                                <span className='f-s-16 c-black'>{minimizeString(link.name, 20)}</span>
                                                                {/* {
                                                                    link.linkInBio &&
                                                                    <BookmarkIcon width={12} className='c-yellow' />
                                                                } */}
                                                            </div>
                                        
                                                            <div className='grid gap'>
                                                                <div className='display gap-04'>
                                                                    <small href={'https://' + link.shortLink} className='hover-link link'>{link.shortLink}</small>
                                                                    <div className='display'>
                                                                        <div className='display disable green absolute border-r-04 p-04' id={'link-' + link.id} >
                                                                            <small>Copié</small>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='display gap-1rem'>
                                                        <div className='display gap-04 opacity'>
                                                            <EyeIcon width={16} />
                                                            <small>{link.views}</small>
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
                    
                    <div className='grid gap white p-2 border-r-1 shadow' >
                        <div className='grid gap'>
                            <div className='display gap-1rem'>
                                <h3 className='m-0'>Statistiques</h3>
                            </div>
                            <div className='grid blocks align-top gap-2rem f-w-200' >
                                <div className='grid gap-1rem p-1'>
                                    <div className='grid gap'>
                                        <p className='f-s-18'>
                                            Analyse les statistiques de tes liens, comme le nombre de clics, le type d'appareil, la source du trafic, la localisation des utilisateurs et la performance.
                                        </p>
                                        <p className='f-s-18 m-t-0'>
                                            Cela te permettra de comprendre comment tes liens sont utilisés et comment tu peux améliorer leur performance.
                                        </p>
                                    </div>
                                    <div className='display gap'>
                                        <div className='display'>
                                            <Link className='display' to='/dashboard'>
                                                <button className='blue h-3 p-1 border-r-1'>
                                                    <span className='f-s-16'>Commencer</span>
                                                </button>
                                            </Link>
                                        </div>
                                        <div className='display'>
                                            <Link className='display' to='/dashboard'>
                                                <button className='display gap green h-3 w-3 p-1 border-r-2'>
                                                    <VideoCameraIcon width={16} />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <Stats />
                            </div>
                        </div>
                    </div>
                    
                    <div className='grid gap white p-2 border-r-1 shadow' >
                        <div className='display gap-1rem'>
                            <h3 className='m-0'>Qr code</h3>
                        </div>
                        <div className='grid blocks align-top gap-1rem f-w-200'>
                            <div className='grid gap-1rem p-1'>
                                <span className='f-s-18'>
                                Créer et de personnaliser des codes QR pour chaque lien. Tes liens seront encore plus accessibles pour tes utilisateurs, en leur offrant la possibilité de les scanner directement avec leur appareil mobile.
                                </span>
                                <div className='display gap'>
                                    <div className='display'>
                                        <Link className='display' to='/dashboard'>
                                            <button className='blue h-3 p-1 border-r-1'>
                                                <span className='f-s-16'>Commencer</span>
                                            </button>
                                        </Link>
                                    </div>
                                    <div className='display'>
                                        <Link className='display' to='/dashboard'>
                                            <button className='display gap green h-3 w-3 p-1 border-r-2'>
                                                <VideoCameraIcon width={16} />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className='display justify-c w-100p border-r-1 overflow-hidden' >
                                <div className='grid gap-2rem'>
                                    <div className='display justify-c'>
                                         <div className='display border-r-1 p-1' style={{ background : qrCodeSettings.color }}>
                                            <QRCode
                                                bgColor={qrCodeSettings.color}
                                                fgColor='black'
                                                className='click qr-code-svg'
                                                size={144}
                                                value={'https://qlee.me'}
                                            />
                                        </div>
                                    </div>

                                    <div className='display justify-s-a border-r-2 grey'>
                                        <div>
                                            <button className='grey border-r-100 w-3 h-3'>
                                                <span className='f-s-18'>Aa</span>
                                            </button>
                                        </div>
                                        <div>
                                            <button className='grey border-r-100 w-3 h-3' onClick={e=> setqrCodeSettings(prev=> {return {...prev, color: colors[Math.floor(Math.random() * colors.length)]}} )}>
                                                <MdColorLens size={20} className={'c-black'} />
                                            </button>
                                        </div>
                                        <div>
                                            <button className='grey border-r-100 w-3 h-3'>
                                                <InboxIcon width={20} className='c-black' />
                                            </button>
                                        </div>
                                        <div>
                                            <button className='grey border-r-100 w-3 h-3'>
                                                <ArrowDownTrayIcon width={20} className='c-black' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </Main>
    )
}
