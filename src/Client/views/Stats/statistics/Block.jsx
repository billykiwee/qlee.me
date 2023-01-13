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

    console.log(stats);

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
                        if (type == 'clics') return <Clics data={{stat}} key={i} />
                        if (isUserPremium(User).plan === 'ENTREPRISE') return <ByType type={type} stat={stat} key={i} />
                        else return <GoToPricing key={i} />
                    })
                }
                </div>
            </div>
        </div>
    )
}


const ByType = ({type, stat}) => {
    
    switch (type) {
      case 'device':
        return <Device data={{stat}} />
      case 'reference':
        return <Reference data={{stat}} />
      case 'localisation':
        return <Location data={{stat}} />
      case 'performance':
        return <Performance data={{stat}} />
      default:
        return null
    }
}