import { CameraIcon, ChartPieIcon, Cog6ToothIcon, DevicePhoneMobileIcon, EyeIcon, GlobeEuropeAfricaIcon, PencilIcon, QrCodeIcon, RocketLaunchIcon, VideoCameraIcon } from '@heroicons/react/24/solid'
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

export default function Features() {


    const width = GetWidth()


    return (
        <Main>
            <h2 className='m-0'>Fonctionnalités</h2>

            <div className='display justify-c'>

                <div className='grid gap-2rem m-t-2'>

                    <div className='grid gap white p-2 border-r-1 shadow' >
                        <div className='display gap-1rem'>
                            <h3 className='m-0'>Créer & Personaliser</h3>
                        </div>
                        <div className='grid blocks align-top gap-1rem f-w-200'>
                            <div className='grid gap-1rem p-1'>
                                <span className='f-s-18'>
                                    Créer facilement des liens URL raccourcis pour tes liens longs et encombrants et personnalise ces liens en modifiant le lien court, l'image et même l'URL principale.
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
                                <img width={'80%'} height='100%' src='/images/myplaylist.svg' />
                            </div>
                        </div>
                    </div>
                    
                    <div className='grid gap white p-2 border-r-1 shadow' >
                        <div className='grid gap'>
                            <div className='display gap-1rem'>
                                <h3 className='m-0'>Statistiques</h3>
                            </div>
                            <div className={width < 780 ? 'grid' : 'display' + ' align-top gap-1rem f-w-200'} >
                                <div className='grid gap-1rem p-1'>
                                    <span className='f-s-18'>
                                    Analyse les statistiques de tes liens, comme le nombre de clics, le type d'appareil, la source du trafic, la localisation des utilisateurs et la performance. Cela te permettra de comprendre comment tes liens sont utilisés et comment tu peux améliorer leur performance.
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
                                <div className='display justify-c border-r-1 w-100p' >

                                    <div className='grid gap-1rem w-100p'>
                                    
                                        <div className='display justify-s-b p-1 border-r-1 grey'>
                                            <div className='display gap'>
                                                <EyeIcon width={20} className='c-black' />
                                                <span>Clics</span>
                                            </div>
                                            <div>
                                                <span>9 838</span>
                                            </div>
                                        </div>

                                        <div className='grid gap-1rem justify-s-b p-1 border-r-1 grey'>
                                            <div className='display gap'>
                                                <DevicePhoneMobileIcon width={20} className='c-black' />
                                                <span>Appareil</span>
                                            </div>

                                            <div className='grid gap'>
                                                <div className='display  justify-s-b'>
                                                    <div className='display gap'>
                                                        <span>Mobile</span>
                                                        <small className='c-grey'>{makeFriendly(8559)}</small>
                                                    </div>
                                                    <ProgressBar percentage={87} />
                                                </div>
                                                <div className='display  justify-s-b'>
                                                    <div className='display gap'>
                                                        <span>Ordinateur</span>
                                                        <small className='c-grey'>{makeFriendly(1279)}</small>
                                                    </div>
                                                    <ProgressBar percentage={13} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='grid gap-1rem justify-s-b p-1 border-r-1 grey'>
                                            <div className='display gap'>
                                                <GlobeEuropeAfricaIcon width={20} className='c-black' />
                                                <span>Source du trafic</span>
                                            </div>

                                            <div className='grid gap'>
                                                <div className='display  justify-s-b'>
                                                    <div className='display gap'>
                                                        <img src={getFavicon('www.instagram.com')} className='border-r-100' width={14} />
                                                        <span>Instagram</span>
                                                        <small className='c-grey'>{makeFriendly(4328)}</small>
                                                    </div>
                                                    <ProgressBar percentage={44} />
                                                </div>
                                                <div className='display  justify-s-b'>
                                                    <div className='display gap'>
                                                        <img src={getFavicon('www.facebook.com')} className='border-r-100' width={14} />
                                                        <span>Facebook</span>
                                                        <small className='c-grey'>{makeFriendly(2754)}</small>
                                                    </div>
                                                    <ProgressBar percentage={28} />
                                                </div>
                                                <div className='display  justify-s-b'>
                                                    <div className='display gap'>
                                                        <img src={getFavicon('www.youtube.com')} className='border-r-100' width={14} />
                                                        <span>Youtube</span>
                                                        <small className='c-grey'>{makeFriendly(1869)}</small>
                                                    </div>
                                                    <ProgressBar percentage={19} />
                                                </div>
                                                <div className='display  justify-s-b'>
                                                    <div className='display gap'>
                                                        <img src={getFavicon('www.twitch.com')} className='border-r-100' width={14} />
                                                        <span>Twitch</span>
                                                        <small className='c-grey'>{makeFriendly(885)}</small>
                                                    </div>
                                                    <ProgressBar percentage={9} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='grid gap-1rem justify-s-b p-1 border-r-1 grey'>
                                            <div className='display gap'>
                                                <GlobeEuropeAfricaIcon width={20} className='c-black' />
                                                <span>Localiation</span>
                                            </div>

                                            <div className='grid gap'>
                                                <div className='display  justify-s-b'>
                                                    <div className='display gap'>
                                                        <span>🇫🇷 France</span>
                                                        <small className='c-grey'>{makeFriendly(6394)}</small>
                                                    </div>
                                                    <ProgressBar percentage={65} />
                                                </div>
                                                <div className='display  justify-s-b'>
                                                    <div className='display gap'>
                                                        <span>🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre</span>
                                                        <small className='c-grey'>{makeFriendly(2853)}</small>
                                                    </div>
                                                    <ProgressBar percentage={29} />
                                                </div>
                                                <div className='display  justify-s-b'>
                                                    <div className='display gap'>
                                                        <span>🇪🇪 Estonie</span>
                                                        <small className='c-grey'>{makeFriendly(590)}</small>
                                                    </div>
                                                    <ProgressBar percentage={6} />
                                                </div>
                                            </div>
                                        </div>


                                        <div className='grid gap-1rem justify-s-b p-1 border-r-1 grey'>
                                            <div className='display gap'>
                                                <RocketLaunchIcon width={20} className='c-black' />
                                                <span>Performance</span>
                                            </div>

                                            <div className='grid gap'>
                                                <div className='display  justify-s-b'>
                                                    <div className='display gap'>
                                                        <span>Vitesse</span>
                                                        <small className='c-grey'>{makeFriendly(9838)}</small>
                                                    </div>
                                                    <span>1,12s</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <img width={'80%'} height='100%' src='/images/statistics-feauture.png' /> */}
                                </div>
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
                                <img width={'80%'} height='100%' src='/images/myplaylist.svg' />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </Main>
    )
}
