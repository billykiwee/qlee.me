import { ChevronDownIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'


export default function Filter({props}) {

    const filters = [
        {
            name: 'popular',
            text: 'popular',
        },
        {
            name: 'recent',
            text: 'most recent'
        },
        {
            name: 'oldest',
            text: 'oldest',
        },
        {
            name: 'link-in-bio',
            text: 'link in bio',
        }
    ]



    const [showFilter, setShowFilter] = useState(false)


    return (
        <div className='grid gap-1rem'>
            <div className='grid gap-1rem'>
                <div className='display justify-s-b'>
                    <div className='display'>
                        <button 
                            onClick={e=> {
                                props.setFilter(false)
                                props.setSearch(props.Search ? false : true)
                            }}
                            className={!props.Search ? 'c-grey' : 'c-black'} 
                            onMouseOver={e=> e.target.classList.add('c-black')}
                            onMouseOut={e=> e.target.classList.remove('c-black')}
                        >
                            <div >
                                <span className='f-s-14 display gap'>
                                    Rechercher
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={20}><path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" /></svg>
                                </span>
                            </div>
                        </button>
                    </div>

                    <div className='display'>
                        <button 
                            onClick={e=> {
                                props.setSearch(false)
                                props.setFilter(props.Filter ? false : true)
                            }}
                            className={!props.Search ? 'c-grey' : 'c-black'} 
                            onMouseOver={e=> e.target.classList.add('c-black')}
                            onMouseOut={e=> e.target.classList.remove('c-black')}
                        >
                            <div 
                                className={!props.Filter ? 'c-grey' : 'c-black'} 
                                onMouseOver={e=> e.target.classList.add('c-black')} 
                                onMouseOut={e=> e.target.classList.remove('c-black')} 
                            >
                                <span className='f-s-14 display gap'>
                                    Filtre
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={14}><path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z" clipRule="evenodd" /></svg>
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
                {
                    props.Search &&
                    <div className='display'>
                        <input className='div-input h-3 white border-r-1 w-100p' placeholder='Rechercher un lien par son url ou son nom ' onChange={e=> props.setInputSearch(e.target.value.toLowerCase())} />
                    </div>
                }
                {
                    props.Filter &&
                    <div className='display gap'>
                        <label htmlFor="filter-menu">filtres : </label>
                        <select id="filter-menu" onChange={e=> props.setCheckFilter(e.target.value)} className='click h-2 border-r-04 p-04'>
                            {
                            filters.map((filter) => (
                                <option value={filter.name} >{filter.text}</option>
                            ))
                            } 
                        </select>
                    </div>
                }
            </div>
        </div>  
    )
}
