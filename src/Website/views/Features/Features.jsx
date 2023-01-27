import { CameraIcon, ChartPieIcon, Cog6ToothIcon, EyeIcon, PencilIcon, QrCodeIcon, VideoCameraIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Link } from 'react-router-dom'
import Main from '../../../App/components/Main'
import { useStateProps } from '../../../App/provider/ContextProvider'
import { GetWidth } from '../../../App/utils/GetWidth'
import { Block } from '../../../Client/views/Stats/statistics/Block'
import { Clics } from '../../../Client/views/Stats/statistics/components/Clics'

export default function Features() {


    const {  user } = useStateProps()

    const User = user?.profil

    const width = GetWidth()


    return (
        <Main>
            <h2 className='m-0'>Fonctionnalités</h2>

            <div className='display justify-c'>

                <div className='grid gap-2rem m-t-2'>

                    <div className='grid gap p-2 white border-r-1 shadow' >
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
                    
                    <div className='grid gap p-2 white border-r-1 shadow' >
                        <div className='display gap-1rem'>
                            <h3 className='m-0'>Statistiques</h3>
                        </div>
                        <div className='grid blocks align-top gap-1rem f-w-200'>
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
                            <div className='display justify-c w-100p border-r-1 overflow-hidden' >

                                <Clics stat={298393} />
                               {/*  <img width={'80%'} height='100%' src='/images/statistics-feauture.png' /> */}
                            </div>
                        </div>
                    </div>
                    

                    <div className='grid gap p-2 white border-r-1 shadow' >
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
