import React from 'react'
import { Link } from 'react-router-dom'
import getFavicon from '../../App/utils/getFavicon'
import { minimizeString } from '../../App/utils/minimizeString'


export default function ListLink({link}) {

    return (
        <div className='display gap p-1 border-b border-r-1 border justify-s-b white h-3' key={link.id}>
            <div className='display gap-1rem'>
                <Link to={'/edit/' + link.id} className='display'>
                    <img src={getFavicon(link.url)} className='w-2 h-2 border-r-100' />
                </Link>
                <div className='grid '> 
                    <div className='display gap'>
                        <span className='f-s-16'>{minimizeString(link.name, 20)}</span>
                    </div>

                    <div className='grid gap'>
                        <div className='display gap'>
                            <a href={link.shortLink}  rel="noopener noreferrer" className='hover-link link'>{link.shortLink}</a>
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
                    <button className=' hover'>
                        <span className='display w-1 h-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                        </span>
                    </button>
                </Link>
            </div>
        </div>
    )
}
