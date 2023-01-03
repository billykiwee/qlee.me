import React, { useEffect, useState } from 'react'
import { isUserPremium } from '../../../../Admin/settings/isPremium'
import { useStateValue } from '../../../../App/provider/StateProvider'
import getFavicon from '../../../../App/utils/getFavicon'
import { isValidUrl } from '../../../../App/utils/isValidUrl'
import { fetchUser } from '../../../lib/database/user/fetchUser'
import { getHostName } from '../../../lib/getHostName'
import { GoToPricing } from '../../Links/Edit'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { BookmarkIcon, CalendarIcon, DevicePhoneMobileIcon, EyeIcon, GlobeAltIcon, GlobeEuropeAfricaIcon, MapPinIcon, RocketLaunchIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { CopyClip } from '../../Links/lib/CopyClip'
import formatDate from '../../../../App/utils/formatDate'


export const Block = ({statType, url, title, country, device, click}) => {

    const [{user}] = useStateValue()

    const [User, setUser] = useState([])

    useEffect(e=> {
        fetchUser(setUser, user?.email)
    }, [user]) 
      

    return (
        <div className='grid gap-1rem grey p-1 border-r-04'>
            
            <div className={isUserPremium(User).plan !== 'ENTREPRISE' ? 'display justify-s-b' : 'grid gap-1rem'} >
                <div className='display gap' >
                    { click && <EyeIcon width={18}/> }
                    { device && <DevicePhoneMobileIcon width={18}/> }
                    { url && <GlobeEuropeAfricaIcon width={18}/> }
                    { country && <MapPinIcon width={18}/> }
                    <span>{title}</span>
                </div>

                {
                    click && <span>{statType}</span>
                }

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
                                                            url && isURL && 
                                                            <img src={getFavicon(stat.name)} width={16} className='border-r-2' />
                                                        }
                                                        {
                                                            country && getUnicodeFlagIcon(stat.name)
                                                        }
                                                        <div className='display gap'>
                                                            {
                                                                device && <span>{stat.name}</span> 
                                                            }
                                                            {
                                                                url && (
                                                                    isValidUrl(stat.name) 
                                                                    ? <span>{getHostName(stat.name)}</span> 
                                                                    : <span>autres</span>
                                                                )
                                                            }
                                                            {
                                                                country &&
                                                                <span>{stat.name.split('__')[1]}</span> 
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



export function HeadBlock({topLink}) {
    return (
        <div className='grid gap'>
            <Link to={'/edit/' + topLink.id} className='display justify-c'>
                <img src={getFavicon(topLink)} width={80} height={80} className='border-r-100' /> 
            </Link>
            <div className='grid text-align-c'>
                <div className='display justify-c gap-04'>
                    <span className='f-s-20'>{topLink?.name}</span>
                    {
                        topLink?.linkInBio &&
                        <BookmarkIcon width={12} className='c-yellow' />
                    }
                </div>
                <div className='display gap justify-c'>
                    <a className='f-s-20 link hover-link' href={'https://' + topLink?.shortLink}>{topLink?.shortLink}</a>
                    <CopyClip link={topLink} />
                </div>
            </div>
                <div className='display gap justify-c'>
                    <CalendarIcon width={16} />
                    <span>{formatDate(topLink.date, 'date')}</span>
                </div>
        </div>

    )
}