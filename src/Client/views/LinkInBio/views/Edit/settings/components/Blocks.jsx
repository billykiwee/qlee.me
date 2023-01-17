import { ChevronDownIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { Edit } from '../../components/Edit'

export default function Blocks({ props }) {

    const { blocks, LinkInBioSettings } = props

    const [open, setOpen] = useState(false)
    
    return (
        <div className='grid justify-s-b gap-1rem'>

            <div className='display justify-s-b'>
                <label className='f-s-20'>Blocks</label>
                <div>
                    <button className='border-r-2 p-1 w-2 h-2 hover border white' onClick={e=> setOpen(open ? false : true)} >
                        <span className='display justify-c'>
                            <ChevronDownIcon width={20} className='c-black' />
                        </span>
                    </button>
                </div>
            </div>

            {
                open &&
                <div className='grid p-1 border-r-04 white border'>

                    <div className='grid gap'>
                        <div className='display justify-s-b gap'>
                            <span>Border</span>
                            <div className='display gap'>
                                <div className='display gap'>   
                                    <input type='radio' id='radius10' name='radius' />
                                    <label className='click w-3 h-2 border' style={{border: '1px solid var(--black)'}} htmlFor='radius10' 
                                        onClick={e=>
                                            Edit('blocks.radius', 6, LinkInBioSettings.id)
                                        } 
                                    />
                                </div>
                                <div className='display gap'>   
                                    <input type='radio' id='radius100' name='radius' />
                                    <label className='click w-3 h-2 border border-r-100' style={{border: '1px solid var(--black)'}} htmlFor='radius100' 
                                        onClick={e=>  Edit('blocks.radius', 100, LinkInBioSettings.id) } 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='display justify-s-b gap'>
                            <span>Color</span>
                            <label className='w-3 h-2 border-r-100 border click' htmlFor='textColor' style={{background : blocks?.color}}  />
                            <input type='color' className='opacity-0 absolute' onChange={e=> {

                                Edit('blocks.color', e.target.value, LinkInBioSettings.id)
                                
                                e.target.parentElement.children[1].style.background = e.target.value 
                            }} id='textColor' />
                        </div>

                        <div className='display justify-s-b gap'>
                            <span>Text Color</span>
                            <label className='w-3 h-2 border-r-100 border click' htmlFor='color' style={{background : blocks?.textColor}} />
                            <input type='color' className='opacity-0 absolute' onChange={e=> {
                                Edit('blocks.textColor', e.target.value, LinkInBioSettings.id)

                                e.target.parentElement.children[1].style.background = e.target.value 
                            }} id='color' />
                        </div>

                        <div className='display justify-s-b gap'>
                            <span>Logo</span>
                            <input type='checkbox' checked={blocks?.icon} onChange={e=> {
                                Edit('blocks.icon', e.target.checked, LinkInBioSettings.id)
                                
                            }}  />
                        </div>
                    </div>

                </div>
            }
            
        </div>
    )
}
