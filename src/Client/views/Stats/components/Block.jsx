import React from 'react'
import { isUserPremium } from '../../../../Admin/settings/isPremium'
import getFavicon from '../../../../App/utils/getFavicon'
import { isValidUrl } from '../../../../App/utils/isValidUrl'
import { getHostName } from '../../../lib/getHostName'
import { GoToPricing } from '../../Links/views/Edit/Edit'
import { Device } from '../statistics/Device'
import Location from '../statistics/Location'
import Performance from '../statistics/Performance'
import { Reference } from '../statistics/Reference'


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

                            if (type === 'clics') {
                                return (
                                    <div className='display justify-s-b '>
                                        <span>{stat.count}</span>
                                    </div>
                                )
                            }

                            if (isUserPremium(User).plan !== 'ENTREPRISE') return <GoToPricing />

                            if (type == 'device') return <Device data={{stat, percentage}}  />

                            if (type == 'reference') return <Reference data={{stat, percentage}}  />

                            if (type == 'localisation') return <Location data={{stat, percentage}} />
                            
                            if (type == 'performance') return <Performance data={{ stat, percentage }} />
                        })   
                    }
                </div>
            </div>
        </div>
    )
}
