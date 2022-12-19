import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Main from '../../App/components/Main'
import { db } from '../../App/database/firebase'
import { useStateValue } from '../../App/provider/StateProvider'
import getFavicon from '../../App/utils/getFavicon'
import { minimizeString } from '../../App/utils/minimizeString'
import '../../App/css/stats.css'


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
        db.collection('links').doc(TopLink?.id).collection('stat').onSnapshot(snapshot => {
            setLinkStat(snapshot.docs.map(doc => doc.data()))
        })
    }, [])


    const [ShowStat, setShowStat] = useState(null)

    useEffect(e=> {
        setShowStat(LinkID ?? TopLink?.id)
    }, [TopLink])



    const [Filter, setFilter] = useState(false)
    const [Search, setSearch] = useState(false)



    return (
        <Main>
            <h2>Statistiques</h2>


            <div className='display blocks align-top gap-1rem'>

                <div className='display'>
                    {
                        UserLinks
                        .filter(isUserAuth=> isUserAuth.user === user?.email)
                        .filter(toplink=> toplink.id === ShowStat)
                        .map(topLink=> {
                      
                            return (
                                <div className='grid gap-2rem justfy-s-b border-r-2 border border-b p-1 w-100p white' key={topLink.id}>
                                    <div className='grid gap'>
                                        <div className='display justify-c'>
                                            <img src={getFavicon(topLink?.url)} width={100} className='border-r-100' /> 
                                        </div>
                                        <div className='grid text-align-c'>
                                            <span className='f-s-20'>{topLink?.name}</span>
                                            <span className='f-s-20 link hover-link'>{topLink?.shortLink}</span>
                                        </div>
                                    </div>
                                    <div className='grid gap'>
                                        <ListStat stat={topLink?.views} label='clics' icon={'eye-solid'} />

                                        <div className='display justify-s-b grey p-1 border-r-04'>
                                            <div className='display gap'>
                                                <img src={'/images/mobile-solid.svg'} width={20} />
                                                <span>mobile</span>
                                            </div>
                                            <div className='display gap-1rem'>
                                                <div className='progress-bar-stat'>
                                                    <div className='blue border-r-2' style={{width: 77 + '%'}}></div>
                                                </div>
                                                <span>77%</span>
                                            </div>
                                        </div>

                                        <div className='display justify-s-b grey p-1 border-r-04'>
                                            <div className='display gap'>
                                                <img src={'/images/pc-solid.svg'} width={20} />
                                                <span>pc</span>
                                            </div>
                                            <div className='display gap-1rem'>
                                                <div className='progress-bar-stat'>
                                                    <div className='blue border-r-2' style={{width: 23 + '%'}}></div>
                                                </div>
                                                <span>23%</span>
                                            </div>
                                        </div>

                                        <div className='grid gap-1rem grey p-1 border-r-04'>
                                            <div className='display gap'>
                                                <img src={'/images/globe-solid.svg'} width={20} />
                                                <span>source du trafic</span>
                                            </div>
                                            <div className='display justify-s-b'>
                                                <div className='display gap'>
                                                    <img src={getFavicon('www.facebook.com')} width={18} className='border-r-100' />
                                                    <span>Facebook</span>
                                                </div>
                                                <div className='display gap-1rem'>
                                                    <div className='progress-bar-stat'>
                                                        <div className='blue border-r-2' style={{width: 53 + '%'}}></div>
                                                    </div>
                                                    <div className='display w-2 justify-c'>
                                                        <span>23%</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='display justify-s-b'>
                                                <div className='display gap'>
                                                    <img src={getFavicon('www.instagram.com')} width={18} className='border-r-100' />
                                                    <span>Instagram</span>
                                                </div>
                                                <div className='display gap-1rem'>
                                                    <div className='progress-bar-stat'>
                                                        <div className='blue border-r-2' style={{width: 38 + '%'}}></div>
                                                    </div>
                                                    <div className='display w-2 justify-c'>
                                                        <span>38%</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='display justify-s-b'>
                                                <div className='display gap'>
                                                    <img src={getFavicon('www.tiktok.com')} width={18} className='border-r-100' />
                                                    <span>Tiktok</span>
                                                </div>
                                                <div className='display gap-1rem'>
                                                    <div className='progress-bar-stat'>
                                                        <div className='blue border-r-2' style={{width: 12 + '%'}}></div>
                                                    </div>
                                                    <div className='display w-2 justify-c'>
                                                        <span>12%</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='display justify-s-b'>
                                                <div className='display gap'>
                                                    <img src={getFavicon('www.Discord.com')} width={18} className='border-r-100' />
                                                    <span>Discord</span>
                                                </div>
                                                <div className='display gap-1rem'>
                                                    <div className='progress-bar-stat'>
                                                        <div className='blue border-r-2' style={{width: 8 + '%'}}></div>
                                                    </div>
                                                    <div className='display w-2 justify-c'>
                                                        <span>8%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className='grid gap-1rem grey p-1 border-r-04'>
                                            <div className='display gap'>
                                                <img src={'/images/localisation-solid.svg'} width={20} />
                                                <span>localisation</span>
                                            </div>
                                            <div className='display justify-s-b'>
                                                <div className='display gap'>
                                                    <span>France</span>
                                                </div>
                                                <div className='display gap-1rem'>
                                                    <div className='progress-bar-stat'>
                                                        <div className='blue border-r-2' style={{width: 88 + '%'}}></div>
                                                    </div>
                                                    <div className='display w-2 justify-c'>
                                                        <span>88%</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='display justify-s-b'>
                                                <div className='display gap'>
                                                    <span>Réunion</span>
                                                </div>
                                                <ProgressBar percentage={63} />
                                            </div>
                                            <div className='display justify-s-b'>
                                                <div className='display gap'>
                                                    <span>Italie</span>
                                                </div>
                                                <div className='display gap-1rem'>
                                                    <div className='progress-bar-stat'>
                                                        <div className='blue border-r-2' style={{width: 5 + '%'}}></div>
                                                    </div>
                                                    <div className='display w-2 justify-c'>
                                                        <span>5%</span>
                                                    </div>
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
                                            className='display gap p-1 border-b border-r-1 border justify-s-b white h-3 click hover' 
                                            key={link.id} onClick={e=> setShowStat(link.id)} 
                                        >
                                            <div className='display gap-1rem justify-s-b w-100p'>
                                                <div className='display gap-1rem '> 
                                                    <Link to={'/edit/' + link.id} className='display'>
                                                        <img src={getFavicon(link.url)} className='w-2 h-2 border-r-100' />
                                                    </Link>
                                                    <div className='grid'>
                                                        <div className='display gap'>
                                                            <span className='f-s-16'>{minimizeString(link.name, 20)}</span>
                                                        </div>
                                                        <div className='display  gap'>
                                                            <a href={link.shortLink}  rel="noopener noreferrer" className='hover-link link'>{link.shortLink}</a>
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
                <div className='blue border-r-2' style={{width: percentage + '%'}}></div>
            </div>
            <div className='display w-2 justify-c'>
                <span>{percentage}%</span>
            </div>
        </div>
    )
}