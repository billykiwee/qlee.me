import React from 'react'
import { Link } from 'react-router-dom'
import { isUserPremium } from '../../Admin/settings/isPremium'
import getFavicon from '../../App/utils/getFavicon'
import { minimizeString } from '../../App/utils/minimizeString'


export default function ListLink({links, User}) {

    return (
        <> 
            {
                links
                .map((link, i)=> {

                    return (

                        <div className='display gap p-1 border-b border-r-1 border justify-s-b white h-3' key={i} >
                            <div className='display gap-1rem'>
                                <Link to={'/edit/' + link.id} className='display'>
                                    <img src={getFavicon(link)} className='w-2 h-2 border-r-100' />
                                </Link>
                                <div className='grid '> 
                                    <div className='display gap'>
                                        <span className='f-s-16'>{minimizeString(link.name, 20)}</span>
                                    </div>
                
                                    <div className='grid gap'>
                                        <div className='display gap'>
                                            <a href={'https://' + link.shortLink}  rel="noopener noreferrer" className='hover-link link'>{link.shortLink}</a>
                                            <div className='display gap'>
                                                <button 
                                                    className='display border-r-04 w-2 hover h-2 border border-b' 
                                                    onClick={e=> {
                                                        navigator.clipboard.writeText(link.shortLink)
                                                        let div = document.querySelector('#link-' + link.id)
                                                        div.style.display = 'flex'
                                                        setTimeout(e=> div.style.display = 'none', 1500)
                                                    }} 
                                                >
                                                    <img src='/images/copy.svg' width={16} />
                                                </button>
                                                <div className='display disable green absolute border-r-04 p-04' id={'link-' + link.id} >
                                                    <small>Copié</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Link to={'/edit/' + link.id}>
                                    <button className='w-3 h-3 border-r-100 hover'>
                                        <img src='/images/chevron-right.svg' width={20} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )
                }).reverse()
            }
            <div className='display justify-c'>
                {
                    links.length < isUserPremium(User).max_links 
                    ?
                    <div className='display gap'>
                        <img src='/images/info.svg' className='w-1 h-1 opacity'  />
                        <small className='c-grey f-w-300'>
                            Il te reste encore {isUserPremium(User).max_links - links.length} {isUserPremium(User).max_links - links.length > 1 ? 'liens gratuits' : 'lien gratuit'}
                        </small>
                    </div>
                    :
                    <div className='grid gap-04'>
                        <div className='display gap'>
                            <img src='/images/info.svg' className='w-1 h-1'  />
                            <small className='c-red f-w-300'>Tu dois upgrade ton compte</small>
                        </div>
                        <div className='display justify-c'>
                            <a className='f-w-300 link'>Voir les plans</a>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
