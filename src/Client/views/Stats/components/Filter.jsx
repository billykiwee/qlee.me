import { BackwardIcon, ChevronDownIcon, ChevronUpIcon, ForwardIcon, FunnelIcon, MagnifyingGlassIcon, StarIcon, SwatchIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'


export default function Filter({props}) {

    const filters = [
        {
            name: 'popular',
            text: 'popular',
            icon: <StarIcon width={16} className='c-grey' />
        },
        {
            name: 'recent',
            text: 'most recent',
            icon: <ForwardIcon width={16} className='c-grey' />
        },
        {
            name: 'oldest',
            text: 'oldest',
            icon: <BackwardIcon width={16} className='c-grey' />
        },
        {
            name: 'link-in-bio',
            text: 'link in bio',
            icon: <SwatchIcon width={16} className='c-grey' />
        }
    ]



    const [isOpen, setOpen] = useState(false)
    

    return (
        <div className='grid gap-1rem'>
            <div className='grid gap-1rem'>
                <div className='display gap'>
                    <div className='display'>
                        <button 
                            onClick={e=> {
                                props.setFilter(false)
                                props.setSearch(props.Search ? false : true)
                            }}
                            className={(props.Search ? 'blue' : 'white') + ' h-2 p-1 border-r-1 border '} 
                        >
                            <div >
                                <span className='f-s-14 display gap'>
                                    Rechercher
                                    <MagnifyingGlassIcon width={20} />
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
                            className={(props.Filter ? 'blue' : 'white') + ' h-2 p-1 border-r-1 border '} 
                            onMouseOver={e=> e.target.classList.add('c-black')}
                            onMouseOut={e=> e.target.classList.remove('c-black')}
                        >
                            <div>
                                <span className='f-s-14 display gap'>
                                    Filtre
                                    <FunnelIcon  width={18} />
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
                        <div className='dropdown border-r-1 border click'>
                            <div className='dropdown-header' onClick={e=> setOpen(isOpen ? false : true)}>
                                <div className='display gap'>
                                    {
                                        filters.map(fil=> {
                                            if (fil.name === props.checkFilter)
                                            return <span className='display'>{fil.icon}</span>
                                        })
                                    }
                                    {props.checkFilter}
                                </div>
                                {
                                    isOpen ?  <ChevronUpIcon width={16} /> : <ChevronDownIcon width={16} />
                                }
                            </div>
                            <div className={`dropdown-body ${isOpen && 'open'}`}>
                                {
                                    filters.map(item => {
                                        return (
                                            <div className="dropdown-item hover click display gap" onClick={e => {props.setCheckFilter(item.name); setOpen(false) }}>
                                                <span className='display'>{item.icon}</span>
                                                <span>{item.name}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>  
    )
}
