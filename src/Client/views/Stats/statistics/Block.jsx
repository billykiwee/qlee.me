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
                        .map((stat, i)=> {

                           /*  if (type === 'clics' ) return <Clics data={{ stat }} key={i} />

                            if (isUserPremium(User).plan !== 'ENTREPRISE') return <GoToPricing />  */
                    
                            return <STATS type={type} stat={stat} />
                        })   
                    }
                </div>
            </div>
        </div>
    )
}


const STATS = ({ type, stat }) => {

    const statistics = [
        {
            type: 'clics',
            element: <Clics data={{ stat }} />
        },
        {
            type: 'device',
            element: <Device data={{ stat }} />
        },
        {
            type: 'reference',
            element: <Reference data={{ stat }} />
        },
        {
            type: 'localisation',
            element: <Location data={{ stat }} />
        },
        {
            type: 'performance',
            element: <Performance data={{ stat }} />
        }
    ]

    return statistics.map(statistic=> {
        if (statistic.type === type) return statistic.element
    })
}