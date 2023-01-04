import { BackwardIcon, ChevronDownIcon, ChevronUpIcon, ForwardIcon, FunnelIcon, MagnifyingGlassIcon, StarIcon, SwatchIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { useEffect } from 'react'


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

    const [width, setWidth] = useState(window.innerWidth)

    useEffect(e=>{
        window.addEventListener('resize', e=> setWidth(window.innerWidth))
    })
    

    return (
        <div className='grid gap-1rem' style={{
            position: 'sticky',
            top     : '6rem',
            zIndex  : 9,
            marginTop: width > 740 && '4rem'
        }}>
            <div className='grid gap-1rem white border-r-1 border p-1'>
                <div className='display justify-s-b'>
                    <div className='display'>
                        <button 
                            onClick={e=> {
                                props.setFilter(false)
                                props.setSearch(props.Search ? false : true)
                            }}
                            className={(props.Search ? 'grey' : 'white') + ' h-3 w-3 p-1 border-r-2 border '} 
                        >
                            <MagnifyingGlassIcon width={20} className='c-grey' />
                        </button>
                    </div>

                    <div className='display gap'>
                        <div className='display gap'>
                            <div className='dropdown border-r-2 border click w-100p'>
                                <div className='dropdown-header display gap' onClick={e=> setOpen(isOpen ? false : true)} >
                                    <div className='display gap'>
                                        {
                                            filters.map((fil,i)=> {
                                                if (fil.name === props.checkFilter)
                                                return <span className='display' key={i}>{fil.icon}</span>
                                            })
                                        }
                                        <span className='c-black f-s-14'>{filters.filter(e=> e.name === props.checkFilter).map(e=> e.text).toString()}</span>
                                    </div>
                                    {
                                        isOpen ? <ChevronUpIcon width={12} /> : <ChevronDownIcon width={12} />
                                    }
                                </div>
                                <div className={`dropdown-body ${isOpen && 'open'}`}>
                                    {
                                        filters.map((item, i) => {
                                            return (
                                                <div 
                                                    className={(item.name === props.checkFilter && 'grey') + " dropdown-item hover click display gap"} 
                                                    onClick={e => {props.setCheckFilter(item.name); setOpen(false) }}
                                                    key={i}
                                                >
                                                    <span className='display'>{item.icon}</span>
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
                    props.Search &&
                    <div className='display'>
                        <input className='div-input grey h-3 border-r-1 w-100p' placeholder='Rechercher un lien par son url ou son nom ' onChange={e=> props.setInputSearch(e.target.value.toLowerCase())} />
                    </div>
                }
            </div>
        </div>  
    )
}
