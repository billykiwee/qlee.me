import React from 'react'
import { Link } from 'react-router-dom'
import getFavicon from '../../../../App/utils/getFavicon'
import { minimizeString } from '../../../../App/utils/minimizeString'
import { getHostName } from '../../../lib/getHostName'


export default function List({props}) {

    const links = props.InputSearch.length 
    ? 
    (
        props.UserLinks
        .filter(link=> {
            if (props.InputSearch)
            return (link.name.toLowerCase()).includes(props.InputSearch) || (link.id.toLowerCase()).includes(props.InputSearch) || (getHostName(link.url).toLowerCase()).includes(props.InputSearch)
        })
    )
    : props.UserLinks

    
    return (
        <div className='grid gap'>
            {
                links
                .sort((a, b) => b.views - a.views)
                .map(link=> {
                    return (
                        <Link to={'/stats/' + link.id} key={link.id}>
                            <div    
                                style={{background: props.LinkID === link.id ? 'var(--hover-btn)' : ''}}
                                className='display gap p-1 border-b border-r-1 hover border justify-s-b white h-2 click' 
                                key={link.id} onClick={e=> props.setShowStat(link.id)} 
                            >
                                <div className='display gap-1rem justify-s-b w-100p'>
                                    <div className='display gap-1rem '> 
                                        <img src={getFavicon(link)} className='w-2 h-2 border-r-100' />
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
    )
}
