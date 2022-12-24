import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Main from '../../../App/components/Main'
import { db } from '../../../App/database/firebase'
import { useStateValue } from '../../../App/provider/StateProvider'
import getFavicon from '../../../App/utils/getFavicon'
import { minimizeString } from '../../../App/utils/minimizeString'
import '../../../App/css/stats.css'
import { Block } from './components/Block'
import { isUserPremium } from '../../../Admin/settings/isPremium'
import { fetchUser } from '../../lib/database/fetchUser'
import { GoToPricing } from '../Edit'
import { fetchUserLinks } from '../../lib/database/fetchUserLinks'
import { fetchStats } from '../../lib/database/fetchStats'
import Filter from './components/Filter'
import List from './components/List'



export default function Stats() {

    const { LinkID } = useParams()

    const [{user}] = useStateValue()

    const [UserLinks, setUserLinks] = useState([])
    const [User, setUser] = useState([])

    useEffect(e=> {
        fetchUserLinks(setUserLinks, user?.email)
        fetchUser(setUser, user?.email)
    }, [user]) 
      


    const TopLink = UserLinks.map(topLink=> topLink)
    .sort((a, b) => b.views - a.views)
    .splice(0,1)[0]
        


    const [LinkStat, setLinkStat] = useState([])
    
    useEffect(e=> {
        fetchStats(setLinkStat, LinkID)
    }, [LinkID])



    const [ShowStat, setShowStat] = useState(null)

    useEffect(e=> {
        setShowStat(LinkID ?? TopLink?.id)
    }, [TopLink])



    const [filter, setFilter] = useState(false)
    const [Search, setSearch] = useState(false)
    const [InputSearch, setInputSearch] = useState(false)



    function countBy(array) {
        const iterate =  array.reduce((acc, curr) => {
            if (curr in acc) 
                acc[curr]++
            else 
                acc[curr] = 1
            return acc
        }, {})

        const transformedData = {}

        Object.keys(iterate).forEach((key, i) => {
            transformedData[i] = {
                name: key, 
                count: iterate[key]
            }
        })

        return transformedData
    }
 

    const StatsFilter = (data) => {

        const device = LinkStat.map(e=> e.device)
        const countByDevice = countBy(device)
    
        const reference = LinkStat.map(e=> e.reference &&  new URL(e.reference).origin)
        const countByReference = countBy(reference)
    
        const countries = LinkStat.map(e=> e.adress?.country_code + '__'+ e.adress?.country)
        const countByCountry = countBy(countries)
    
        const performance = LinkStat.map(e=> e.performance)
        const countPerformance = performance.length && ((performance.reduce((x,y) => x + y) / performance.length / 1000)).toFixed(2) + 's'
    
        return {
            clics       : 0,
            device      : Object.values(countByDevice),
            reference   : Object.values(countByReference),
            localisation: Object.values(countByCountry),
            performance : { performance, speed : countPerformance }
        } 
    }

    const filters = StatsFilter()

    



    return (
        <Main>
            <h2>Statistiques</h2>

            <div className='display blocks stats-blocks align-top gap-2rem'>

                <div className='grid'>
                    {
                        UserLinks
                        .filter(isUserAuth=> isUserAuth.user === user?.email)
                        .filter(link=> link.id === ShowStat)
                        .map(topLink=> {
                        
                            return (
                                <div className='grid gap-2rem justfy-s-b border-r-2 border border-b p-1 white' key={topLink.id}>
                                    <div className='grid gap'>
                                        <div className='display justify-c'>
                                            <img src={getFavicon(topLink)} width={80} height={80} className='border-r-100' /> 
                                        </div>
                                        <div className='grid text-align-c'>
                                            <span className='f-s-20'>{topLink?.name}</span>
                                            <a className='f-s-20 link hover-link' href={'https://' + topLink?.shortLink}>{topLink?.shortLink}</a>
                                        </div>
                                    </div>
                                    
                                    <div className='grid gap'>

                                        <div className='grid gap-1rem grey p-1 border-r-04'>
                                            <div className='display justify-s-b '>
                                                <div className='display gap'>
                                                    <img src={'/images/eye-solid.svg'} width={18} />
                                                    <span>Clics</span>
                                                </div>
                                                <div className='grid gap'>
                                                    {topLink?.views}
                                                </div>
                                            </div>
                                        </div>

                                        <Block statType={filters.device} title='Appareil' icon='mobile' device />
                                        <Block statType={filters.reference} title='Source du trafic' icon='globe' url />
                                        <Block statType={filters.localisation} title='Localisation' icon='localisation' country />
                                    
                                        <div className='grid gap-1rem grey p-1 border-r-04'>
                                            <div className={isUserPremium(User).plan !== 'ENTREPRISE' ? 'display justify-s-b' : 'grid gap-1rem'} >
                                                <div className='display gap'>
                                                    <img src={'/images/rocket-solid.svg'} width={18} />
                                                    <span>Performance</span>
                                                </div>
                                                {
                                                    isUserPremium(User).plan === 'ENTREPRISE' 
                                                    ? 
                                                    (
                                                        <div className='display justify-s-b'>
                                                            {
                                                                filters.performance 
                                                                ? 
                                                                (
                                                                    <>
                                                                        <div className='display gap'>
                                                                            <span>vitesse</span>
                                                                            <small className='c-grey f-s-12'>{filters.performance.performance.length}</small>
                                                                        </div>
                                                                        <span>{filters.performance.speed}</span>
                                                                    </>
                                                                )
                                                                : <small className='c-grey'>aucune données</small>
                                                            }
                                                        </div>
                                                    )
                                                    : <GoToPricing />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                </div>

                
                <div className='grid gap'>
                    <Filter 
                        props={{
                            Filter       : filter,
                            Search       : Search,
                            InputSearch   : InputSearch,
                            setInputSearch: setInputSearch,
                            setFilter    : setFilter,
                            setSearch    : setSearch,
                        }} 
                    />

                    <List 
                        props={{
                            LinkID: LinkID,
                            InputSearch   : InputSearch,
                            setShowStat: setShowStat,
                            UserLinks  : UserLinks
                        }} 
                    />
                </div>

            </div>
        </Main>
    )
}


