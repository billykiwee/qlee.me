import { CheckIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../../../App/database/firebase'
import { useStateValue } from '../../../../App/provider/StateProvider'
import getFavicon from '../../../../App/utils/getFavicon'
import { minimizeString } from '../../../../App/utils/minimizeString'
import { fetchUserLinks } from '../../../lib/database/fetchUserLinks'
import { getHostName } from '../../../lib/getHostName'
import { DeleteLink } from '../../Links/functions/Delete'


export default function List({props}) {

    const history = useNavigate()

    const linksFilters = props.InputSearch.length 
    ? 
    (
        props.UserLinks
        .filter(link=> {
            if (props.InputSearch)
            return (link.name.toLowerCase()).includes(props.InputSearch) || (link.id.toLowerCase()).includes(props.InputSearch) || (getHostName(link.url).toLowerCase()).includes(props.InputSearch)
        })
    )
    : 
    (
        props.UserLinks
        .sort((a, b) => {
            if (props.checkFilter === 'oldest') return a.date - b.date
            if (props.checkFilter === 'recent') return b.date - a.date
            return b.views - a.views
        })
        .filter(e=> {
            if (props.checkFilter === 'link-in-bio') return e.linkInBio
            else return e
        })
    )



    return (
        <div className='grid gap'>

            <div  className='grid gap' id='div-links' >
                {
                    linksFilters
                    .map(link=> {

                        return (
                            
                            <div className='display justify-s-b' id={'link-' + link.id} key={link.id}>
                                <Link to={'/stats/' + link.id} key={link.id} className='w-100p' >
                                    <div    
                                        style={{background: props.LinkID === link.id ? 'var(--hover-btn)' : ''}}
                                        className='display gap p-1 border-b border-r-1 hover border justify-s-b white h-2 click ' 
                                        key={link.id} onClick={e=> props.setShowStat(link.id)} 
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
                                                <small>{link.views}</small>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className='display justify-c p-04'>
                                    <button className='display w-3 h-3  hover border-r-100'
                                        onClick={e=> 
                                            DeleteLink({
                                                link       : link,
                                                setMsg     : props.setMsg,
                                                setShowStat: props.setShowStat,
                                                type       : 'stats',
                                                history: history
                                            })
                                        }
                                    >
                                        <TrashIcon width={20} className='c-red'/>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
