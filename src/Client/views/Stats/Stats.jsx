import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Main from '../../../App/components/Main'
import '../../../App/css/stats.css'
import { Block } from './statistics/Block'
import Filter from './components/Filter'
import List from './components/List'

import Messages from '../../../App/utils/Messages'
import { useStateProps } from '../../../App/provider/ContextProvider'
import { Head } from './components/Head'
import { statistics } from './data/statistics'
import { LockClosedIcon } from '@heroicons/react/24/solid'



export default function Stats() {

    const { user, stats, popUp, snackBar } = useStateProps()

    const history = useNavigate()
    
    const { LinkID } = useParams()


    const User      = user?.profil
    const UserLinks = user?.links
    const LinkStat  = stats.filter(e=> e.LinkID === LinkID)
    

    const TopLink = UserLinks.map(topLink=> topLink)
    .sort((a, b) => b.views - a.views)
    .splice(0,1)[0]
        


    const [ShowStat, setShowStat] = useState(null)
    
    const redirectIfNoLinkID = e => setShowStat(e=> LinkID ?? TopLink?.id)
    
    useEffect(e=> {
        redirectIfNoLinkID()

        if (!LinkID) history(TopLink?.id)
        
    }, [TopLink])
    


    const [filter, setFilter] = useState(false)
    const [checkFilter, setCheckFilter] = useState('popular')

    const [Search, setSearch] = useState(false)
    const [InputSearch, setInputSearch] = useState(false)



    const Statistics = statistics(LinkStat)



    return (
        <Main>
            <div className='display blocks stats-blocks align-top gap-2rem'>

                <div className='grid gap-2rem'>
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
                                            Statistics
                                            .map((stat, i)=> {
                                                return <Block stats={stat} User={User} key={i} />
                                            })
                                        }

                                    </div>
                                </div>
                            )
                        })
                    }

                    {
                            
                    }
                    <div className='display justify-c'>
                        <div className='display justify-c gap yellow border-r-2 h-2 p-1'>
                            <LockClosedIcon width={14} color='black' />
                            <small style={{color: 'black'}}>Upgrade ton compte pour voir toutes les statistiques</small>
                        </div>
                    </div>
                    
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
                            setShowStat,
                        }} 
                    />
                </div>

            </div>
        </Main>
    )
}


