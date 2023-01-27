import { ArrowDownTrayIcon, CameraIcon, ChartPieIcon, Cog6ToothIcon, DevicePhoneMobileIcon, EyeIcon, GlobeEuropeAfricaIcon, InboxIcon, PencilIcon, QrCodeIcon, RocketLaunchIcon, VideoCameraIcon } from '@heroicons/react/24/solid'
import React, { useEffect } from 'react'
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
import { minimizeString } from '../../../App/utils/minimizeString'
import { useGetTheme } from '../../../App/functions/setTheme'

export default function Features() {


    const width = GetWidth()
    const theme = useGetTheme()


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
            shortLink: 'youtube',
            url: 'https://cdn-icons-png.flaticon.com/512/3670/3670147.png'
        },
        {
            name: 'Instagram',
            id  : 'link-2',
            shortLink: 'instagtam',
            url: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png'
        }
        ,
        {
            name: 'My Tiktok',
            id  : 'link-3',
            shortLink: 'tiktok',
            url: 'https://vialmtv.tv/wp-content/uploads/2022/04/tik-tok.webp'
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
                            <div className='display justify-c  w-100p' >
                                <div className='grid gap-1rem w-100p'>
                                    <div className='display gap p-1 border-b border-r-1 border justify-s-b h-2 click' style={{ background : theme === 'light' ? 'var--(black)' : 'var(--grey)' }} >
                                        <div className='display gap-1rem'>
                                            <img src={'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg'} className='border-r-100' width={30} height={30} />
                                            <div className='grid '> 
                                                <div className='display gap-04'>
                                                    <WriteWord color={theme === 'light'? 'black' : 'white' } />
                                                </div>
                            
                                                <div className='grid gap'>
                                                    <div className='display gap-04'>
                                                        <small href={'https://' + ''} className='hover-link link'>{'qlee.me/myPlaylist'}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        links
                                        .map(link=> {
                                            return (
                                                <div className='display gap p-1 border-b border-r-1 border justify-s-b h-2 click' key={link.id} style={{ background : theme === 'light' ? 'var--(black)' : 'var(--grey)' }}>
                                                    <div className='display gap-1rem'>
                                                        <img src={link.url} className='border-r-100' width={30} height={30} />
                                                        <div className='grid '> 
                                                            <div className='display gap-04'>
                                                                <span className='f-s-16' style={{ color: theme === 'light'? 'black' : 'white' }} >{minimizeString(link.name, 20)}</span>
                                                            </div>
                                        
                                                            <div className='grid gap'>
                                                                <div className='display gap-04'>
                                                                    <small href={'https://' + link.shortLink} className='hover-link link'>{'qlee.me/' + link.shortLink}</small>
                                                                </div>
                                                            </div>
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
                                    <p className='f-s-18'>
                                        Analyse les statistiques pour comprendre comment tes liens sont utilisés par tes visiteurs et comment tu peux améliorer leur performance.
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
                                <Stats />
                            </div>
                        </div>
                    </div>
                    
                    <div className='grid gap white p-2 border-r-1 shadow' >
                        <div className='display gap-1rem'>
                            <h3 className='m-0'>Qr code</h3>
                        </div>
                        <div className='grid blocks align-top gap-2rem f-w-200'>
                            <div className='grid gap-2rem p-1'>
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


const WriteWord = ({color}) => {
    
        
    const [wordWrited, setWordWrited] = useState('Spotify')

    const word = ['My playlist', 'Music']

    useEffect(e=> {
        setInterval(e=> {
            setWordWrited(word[Math.floor(Math.random() * word.length)])
        }, 1600)

    }, [])

    if (wordWrited)
    return (
        <div class="typewriter">
            <span style={{color : color}}>{wordWrited}</span>
        </div>
    )
}



