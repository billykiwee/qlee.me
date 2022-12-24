import React, { useEffect, useState } from 'react'
import { isUserPremium } from '../../Admin/settings/isPremium'
import { useStateValue } from '../../App/provider/StateProvider'
import getFavicon from '../../App/utils/getFavicon'
import { isValidUrl } from '../../App/utils/isValidUrl'
import { fetchUser } from '../lib/database/fetchUser'
import { getHostName } from '../lib/getHostName'
import { GoToPricing } from '../views/Edit'

export const StatsBlock = ({statType, url, title, icon}) => {

    const [{user}] = useStateValue()

    const [User, setUser] = useState([])

    useEffect(e=> {
        fetchUser(setUser, user?.email)
    }, [user]) 
      


    return (
        <div className='grid gap-1rem grey p-1 border-r-04'>
            
            <div className={isUserPremium(User).plan !== 'ENTREPRISE' ? 'display justify-s-b' : 'grid gap-1rem'} >
                <div className='display gap' >
                    <img src={`/images/${icon}-solid.svg`} width={18} />
                    <span>{title}</span>
                </div>
                {
                    isUserPremium(User).plan === 'ENTREPRISE' 
                    ? 
                    (
                        <div className='grid gap'>
                            {
                                (
                                    statType.length > 0 ? 
                                    (
                                        statType
                                        .sort((x, y)=> y.count - x.count)
                                        .map((stat, i)=> {
                        
                                            const sumCount = statType.map(e=> e.count).reduce((x,y)=> x + y)
                                            const percentage = ((stat.count / sumCount) * 100).toFixed(0) + '%'

                                            const isURL = isValidUrl(stat) && stat.name !== 'undefined' || stat.name !== '' ? true : false


                                            return (
                                                <div className={'display justify-s-b'} key={i} >
                                                    <div className='display gap'>
                                                        {
                                                            url && 
                                                            isURL &&
                                                            <img src={getFavicon(stat.name)} width={16} className='border-r-2' />
                                                        }
                                                        <div className='display gap'>
                                                            {
                                                                isValidUrl(stat.name) 
                                                                ? <span>{getHostName(stat.name)}</span> 
                                                                : <span>{!isURL ? 'autres' : stat.name}</span> 
                                                            }
                                                            <small className='c-grey f-s-12'>{stat.count}</small>
                                                        </div>
                                                    </div>
                                                    <ProgressBar percentage={percentage} />
                                                </div>
                                            )
                                        })
                                    )
                                    : <small className='c-grey'>aucune données</small>
                                )
                            }
                        </div>
                    )
                    : <GoToPricing />
                }
            </div>
        </div>
    )
}

export function ProgressBar({percentage}) {
    return (
        <div className='display gap-1rem'>
            <div className='progress-bar-stat'>
                <div className='blue border-r-2' style={{width: percentage}}></div>
            </div>
            <div className='display w-2 justify-c'>
                <span>{percentage}</span>
            </div>
        </div>
    )
}