import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Main from '../../App/components/Main'
import { db } from '../../App/database/firebase'
import { useStateValue } from '../../App/provider/StateProvider'
import getFavicon from '../../App/utils/getFavicon'
import { minimizeString } from '../../App/utils/minimizeString'
import '../../App/css/stats.css'
import formatDate from '../../App/utils/formatDate'
import { getTitleURL } from '../lib/getTitleURL'
import { checkURLReference } from '../lib/checkURLReference'

export default function Stats() {


    const { LinkID } = useParams()

    const [{user}] = useStateValue()

    const [UserLinks, setUserLinks] = useState([])

    useEffect(e=> {
        db.collection('links').orderBy('date').onSnapshot(snapshot => {
            setUserLinks(snapshot.docs.map(doc => doc.data()))
        })
    }, []) 

    const AllUserLinks = UserLinks
        .filter(data=> data.user === user?.email)
        .map(userlinks=> userlinks)



    const TopLink = 
    UserLinks
        .filter(isUserAuth=> isUserAuth.user === user?.email)
        .map(topLink=> topLink)
        .sort((a, b) => b.views - a.views)
        .splice(0,1)[0]
        


    const [LinkStat, setLinkStat] = useState([])
    
    useEffect(e=> {
        db.collection('links').doc(LinkID).collection('stats').onSnapshot(snapshot => {
            setLinkStat(snapshot.docs.map(doc => doc.data()))
        })
    }, [LinkID])


    const [ShowStat, setShowStat] = useState(null)

    useEffect(e=> {
        setShowStat(LinkID ?? TopLink?.id)
    }, [TopLink])



    const [Filter, setFilter] = useState(false)
    const [Search, setSearch] = useState(false)




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
 

    const device = LinkStat.map(e=> e.device)
    const countByDevice = countBy(device)

    const reference = LinkStat.map(e=> e.reference)
    const countByReference = countBy(reference)

    const countries = LinkStat.map(e=> e.adress?.country)
    const countByCountry = countBy(countries)

    const dates = LinkStat.map(e=> e.date && formatDate(e.date).split(' ')[0])
    const countByDate = countBy(dates)

    const performance = LinkStat.map(e=> e.performance && e.performance)
    const countPerformance = performance.length && performance.reduce((x,y) => x + y)
    const averagePerformance = countPerformance ? ((countPerformance / performance.length) / 1000).toFixed(2) + 's' : ''


    const StatsFilter = {
        clics       : 0,
        device      : countByDevice,
        reference   : countByReference,
        localisation: countByCountry,
        performance: performance
    } 


    return (
        <Main>
            <h2>Statistiques</h2>


            <div className='display blocks stats-blocks align-top gap-2rem'>

                <div className='grid'>
                    {
                        UserLinks
                        .filter(isUserAuth=> isUserAuth.user === user?.email)
                        .filter(toplink=> toplink.id === ShowStat)
                        .map(topLink=> {
                      
                            return (
                                <div className='grid gap-2rem justfy-s-b border-r-2 border border-b p-1 white' key={topLink.id}>
                                    <div className='grid gap'>
                                        <div className='display justify-c'>
                                            <img src={getFavicon(topLink?.url)} width={88} className='border-r-100' /> 
                                        </div>
                                        <div className='grid text-align-c'>
                                            <span className='f-s-20'>{topLink?.name}</span>
                                            <span className='f-s-20 link hover-link'>{topLink?.shortLink}</span>
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
                                        
                                        <div className='grid gap-1rem grey p-1 border-r-04'>
                                            <div className='display gap'>
                                                <img src={'/images/mobile-solid.svg'} width={18} />
                                                <span>Appareil</span>
                                            </div>
                                            <div className='grid gap'>
                                                {
                                                    Object.values(StatsFilter.device)
                                                    .sort((x, y)=> y.count - x.count)
                                                    .map(stat=> {
                                                        
                                                        const sumCount = Object.values(StatsFilter.device).map(e=> e.count).reduce((x,y)=> x + y)

                                                        const percentage = ((stat.count / sumCount) * 100).toFixed(0) + '%'

                                                        return (
                                                            <div className='display justify-s-b' id={stat.name} >
                                                                <div className='display gap'>
                                                                    <span>{stat.name}</span>
                                                                    <small className='c-grey f-s-12'>{stat.count}</small>
                                                                </div>
                                                                <div className='display gap-1rem'>
                                                                    <div className='progress-bar-stat'>
                                                                        <div className='blue border-r-2' style={{width: percentage}}></div>
                                                                    </div>
                                                                    <span>{percentage}</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>

                                        <div className='grid gap-1rem grey p-1 border-r-04'>
                                            <div className='display gap'>
                                                <img src={'/images/globe-solid.svg'} width={20} />
                                                <span>Source du trafic</span>
                                            </div>
                                                <div className='grid gap'>
                                                {
                                                    Object.values(StatsFilter.reference)
                                                    .sort((x, y)=> y.count - x.count)
                                                    .map(stat=> {
                                                        
                                                        const sumCount = Object.values(StatsFilter.reference).map(e=> e.count).reduce((x,y)=> x + y)
                                                        const percentage = ((stat.count / sumCount) * 100).toFixed(0) + '%'


                                                        return (
                                                            <div className='display justify-s-b'>
                                                                <div className='display gap'>
                                                                    <img src={getFavicon(stat.name)} width={16} className='border-r-100' />
                                                                    {
                                                                        checkURLReference(stat.name)
                                                                        ? <span>{getTitleURL(stat.name)}</span>
                                                                        : <span>inconnue</span>
                                                                    }
                                                                    <small className='c-grey f-s-12'>{stat.count}</small>
                                                                </div>
                                                                <ProgressBar percentage={percentage} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                             </div>
                                        </div>


                                        <div className='grid gap-1rem grey p-1 border-r-04'>
                                            <div className='display gap'>
                                                <img src={'/images/localisation-solid.svg'} width={20} />
                                                <span>Localisation</span>
                                            </div>
                                            <div className='grid gap'>
                                                {
                                                    Object.values(StatsFilter.localisation)
                                                    .sort((x, y)=> y.count - x.count )
                                                    .map(stat=> {
                                                        const sumCount = Object.values(StatsFilter.localisation).map(e=> e.count).reduce((x,y)=> x + y)

                                                        const percentage = ((stat.count / sumCount) * 100).toFixed(0) + '%'

                                                        return (
                                                            <div className='display justify-s-b' id={stat.name}>
                                                                <div className='display gap'>
                                                                    <span>{stat.name === 'undefined' ? 'autres' : stat.name}</span><small className='c-grey f-s-12'>{stat.count}</small>
                                                                </div>
                                                                <ProgressBar percentage={percentage} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>


                                        <div className='grid gap-1rem grey p-1 border-r-04'>
                                            <div className='display gap'>
                                                <img src={'/images/rocket-solid.svg'} width={16} />
                                                <span>Performance</span>
                                            </div>
                                            <div className='grid gap'>
                                                <div className='display justify-s-b'>
                                                    <div className='display gap'>
                                                        <span>vitesse</span>
                                                    </div>
                                                    <span>{averagePerformance}</span>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='grid gap-1rem'>

                    <div className='grid gap'>
                        <div className='display justify-s-b'>
                            <div className='display'>
                                <button 
                                    onClick={e=> {
                                        setFilter(false)
                                        setSearch(Search ? false : true)
                                    }}
                                    className={!Search ? 'c-grey' : 'c-black'} 
                                    onMouseOver={e=> e.target.classList.add('c-black')}
                                    onMouseOut={e=> e.target.classList.remove('c-black')}
                                >
                                    <div >
                                        <span className='f-s-14 display gap'>
                                            Rechercher
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={20}><path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" /></svg>
                                        </span>
                                    </div>
                                </button>
                            </div>

                            <div className='display'>
                                <button 
                                    onClick={e=> {
                                        setSearch(false)
                                        setFilter(Filter ? false : true)
                                    }}
                                    className={!Search ? 'c-grey' : 'c-black'} 
                                    onMouseOver={e=> e.target.classList.add('c-black')}
                                    onMouseOut={e=> e.target.classList.remove('c-black')}
                                >
                                    <div className={!Filter ? 'c-grey' : 'c-black'} onMouseOver={e=> e.target.classList.add('c-black')} onMouseOut={e=> e.target.classList.remove('c-black')} >
                                        <span className='f-s-14 display gap'>
                                            Filtre
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={14}><path fill-rule="evenodd" d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z" clip-rule="evenodd" /></svg>
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        {
                            Search &&
                            <div className='display'>
                                <input className='div-input h-3 white border-r-1 w-100p' placeholder='Rechercher un lien' onChange={e=> setSearch(e.target.value.toLowerCase())} />
                            </div>
                        }
                        {
                            Filter &&
                            <div className='display wrap gap'>
                                <div>
                                    <button className='border border-r-2 h-2 hover white p-lr-1'>
                                        <span>le + populaire</span>
                                    </button>
                                </div>
                                <div>
                                    <button className='border border-r-2 h-2 hover white p-lr-1'>
                                        <span>le + récent</span>
                                    </button>
                                </div>
                                <div>
                                    <button className='border border-r-2 h-2 hover white p-lr-1'>
                                        <span>le + ancient</span>
                                    </button>
                                </div>
                            </div>
                        }
                    </div>

                    <div className='grid gap'>
                        {
                            AllUserLinks
                            .filter(link=> {
                                if (Search.length)
                                    (link.id.toLowerCase()).match(Search) || (link.name.toLowerCase()).match(Search)
                                else return link
                            })
                            .sort((a, b) => b.views - a.views)
                            .map(link=> {
                                return (
                                    <Link to={'/stats/' + link.id}>
                                        <div    
                                            style={{background: LinkID === link.id ? 'var(--hover-btn)' : ''}}
                                            className='display gap p-1 border-b border-r-1 border justify-s-b white h-2 click hover' 
                                            key={link.id} onClick={e=> setShowStat(link.id)} 
                                        >
                                            <div className='display gap-1rem justify-s-b w-100p'>
                                                <div className='display gap-1rem '> 
                                                    <img src={getFavicon(link.url)} className='w-2 h-2 border-r-100' />
                                                    <div className='grid'>
                                                        <div className='display gap'>
                                                            <span className='f-s-16'>{minimizeString(link.name, 20)}</span>
                                                        </div>
                                                        <div className='display  gap'>
                                                            <span className='link'>{link.shortLink}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='display gap opacity'>
                                                    <img src={'/images/eye-solid.svg'} width={20} />
                                                    <span>{link.views}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Main>
    )
}


function ListStat({stat, label, icon}) {
    return (
        <div className='display justify-s-b grey p-1 border-r-04'>
            <div className='display gap'>
                <img src={'/images/' + icon + '.svg'} width={20} />
                <span>{label}</span>
            </div>
            <div className='display'>
                <span>{stat}</span>
            </div>
        </div>
    )
}


function ProgressBar({percentage}) {
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