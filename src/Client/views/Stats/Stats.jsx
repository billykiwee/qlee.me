import { DevicePhoneMobileIcon, EyeIcon, GlobeEuropeAfricaIcon, MapPinIcon, RocketLaunchIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Main from '../../../App/components/Main'
import '../../../App/css/stats.css'
import { Block, HeadBlock } from './components/Block'
import { isUserPremium } from '../../../Admin/settings/isPremium'
import { GoToPricing } from '../Links/views/Edit/Edit'
import Filter from './components/Filter'
import List from './components/List'
import { dataFilter } from './data/dataFilters'
import Messages from '../../../App/utils/Messages'
import { useStateProps } from '../../../App/provider/ContextProvider'
import { Head } from './components/Head'



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


    const statistics = [
        {
            title: 'Clics',
            type : 'clics',
            data : { name : 'clics', count: data.clics },
            icon :<EyeIcon width = {18}/>
        },
        {
            title: 'Appareil',
            type : 'device',
            data : { name : 'device', count: data.device } ,
            icon : <DevicePhoneMobileIcon width={18}/>
        },
        {
            title: 'Source',
            type : 'reference',
            data : { name : 'reference', count: data.reference },
            icon : <GlobeEuropeAfricaIcon width={18}/>  
        },
        {
            title: 'Localisation',
            type : 'countries',
            data : { name : 'countries', count: data.localisation } ,
            icon : <MapPinIcon width={18}/>  
        },
        {
            title: 'Performance',
            type : 'performance',
            data : { name : 'performance', count: data.performance },
            icon : <RocketLaunchIcon width={18} />
        },
    ]

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
                                        {
                                            statistics
                                            .map(stat=> {
                                                return <Block User={User} statistic={stat} />
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


