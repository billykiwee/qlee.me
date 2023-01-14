import React from 'react'
import { isUserPremium } from '../../../../Admin/settings/isPremium'
import { GoToPricing } from '../../Links/views/Edit/Edit'
import { Clics } from './components/Clics'
import { Device } from './components/Device'
import { Location } from './components/Location'
import { Performance } from './components/Performance'
import { Reference } from './components/Reference'


export const Block = ({ User, statistic }) => {

    const { title, data, type, icon } = statistic

    const stat = data

    console.log(data);

    return (
        <div className='grid gap-1rem grey p-1 border-r-04'>
        
            <div className={isUserPremium(User).plan !== 'ENTREPRISE' || type === 'clics' ? 'display justify-s-b' : 'grid gap-1rem'} >
                <div className='display gap' >
                    {icon}
                    <span>{title}</span>
                </div>
                <div className='grid gap'>
                   {/*  {
                        type === 'clics' && <Clics stat={{ stat }} />
                        ||
                        isUserPremium(User).plan !== 'ENTREPRISE' && <GoToPricing />
                        ||
                        type === 'device' && <Device stat={{ stat }} />
                        ||
                        type === 'reference' && <Reference stat={{ stat }} />
                        ||
                        type === 'localisation' && <Location stat={{ stat }} />
                        ||
                        type === 'performance' && <Performance stat={{ stat }} />
                    } */}
                </div>
            </div>
        </div>
    )
}


