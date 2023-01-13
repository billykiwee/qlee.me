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

    const percentage = (stat, array) => {
        const sumCount = Object.values(stat.array).map(e=> e.count).reduce((x,y)=> x + y)
        return ((array.count / sumCount) * 100 ).toFixed(0)
    }

    const isUserPremium = isUserPremium(User).plan === 'ENTREPRISE'

    console.log(isUserPremium);
    const STATS = ({ type, stat, percentage }) => {

        const statistics = [
            { 
                type: 'clics', 
                element: <Clics data={{ stat }} /> 
            },
            { 
                type: 'device', 
                element: <Device data={{ stat, percentage }} active={isUserPremium} /> 
            },
            { 
                type: 'reference', 
                element: <Reference data={{ stat, percentage }} active={isUserPremium} /> 
            },
            { 
                type: 'localisation', 
                element: <Location data={{ stat, percentage }} active={isUserPremium} /> 
            },
            { 
                type: 'performance', 
                element: <Performance data={{ stat }} active={isUserPremium} /> 
            },
        ]

        return statistics.map(stat => {
            if (stat.type === type) return stat.element
        })
    }


    return (
        <div className='grid gap-1rem grey p-1 border-r-04'>
        
            <div className={isUserPremium !== 'ENTREPRISE' || type === 'clics' ? 'display justify-s-b' : 'grid gap-1rem'} >
                <div className='display gap' >
                    {icon}
                    <span>{title}</span>
                </div>
                <div className='grid gap'>
                    {
                        stats
                        .sort((x, y)=> y.count - x.count)
                        .map(stat=> {

                            return (
                                <div className='grid gap'>
                                    <STATS type={type} stat={stat} />
                                    { isUserPremium(User).plan !== 'ENTREPRISE' && <GoToPricing /> }
                                </div>
                            )
                        })   
                    }
                </div>
            </div>
        </div>
    )
}
