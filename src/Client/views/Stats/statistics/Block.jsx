import React from 'react'
import { isUserPremium } from '../../../../Admin/settings/isPremium'
import { GoToPricing } from '../../Links/views/Edit/Edit'
import { Clics } from './components/Clics'
import { Device } from './components/Device'
import { Location } from './components/Location'
import { Performance } from './components/Performance'
import { Reference } from './components/Reference'


export const Block = ({ stats, User }) => {

    const { title, name, data, icon } = stats


    return (
        <div className='grid gap-1rem grey p-1 border-r-04'>
        
            <div className={!data.length && !data?.type?.length ? 'display justify-s-b' :  'grid gap-1rem'} >

                <div className='display gap' >
                    {icon}
                    <span>{title}</span>
                </div>
                <div className='grid gap'>
                    {
                        name === 'clics' ? <Clics stat={data} />
                        :
                        isUserPremium(User).plan === 'FREE' ? <GoToPricing />
                        :
                        name === 'device' && <Device stat={data} />
                        ||
                        name === 'reference' && <Reference stat={data} />
                        ||
                        name === 'localisation' && <Location stat={data} />
                        ||
                        name === 'performance' && <Performance stat={data} /> 
                    } 
                </div>
            </div>
        </div>
    )
}


