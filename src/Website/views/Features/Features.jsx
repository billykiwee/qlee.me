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
                    <div className='grid gap p-1 border white p-1 border-r-1' >
                        <div className='display gap-1rem'>
                            <span className='f-s-25'>Créer</span>
                        </div>
                    </div>

                    <div className='grid gap p-1' >
                        <div className='display gap-1rem'>
                            <span className='f-s-25'>Personaliser</span>
                        </div>
                    </div>
                    

                    <div className='grid gap p-1' >
                        <div className='display gap-1rem'>
                            <span className='f-s-25'>Statistiques</span>
                        </div>
                    </div>

                    <div className='grid gap p-1' >
                        <div className='display gap-1rem'>
                            <span className='f-s-25'>Qr code</span>
                        </div>
                    </div>
                </div>

            </div>
        </Main>
    )
}
