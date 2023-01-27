import { ChartPieIcon, Cog6ToothIcon, PencilIcon, QrCodeIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Main from '../../../App/components/Main'

export default function Features() {

    return (
        <Main>
            <h2 className='m-0'>Fonctionnalités</h2>

            <div className='display justify-s-b'>

                <div className='grid gap m-t-2 w-100p'>
                    <div className='grid gap p-1' >
                        <div className='display gap-1rem'>
                            <span className='border-r-100 w-3 h-3 display justify-c white'><PencilIcon width={18} className='c-blue' /></span>
                            <span className='f-s-25'>Créer</span>
                        </div>
                    </div>

                    <div className='grid gap p-1' >
                        <div className='display gap-1rem'>
                            <span className='border-r-100 w-3 h-3 display justify-c white'><Cog6ToothIcon width={20} className='c-blue' /></span>
                            <span className='f-s-25'>Personaliser</span>
                        </div>
                    </div>
                    

                    <div className='grid gap p-1' >
                        <div className='display gap-1rem'>
                            <span className='border-r-100 w-3 h-3 display justify-c white'><ChartPieIcon width={20} className='c-blue' /></span>
                            <span className='f-s-25'>Statistiques</span>
                        </div>
                    </div>

                    <div className='grid gap p-1' >
                        <div className='display gap-1rem'>
                            <span className='border-r-100 w-3 h-3 display justify-c white'><QrCodeIcon width={20} className='c-blue' /></span>
                            <span className='f-s-25'>Qr code</span>
                        </div>
                    </div>
                </div>

            </div>
        </Main>
    )
}
