import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Main from '../../../App/components/Main'
import { useStateValue } from '../../../App/provider/StateProvider'
import getFavicon from '../../../App/utils/getFavicon'
import '../../../App/css/stats.css'
import { Block, HeadBlock } from './components/Block'
import { isUserPremium } from '../../../Admin/settings/isPremium'
import { fetchUser } from '../../lib/database/fetchUser'
import { GoToPricing } from '../Links/Edit'
import { fetchUserLinks } from '../../lib/database/fetchUserLinks'
import { fetchStats } from '../../lib/database/fetchStats'
import Filter from './components/Filter'
import List from './components/List'
import { dataFilter } from './data/dataFilters'
import { BookmarkIcon, CalendarIcon, DevicePhoneMobileIcon, RocketLaunchIcon } from '@heroicons/react/24/solid'
import Messages from '../../../App/utils/Messages'
import Popup from '../../../App/components/Popup'
import { CopyClip } from '../Links/lib/CopyClip'
import formatDate from '../../../App/utils/formatDate'



export default function Stats() {

    const history = useNavigate()

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

    function redirectIfNoLinkID() {

        setShowStat(LinkID ?? TopLink?.id)
        history(!LinkID && TopLink?.id)
    }

    useEffect(e=> {
        redirectIfNoLinkID()
    }, [TopLink])



    const [filter, setFilter] = useState(false)
    const [checkFilter, setCheckFilter] = useState('popular')

    const [Search, setSearch] = useState(false)
    const [InputSearch, setInputSearch] = useState(false)



    const data = dataFilter(LinkStat)

    const [Msg, setMsg] = useState([])



    return (
        <Main>

            <Popup content={Msg} />

            <div className='display blocks stats-blocks align-top gap-2rem'>

                <div className='grid'>
                    <h2 className='m-t-0'>Statistiques</h2>

                    {
                        UserLinks === 'no link' 
                        ? <span>Pas de lien</span>
                        :  
                        UserLinks.length < 1
                        ? <Messages loader={true} /> 
                        :
                        UserLinks
                        .filter(isUserAuth=> isUserAuth.user === user?.email)
                        .filter(link=> link.id === ShowStat)
                        .map(topLink=> {
                        
                            return (
                                <div className='grid gap-2rem justfy-s-b border-r-2 border border-b p-1 white' key={topLink.id}>
                                    
                                    <HeadBlock topLink={topLink} />
                                    
                                    <div className='grid gap'>

                                        <div className='grid gap-1rem grey p-1 border-r-04'>
                                            <div className='display justify-s-b '>
                                                <div className='display gap'>
                                                    <img src={'/images/eye-solid.svg'} width={18} />
                                                    <span>Clics</span>
                                                </div>
                                                <div className='grid gap'>
                                                    {data.clics}
                                                </div>
                                            </div>
                                        </div>

                                        <Block statType={data.device} title='Appareil' device />
                                        <Block statType={data.reference} title='Source du trafic' icon='globe' url />
                                        <Block statType={data.localisation} title='Localisation' icon='localisation' country />
                                    
                                        <div className='grid gap-1rem grey p-1 border-r-04'>
                                            <div className={isUserPremium(User).plan !== 'ENTREPRISE' ? 'display justify-s-b' : 'grid gap-1rem'} >
                                                <div className='display gap'>
                                                    <RocketLaunchIcon width={18} />
                                                    <span>Performance</span>
                                                </div>
                                                {
                                                    isUserPremium(User).plan === 'ENTREPRISE' 
                                                    ? 
                                                    (
                                                        <div className='display justify-s-b'>
                                                            {
                                                                data.performance.speed
                                                                ? 
                                                                (
                                                                    <>
                                                                        <div className='display gap'>
                                                                            <span>vitesse</span>
                                                                            <small className='c-grey f-s-12'>{data.performance.performance.length}</small>
                                                                        </div>
                                                                        <span>{data.performance.speed}</span>
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

                
                <div className='grid gap-1rem' >
                    <Filter 
                        props={{
                            Filter        : filter,
                            Search        : Search,
                            InputSearch   : InputSearch,
                            setInputSearch: setInputSearch,
                            setFilter     : setFilter,
                            setSearch     : setSearch,
                            checkFilter    : checkFilter,
                            setCheckFilter: setCheckFilter,
                        }} 
                    />

                    <List 
                        props={{
                            Filter     : filter,
                            LinkID     : LinkID,
                            InputSearch: InputSearch,
                            setShowStat: setShowStat,
                            UserLinks  : UserLinks,
                            checkFilter: checkFilter,
                            setMsg     : setMsg,
                            setShowStat: setShowStat,
                        }} 
                    />
                </div>

            </div>
        </Main>
    )
}


