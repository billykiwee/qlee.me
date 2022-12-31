import { BackwardIcon, ChevronDownIcon, ChevronUpIcon, ForwardIcon, FunnelIcon, MagnifyingGlassIcon, StarIcon, SwatchIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'


export default function Filter({props}) {

    const filters = [
        {
            name: 'popular',
            text: 'Populaire',
            icon: <StarIcon width={16} className='c-grey' />
        },
        {
            name: 'recent',
            text: 'Le plus récent',
            icon: <ForwardIcon width={16} className='c-grey' />
        },
        {
            name: 'oldest',
            text: 'Le plus ancient',
            icon: <BackwardIcon width={16} className='c-grey' />
        },
        {
            name: 'link-in-bio',
            text: 'Link in bio',
            icon: <SwatchIcon width={16} className='c-grey' />
        }
    ]



    const [isOpen, setOpen] = useState(false)
    

    return (
        <div className='grid gap-1rem'>
            <div className='grid gap-1rem white border-r-1 border p-1'>
                <div className='display justify-s-b'>
                    <div className='display'>
                        <button 
                            onClick={e=> {
                                props.setFilter(false)
                                props.setSearch(props.Search ? false : true)
                            }}
                            className={(props.Search ? 'grey' : 'white') + ' h-2 p-1 border-r-1 border '} 
                        >
                            <div>
                                <span className='f-s-14 display gap c-black'>
                                    Rechercher
                                    <MagnifyingGlassIcon width={20} className='c-black' />
                                </span>
                            </div>
                        </button>
                    </div>

                    <div className='display gap'>
                        <div className='w-100p'>
                            <span>Filtre :</span>
                        </div>
                        {
                            props.Filter &&
                            <div className='display gap'>
                                <div className='dropdown border-r-1 border click w-100p'>
                                    <div className='dropdown-header' onClick={e=> setOpen(isOpen ? false : true)}>
                                        <div className='display gap'>
                                            {
                                                filters.map(fil=> {
                                                    if (fil.name === props.checkFilter)
                                                    return <span className='display'>{fil.icon}</span>
                                                })
                                            }
                                            <span>{filters.filter(e=> e.name === props.checkFilter).map(e=> e.text).toString()}</span>
                                        </div>
                                        {
                                            isOpen ? <ChevronUpIcon width={16} /> : <ChevronDownIcon width={16} />
                                        }
                                    </div>
                                    <div className={`dropdown-body ${isOpen && 'open'}`}>
                                        {
                                            filters.map(item => {
                                                return (
                                                    <div className={(item.name === props.checkFilter && 'grey') + " dropdown-item hover click display gap"} onClick={e => {props.setCheckFilter(item.name); setOpen(false) }}>
                                                        <span className='display'>{item.icon}</span>
                                                        <span>{item.text}</span>
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
                {
                    props.Search &&
                    <div className='display'>
                        <input className='div-input h-3 white border-r-1 w-100p' placeholder='Rechercher un lien par son url ou son nom ' onChange={e=> props.setInputSearch(e.target.value.toLowerCase())} />
                    </div>
                }
            </div>
        </div>  
    )
}
