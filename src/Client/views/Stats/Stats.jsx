import { DevicePhoneMobileIcon, EyeIcon, GlobeEuropeAfricaIcon, MapPinIcon, RocketLaunchIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Main from '../../../App/components/Main'
import '../../../App/css/stats.css'
import { Block, HeadBlock } from './statistics/Block'
import { isUserPremium } from '../../../Admin/settings/isPremium'
import { GoToPricing } from '../Links/views/Edit/Edit'
import Filter from './components/Filter'
import List from './components/List'

import Messages from '../../../App/utils/Messages'
import { useStateProps } from '../../../App/provider/ContextProvider'
import { Head } from './components/Head'
import { dataFilter } from './data/dataFilters'
import { Clics } from './statistics/components/Clics'
import { Device } from './statistics/components/Device'
import { Reference } from './statistics/components/Reference'
import { Performance } from './statistics/components/Performance'
import { Location } from './statistics/components/Location'



export default function Stats() {

    const { user, popUp, snackBar } = useStateProps()

    const history = useNavigate()
    
    const { LinkID } = useParams()


    const User      = user?.profil
    const UserLinks = user?.links?.links
    const LinkStat  = user?.links?.stats.filter(e=> e.LinkID === LinkID)
    

    const TopLink = UserLinks.map(topLink=> topLink)
    .sort((a, b) => b.views - a.views)
    .splice(0,1)[0]
        


    const [ShowStat, setShowStat] = useState(null)
    
    const redirectIfNoLinkID = e => setShowStat(LinkID ?? TopLink?.id)
    
    useEffect(e=> {
        redirectIfNoLinkID()

        if (!LinkID) history(TopLink?.id)
        
    }, [TopLink])
    


    const [filter, setFilter] = useState(false)
    const [checkFilter, setCheckFilter] = useState('popular')

    const [Search, setSearch] = useState(false)
    const [InputSearch, setInputSearch] = useState(false)



    const data = dataFilter(LinkStat)


    const [Msg, setMsg] = useState([])


    console.log(data);

    return (
        <Main>
            <div className='display blocks stats-blocks align-top gap-2rem'>

                <div className='grid'>
                    <h2 className='m-t-0'>Statistiques</h2>

                    {
                        UserLinks === 'no links' 
                        ? <span>Pas de lien</span>
                        :  
                        UserLinks.length < 1
                        ? <Messages loader={true} /> 
                        :
                        UserLinks
                        .filter(isUserAuth=> isUserAuth.user === User.email)
                        .filter(link=> link.id === ShowStat)
                        .map(topLink=> {
                        
                            return (
                                <div className='grid gap-2rem justfy-s-b border-r-2 border border-b p-1 white' key={topLink.id}>
                                    
                                    <Head topLink={topLink} />
                                    
                                    <div className='grid gap'>
                                        {/* {
                                            statistics
                                            .map((stat, i)=> {
                                                return <Block User={User} statistic={stat} key={i} />
                                            })
                                        } */}

                                        {
                                            data
                                            .map(stat=> {

                                               return (
                                                <>
                                                    {
                                                        stat.type === 'clics' && <Clics stat={stat.data} />
                                                        &&
                                                        isUserPremium(User).plan !== 'ENTREPRISE' && <GoToPricing />
                                                        &&
                                                        stat.type === 'device' && <Device stat={stat.data} />
                                                        &&
                                                        stat.type === 'reference' && <Reference stat={stat.data} />
                                                        &&
                                                        stat.type === 'localisation' && <Location stat={stat.data} />
                                                        &&
                                                        stat.type === 'performance' && <Performance stat={stat.data} />
                                                    }
                                                </>
                                               )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                </div>

                
                <div className='grid gap-1rem' >
                    <Filter 
                        props={{
                            filter,
                            Search,
                            InputSearch,
                            setInputSearch,
                            setFilter,
                            setSearch,
                            checkFilter,
                            setCheckFilter,
                        }} 
                    />

                    <List 
                        props={{
                            popUp,
                            snackBar,
                            filter,
                            LinkID,
                            InputSearch,
                            ShowStat,
                            UserLinks,
                            checkFilter,
                            setMsg,
                            setShowStat,
                        }} 
                    />
                </div>

            </div>
        </Main>
    )
}


