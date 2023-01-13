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

                            if (type === 'clics' ) return <Clics data={{ stat }} />
                            else return isUserPremium(User).plan !== 'ENTREPRISE' 
                                ? <GoToPricing /> 
                                :
                                <>
                                    { type === 'device' && <Device data={{stat, percentage}}  /> }
                                    { type === 'reference' && <Reference data={{stat, percentage}}  /> }
                                    { type === 'localisation' && <Location data={{stat, percentage}} /> }
                                    { type === 'performance' && <Performance data={{ stat, percentage }} /> }
                                </>
                        })   
                    }
                </div>
            </div>
        </div>
    )
}
