import { BackwardIcon, ChevronDownIcon, ChevronUpIcon, ForwardIcon, MagnifyingGlassIcon, StarIcon, SwatchIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { useEffect } from 'react'


export default function Filter({props}) {


    const { Search, setInputSearch, setFilter, setSearch, checkFilter, setCheckFilter } = props


    const filters = [
        {
            name: 'popular',
            text: 'Populaire',
            icon: <StarIcon width={14} />
        },
        {
            name: 'recent',
            text: 'Le plus récent',
            icon: <ForwardIcon width={14} />
        },
        {
            name: 'oldest',
            text: 'Le plus ancient',
            icon: <BackwardIcon width={14} />
        },
        {
            name: 'link-in-bio',
            text: 'Link in bio',
            icon: <SwatchIcon width={14} />
        }
    ]

    const [isOpen, setOpen] = useState(false)

    const [width, setWidth] = useState(window.innerWidth)

    useEffect(e=>{
        window.addEventListener('resize', e=> setWidth(window.innerWidth))
    })
    

    return (
        <div className='grid gap-1rem' >
            <div className='grid gap border-r-1 p-04'>
                <div className='display gap'>
                    <div className='display'>
                        <button 
                            onClick={e=> {
                                setFilter(false)
                                setSearch(Search ? false : true)
                            }}
                            className={(Search ? 'grey' : 'white') + ' h-3 w-3 p-1 hover border-r-1  border-b border'} 
                        >
                            <MagnifyingGlassIcon width={20} className='c-black' />
                        </button>
                    </div>

                    <div className='display gap'>
                        <div className='display gap'>
                            <div className='dropdown hover border-r-1 border border-b click w-100p'>
                                <div className='dropdown-header display gap' onClick={e=> setOpen(isOpen ? false : true)} >
                                    <div className='display gap'>
                                        {
                                            filters.map((fil,i)=> {
                                                if (fil.name === checkFilter)
                                                return <span className='display' key={i}>{fil.icon}</span>
                                            })
                                        }
                                        <span className='c-black f-s-14'>{filters.filter(e=> e.name === checkFilter).map(e=> e.text).toString()}</span>
                                    </div>
                                    {
                                        isOpen ? <ChevronUpIcon width={12} /> : <ChevronDownIcon width={12} />
                                    }
                                </div>
                                <div className={`dropdown-body border ${isOpen && 'open'}`}>
                                    {
                                        filters.map((item, i) => {
                                            return (
                                                <div 
                                                    className={(item.name === checkFilter && 'grey') + " dropdown-item hover click display gap"} 
                                                    onClick={e => {setCheckFilter(item.name); setOpen(false) }}
                                                    key={i}
                                                >
                                                    <span className='display c-grey'>{item.icon}</span>
                                                    <span className='c-black f-s-14'>{item.text}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                {
                    Search &&
                    <div className='display'>
                        <div style={{
                            width: '3.2rem',
                            position: 'absolute',
                            top: '0',
                            background: 'var(--grey)',
                            height: '3rem',
                        }}/>
                        <input className='div-input grey h-4 border-r-1 w-100p' placeholder='Rechercher un lien par son url ou son nom ' onChange={e=> setInputSearch(e.target.value.toLowerCase())} />
                    </div>
                }
            </div>
        </div>  
    )
}
