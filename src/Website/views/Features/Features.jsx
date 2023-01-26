import { ChartPieIcon, Cog6ToothIcon, PencilIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Main from '../../../App/components/Main'

export default function Features() {

    return (
        <Main>
            <h2 className='m-0'>Fonctionnalités</h2>
            <div className='grid gap m-t-2'>
                <div className='grid gap p-1'>
                    <div className='display gap-1rem'>
                        <span className='border-r-100 w-3 h-3 display justify-c white'><PencilIcon width={20} className='c-black' /></span>
                        <span className='f-s-25'>Créer un lien court</span>
                    </div>
                </div>

                <div className='grid gap p-1'>
                    <div className='display gap-1rem'>
                        <span className='border-r-100 w-3 h-3 display justify-c white'><Cog6ToothIcon width={20} className='c-black' /></span>
                        <span className='f-s-25'>Personalisé le lien</span>
                    </div>
                </div>

                <div className='grid gap p-1'>
                    <div className='display gap-1rem'>
                        <span className='border-r-100 w-3 h-3 display justify-c white'><ChartPieIcon width={20} className='c-black' /></span>
                        <span className='f-s-25'>Statistiques</span>
                    </div>
                </div>

            </div>
        </Main>
    )
}
