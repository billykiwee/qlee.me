import { ChevronRightIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isUserPremium } from '../../../../Admin/settings/isPremium'
import getFavicon from '../../../../App/utils/getFavicon'
import { minimizeString } from '../../../../App/utils/minimizeString'
import { CopyClip } from '../../Links/views/Edit/components/CopyClip'
import { IsLinkInBio } from '../../Links/views/Edit/components/IsLinkInBio'



export function List({ links, User }) {

    const [linkListed, add] = useState(10)



    if (!links) return

    return (
        <div className='grid gap-1rem'> 

            <div className='grid gap-1rem list'> 
                {
                    links.sort((a,b)=> b.date - a.date)
                    .map((link, i)=> {
                        
                        return (

                            <article className='display gap p-1 border-b border-r-1 border justify-s-b white h-2' key={i} >
                                <div className='display gap-1rem'>
                                    <Link to={'/edit/' + link.id} className='display'>
                                        <img src={getFavicon(link)} className='w-2 h-2 border-r-100' />
                                    </Link>
                                    <div className='grid '> 
                                        <div className='display gap-04'>
                                            <span className='f-s-16'>{minimizeString(link.name, 20)}</span>
                                            <IsLinkInBio Link={link} />
                                        </div>
                    
                                        <div className='grid gap'>
                                            <div className='display gap-04'>
                                                <a href={'https://' + link.shortLink}  rel="noopener noreferrer" className='hover-link link'>{link.shortLink}</a>
                                                <CopyClip link={link} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Link to={'/edit/' + link.id}>
                                        <div className='display justify-c w-2 h-2 border-r-100 hover'>
                                            <ChevronRightIcon width={20} className='c-black'  />
                                        </div>
                                    </Link>
                                </div>
                            </article>
                        )
                    })
                    .splice(0, linkListed)
                }
            </div>

            {
                links.length > linkListed &&
                <div className='display'>
                    <button className='white h-4 p-1 border-r-1 shadow border' onClick={e=> links.length > 10 && add(linkListed + 10)} >
                        <span className='f-s-16 c-black'>Afficher + ({(links.length < 10 ? links.length : linkListed) + ' liens sur ' + links.length})</span>
                    </button>
                </div>
            }
            
            <div className='display justify-c m-t-1'>
                {
                    links.length < isUserPremium(User).max_links 
                    ?
                    <div className='display gap'>
                        <InformationCircleIcon width={20} className='c-black' />
                        <small className='c-grey f-w-300'>
                            Il te reste {isUserPremium(User).max_links - links.length} {isUserPremium(User).max_links - links.length > 1 ? 'disponibles' : 'disponible'}
                        </small>
                    </div>
                    :
                    <div className='grid gap-04'>
                        <div className='display gap'>
                            <InformationCircleIcon width={20} className='c-black' />
                            <small className='c-red f-w-300'>Tu dois upgrade ton compte</small>
                        </div>
                        <div className='display justify-c'>
                            <a className='f-w-300 link'>Voir les plans</a>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
