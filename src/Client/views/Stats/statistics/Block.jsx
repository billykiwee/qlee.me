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

    return (
        <div className='grid gap-1rem grey p-1 border-r-04'>
        
            <div className={isUserPremium(User).plan !== 'ENTREPRISE' || type === 'clics' ? 'display justify-s-b' : 'grid gap-1rem'} >
                <div className='display gap' >
                    {icon}
                    <span>{title}</span>
                </div>
                <div className='grid gap'>
                    <ListBlock props={{ type, stat, User }} />
                </div>
            </div>
        </div>
    )
}

function ListBlock({ props }) {

    const { type, stat, User  } = props

    switch (type) {
      case 'clics':
        return <Clics stat={stat} />;
      case 'device':
        return <Device stat={stat} />;
      case 'reference':
        return <Reference stat={stat} />;
      case 'localisation':
        return <Location stat={stat} />;
      case 'performance':
        return <Performance stat={stat} />;
      default:
        if (isUserPremium(User).plan !== 'ENTREPRISE')
          return <GoToPricing />;
    }
  }
  
