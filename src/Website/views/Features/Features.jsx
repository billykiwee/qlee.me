import { ChartPieIcon, Cog6ToothIcon, PencilIcon, QrCodeIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Main from '../../../App/components/Main'
import { GetWidth } from '../../../App/utils/GetWidth'

export default function Features() {


    const width = GetWidth()

    return (
        <Main>
            <h2 className='m-0'>Fonctionnalités</h2>

            <div className='display justify-c'>

                <div className='grid gap m-t-2' style={{ width : width > 780 ? '80%' : '100%' }}>

                    <div className='grid gap p-1 white border-r-1' >
                        <div className='display gap-1rem'>
                            <span className='f-s-25'>Créer & Personaliser</span>
                        </div>
                        <div className='display blocks'>
                            <div className='display p-1 w-50p'>
                                <span>
                                    Créer facilement des liens URL raccourcis pour tes liens longs et encombrants et personnalise ces liens en modifiant le lien court, l'image et même l'URL principale.
                                </span>
                            </div>
                            <div className='display w-100p border-r-1 overflow-hidden' style={{height: '288px'}} >
                                <img width={'100%'} height='100%' src='https://cdn.myportfolio.com/b7f090aa31ea4a7cc6834ad58b18ebbd/59bdde54-ade0-4454-b790-115fde32c0b5_carw_3x2x1280.png?h=8d2329e47ba01998a491a259c30707fe' />
                            </div>
                        </div>
                    </div>
                    

                    <div className='grid gap p-1' >
                        <div className='display gap-1rem'>
                            <span className='f-s-25'>Statistiques</span>
                        </div>
                        <span>
                            Analyse les statistiques de tes liens, comme le nombre de clics, le type d'appareil, la source du trafic, la localisation des utilisateurs et la performance. Cela te permettra de comprendre comment tes liens sont utilisés et comment tu peux améliorer leur performance.
                        </span>
                    </div>

                    <div className='grid gap p-1' >
                        <div className='display gap-1rem'>
                            <span className='f-s-25'>Qr code</span>
                        </div>
                        <span>
                            Créer et de personnaliser des codes QR pour chaque lien. Tes liens seront encore plus accessibles pour tes utilisateurs, en leur offrant la possibilité de les scanner directement avec leur appareil mobile.
                        </span>
                    </div>
                </div>

            </div>
        </Main>
    )
}
