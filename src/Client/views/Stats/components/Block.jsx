import React from 'react'
import { isUserPremium } from '../../../../Admin/settings/isPremium'
import getFavicon from '../../../../App/utils/getFavicon'
import { isValidUrl } from '../../../../App/utils/isValidUrl'
import { getHostName } from '../../../lib/getHostName'
import { GoToPricing } from '../../Links/views/Edit/Edit'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { DevicePhoneMobileIcon, EyeIcon, GlobeEuropeAfricaIcon, MapPinIcon, RocketLaunchIcon } from '@heroicons/react/24/solid'
import { ProgressBar } from './ProgressBar'


export const Block = ({ User, statistic }) => {

    const { title, data, type, icon } = statistic


    console.log(data);


    return (
        <div className='grid gap-1rem grey p-1 border-r-04'>
        
            <div className={isUserPremium(User).plan !== 'ENTREPRISE' ? 'display justify-s-b' : 'grid gap-1rem'} >
                <div className='display gap' >
                    {icon}
                    <span>{title}</span>
                </div>
                <div className='grid gap'>
                    {
                        data.lenght
                        ?
                        data
                        .sort((x, y)=> y.count - x.count)
                        .map(stat=> {

                            const sumCount = data.map(e=> e.count).reduce((x,y)=> x + y)
                            const percentage = ((stat.count / sumCount) * 100).toFixed(0) + '%'


                            if (type === 'clics') 
                            return (
                                <div className='display justify-s-b '>
                                    <span>{stat.name}</span> 
                                    <span>{stat.count}</span>
                                </div>
                            )

                            if (type == 'device')
                            return (
                                <div className='display justify-s-b'>
                                    <div className='display gap'>
                                        <span>{stat.name}</span> 
                                        <small className='c-grey f-s-12'>{stat.count}</small>
                                    </div>
                                    <ProgressBar percentage={percentage} />
                                </div>
                            )
                            if (type == 'reference')
                            return (
                                <div className='display justify-s-b'>
                                    <div className='display gap'>
                                        <img src={getFavicon(stat.name)} width={16} className='border-r-2' />
                                        {
                                            isValidUrl(stat.name) 
                                            ? <span>{getHostName(stat.name)}</span> 
                                            : <span>autres</span>
                                        }
                                        <small className='c-grey f-s-12'>{stat.count}</small>
                                    </div>
                                    <ProgressBar percentage={percentage} />
                                </div>
                            )
                            if (type == 'localisation')
                            return (
                                <div className='display justify-s-b'>
                                    <div className='display gap'>
                                        <span>{stat.name.split('__')[1]}</span> 
                                        <small className='c-grey f-s-12'>{stat.count}</small>
                                    </div>
                                    <ProgressBar percentage={percentage} />
                                </div>
                            )
                            if (type == 'performance')
                            return (
                                <div className='display justify-s-b'>
                                    <div className='display gap'>
                                        <span>vitesse</span>
                                        <small className='c-grey f-s-12'>{stat.count}</small>
                                    </div>
                                    <span>{stat.count}</span>
                                </div>
                            )
                        })

                        : <small className='c-grey'>aucune données</small>
                    }
                </div>
            </div>
        </div>
    )
}
