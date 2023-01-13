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

    const stats = [data]

    return (
        <div className='grid gap-1rem grey p-1 border-r-04'>
        
            <div className={isUserPremium(User).plan !== 'ENTREPRISE' || type === 'clics' ? 'display justify-s-b' : 'grid gap-1rem'} >
                <div className='display gap' >
                    {icon}
                    <span>{title}</span>
                </div>
                <div className='grid gap'>
                    {
                        stats
                        .sort((x, y)=> y.count - x.count)
                        .map(stat=> {

                            if (isUserPremium(User).plan !== 'ENTREPRISE') return <GoToPricing /> 

                            if (type === 'device') return <Device data={{ stat }} />
                            if (type === 'reference') return <Reference data={{ stat }} />
                            if (type === 'localisation') return <Location data={{ stat }} />
                            if (type === 'performance') return <Performance data={{ stat }} />

                            else return <Clics data={{ stat }} />
                        })   
                    }
                </div>
            </div>
        </div>
    )
}
