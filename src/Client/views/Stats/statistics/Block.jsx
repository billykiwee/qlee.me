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

    const statistics = [
        {
            type : 'clics',
            element : (stat) => <Clics data={{ stat }} />
        },
        {
            type : 'device',
            element : (stat) => <Device data={{ stat }} />
        },
        {
            type : 'reference',
            element : (stat) => <Reference data={{ stat }} />
        },
        {
            type : 'localisation',
            element : (stat) => <Location data={{ stat }} />
        },
        {
            type : 'performance',
            element : (stat) => <Performance data={{ stat }} />
        },
    ]


    return (
        <div className='grid gap-1rem grey p-1 border-r-04'>
        
            <div className={isUserPremium(User).plan !== 'ENTREPRISE' || type === 'clics' ? 'display justify-s-b' : 'grid gap-1rem'} >
                <div className='display gap' >
                    {icon}
                    <span>{title}</span>
                </div>
                <div className='grid gap'>
                    {
                        [data]
                        .sort((x, y) => x.count - y.count)
                        .map((stat, i) => {

                            return statistics
                            .map(block=> {
                                return (
                                    <>
                                        { block.element(stat)}
                                    </>
                                )
                            })

                          /*   if (type === 'clics') return <Clics data={{stat}} />
                            if (isUserPremium(User).plan !== 'ENTREPRISE') return <GoToPricing />
                            else if (type === 'device') return <Device data={{stat}} />
                            if (type === 'reference') return <Reference data={{stat}} />
                            if (type === 'localisation') return <Location data={{stat}} />
                            if (type === 'performance') return <Performance data={{stat}} /> */
                        })
                    }
                </div>
            </div>
        </div>
    )
}


