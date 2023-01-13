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

    const stats = [data]

    const percentage = (stat, array) => {
        const sumCount = Object.values(stat.array).map(e=> e.count).reduce((x,y)=> x + y)
        return ((array.count / sumCount) * 100 ).toFixed(0)
    }


    return (
        <div className='grid gap-1rem grey p-1 border-r-04'>
        
            <div className={isUserPremium(User).plan !== 'ENTREPRISE' ? 'display justify-s-b' : 'grid gap-1rem'} >
                <div className='display gap' >
                    {icon}
                    <span>{title}</span>
                </div>
                <div className='grid gap'>
                    {
                        stats
                        .sort((x, y)=> y.count - x.count)
                        .map(stat=> {

                            console.log(stat);

                            if (type === 'clics') {
                                return (
                                    <div className='display justify-s-b '>
                                        <span>{stat.name}</span> 
                                        <span>{stat.count}</span>
                                    </div>
                                )
                            }

                            if (type == 'device') {
                                return Object.values(stat.array)
                                .sort((x, y)=> y.count - x.count)
                                .map(array=> {
                                    
                                    return (
                                        <div className='display justify-s-b'>
                                            <div className='display gap'>
                                                <span>{array.name}</span> 
                                                <small className='c-grey f-s-12'>{array.count}</small>
                                            </div>
                                            <ProgressBar percentage={percentage(stat, array)} />
                                        </div>
                                    )
                                })
                            }

                            if (type == 'reference')
                            return Object.values(stat.array)
                            .sort((x, y)=> y.count - x.count)
                            .map(array=> {

                                return (
                                    <div className='display justify-s-b'>
                                        <div className='display gap'>
                                            <img src={getFavicon(array.name)} width={16} className='border-r-2' />
                                            {
                                                isValidUrl(array.name) 
                                                ? <span>{getHostName(array.name)}</span> 
                                                : <span>autres</span>
                                            }
                                            <small className='c-grey f-s-12'>{array.count}</small>
                                        </div>
                                        <ProgressBar percentage={percentage(stat, array)} />
                                    </div>
                                )
                            })

                           if (type == 'localisation')
                           return Object.values(stat.array)
                           .sort((x, y)=> y.count - x.count)
                           .map(array=> {
                                return (
                                    <div className='display justify-s-b'>
                                        <div className='display gap'>
                                            <span>{array.name.split('__')[1]}</span> 
                                            <small className='c-grey f-s-12'>{array.count}</small>
                                        </div>
                                        <ProgressBar percentage={percentage(stat, array)} />
                                    </div>
                                )
                           })
                            if (type == 'performance')
                            return (
                                <div className='display justify-s-b'>
                                    <div className='display gap'>
                                        <span>vitesse</span>
                                        <small className='c-grey f-s-12'>{stat.length}</small>
                                    </div>
                                    <span>{stat.count}</span>
                                </div>
                            ) 
                        })   
                    }
                </div>
            </div>
        </div>
    )
}
