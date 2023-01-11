import React from 'react'
import { BookmarkIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Link, useNavigate } from 'react-router-dom'
import getFavicon from '../../../../App/utils/getFavicon'
import { minimizeString } from '../../../../App/utils/minimizeString'
import { getHostName } from '../../../lib/getHostName'
import { DeleteLink } from '../../Links/functions/Delete'
import { useStateProps } from '../../../../App/provider/ContextProvider'


export default function List({props}) {


    const { LinkID, InputSearch, ShowStat, setShowStat, UserLinks, checkFilter, setMsg, popUp, snackBar } = props

    const history = useNavigate()
    
    const linksFilters = InputSearch.length 
    ? 
    (
        UserLinks
        .filter(link=> {
            if (InputSearch)
            return (link.name.toLowerCase()).includes(InputSearch) || (link.id.toLowerCase()).includes(InputSearch) || (getHostName(link.url).toLowerCase()).includes(InputSearch)
        })
    )
    : 
    (
        UserLinks?.sort((a, b) => {
            if (checkFilter === 'oldest') return a.date - b.date
            if (checkFilter === 'recent') return b.date - a.date
            return b.views - a.views
        })
        .filter(e=> {
            if (checkFilter === 'link-in-bio') return e.linkInBio
            else return e
        })
    )

    const { stats } = useStateProps()
    const linkStatViews = (LinkID) => stats.filter(e=> e.LinkID === LinkID).length


    return (
        <div className='grid gap'>

            <div  className='grid gap' id='div-links' >
                {
                    linksFilters
                    ?.map(link=> {

                        return (
                            
                            <div className='display justify-s-b' id={'link-' + link.id} key={link.id}>
                                <Link to={'/stats/' + link.id} key={link.id} className='w-100p' >
                                    <div    
                                        style={{background: LinkID === link.id ? 'var(--hover-btn)' : ''}}
                                        className='display gap p-1 border-b border-r-1 hover border justify-s-b white h-2 click ' 
                                        key={link.id} onClick={e=> setShowStat(link.id)} 
                                    >
                                        <div className='display gap-1rem'>
                                            <img src={getFavicon(link)} className='border-r-100' width={30} />
                                            <div className='grid '> 
                                                <div className='display gap-04'>
                                                    <span className='f-s-16 c-black'>{minimizeString(link.name, 20)}</span>
                                                    {
                                                        link.linkInBio &&
                                                        <BookmarkIcon width={12} className='c-yellow' />
                                                    }
                                                </div>
                            
                                                <div className='grid gap'>
                                                    <div className='display gap-04'>
                                                        <small href={'https://' + link.shortLink} className='hover-link link'>{link.shortLink}</small>
                                                        <div className='display'>
                                                            <div className='display disable green absolute border-r-04 p-04' id={'link-' + link.id} >
                                                                <small>Copié</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='display gap-1rem'>
                                            <div className='display gap-04 opacity'>
                                                <EyeIcon width={16} />
                                                <small>{linkStatViews(link.id)}</small>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className='display p-04'>
                                    <div className='display w-2 h-2 justify-c click hover border-r-100'
                                        onClick={e=> 
                                            DeleteLink({
                                                link,
                                                setMsg,
                                                setShowStat,
                                                type       : 'stats',
                                                history,
                                                popUp,
                                                snackBar
                                            })
                                        }
                                    >
                                        <TrashIcon width={20} className='c-red'/>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
