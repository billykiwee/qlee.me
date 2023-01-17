import { ChevronDownIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { Edit } from '../functions/Edit'

export default function Header({ props }) {

    const { header, LinkInBioSettings } = props

    const [open, setOpen] = useState(false)
    
    return (
        <div className='grid gap' style={{ borderBottom: '1px solid #494e55', padding: '1rem 0' }} >
            
            <div className='display justify-s-b'>
                <label className='f-s-20'>Header</label>
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
                <div className='grid gap'>

                    <div className='grid gap-1rem p-1 border-r-04 grey border'>

                        {/* <div className='grid gap'>
                            <div className='display justify-s-b'>
                                <span>Frame</span>
                                <SwitchInput onChange={e=> Edit('header.frame.active', e.target.checked, LinkInBioSettings.id) } dimension={0.8} />
                            </div>
                            <div className='display justify-s-b'>
                                <span>background</span>
                                <input type='color' 
                                    className='opacity-0 absolute' 
                                    id='frame-background'
                                    onChange={e=> {
                                        Edit('header.frame.background', e.target.value, LinkInBioSettings.id)
                                        e.target.parentElement.children[1].style.background = e.target.value 
                                    }}
                                />
                                <label htmlFor='frame-background' className='w-2 h-2 click hover border-r-2 w-3 h-3 display justify-c' style={{background : header?.frame?.background}}></label>
                            </div>
                            <div className='display justify-s-b'>
                                <span>radius</span>
                                <input type='range' 
                                    id='frame-background'
                                    onChange={e=> {
                                        Edit('header.frame.radius', e.target.value, LinkInBioSettings.id)
                                    }}
                                />
                                <label htmlFor='frame-radius'>{ header?.frame?.radius }px</label>
                            </div>
                            <div className='display justify-s-b'>
                                <span>opacity</span>
                                <input type='range' 
                                    id='frame-background'
                                    className='h-1'
                                    onChange={e=> {
                                        Edit('header.frame.opacity', e.target.value / 100, LinkInBioSettings.id)
                                    }}
                                />
                                <label htmlFor='frame-opacity'>{ header?.frame?.opacity }</label>
                            </div>
                        </div> */}

                        <div className='display justify-s-b gap'>
                            <label className='f-s-20'>Title</label>
                        </div>

                        <div className='grid gap'>
                            <div className='display justify-s-b h-1'>
                                <span>color</span>
                                <div className='display justify-s-b gap'>
                                    <input type='color' 
                                        className='opacity-0 absolute h-1' 
                                        id='title-color'
                                        onChange={e=> {
                                            Edit('header.title.color', e.target.value, LinkInBioSettings.id)
                                            e.target.parentElement.children[1].style.background = e.target.value 
                                        }}
                                    />
                                    <label htmlFor='title-color' className='f-s-25 f-w-600 click hover border-r-2 w-3 h-3 display justify-c' style={{color : header?.title?.color}}>A</label>
                                </div>
                            </div>

                            <div className='display justify-s-b'>
                                <span>size</span>
                                <div className='display justify-s-b gap'>
                                    <input type='range' className='h-1' style={{width: '5rem'}} id='title-fontSize' value={header?.title?.fontSize}
                                        onChange={e=> {
                                            Edit('header.title.fontSize', e.target.value, LinkInBioSettings.id)
                                        }} 
                                    />
                                    <label htmlFor='title-fontSize' className='f-s-16 click hover border-r-2 w-3 h-3 display justify-c'>{header?.title?.fontSize + 'px'}</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='grid p-1 border-r-04 grey gap border'>
                        <div className='display justify-s-b gap'>
                            <span>Description</span>
                        </div>
                        <div className='grid justify-s-b gap'>
                            <span>Text</span>
                            <div>
                                <textarea className='white' value={header?.description?.text} onChange={e=> {
                                    Edit('header.description.text', e.target.value, LinkInBioSettings.id)
                                }} />
                            </div>
                        </div>
                        <div className='display justify-s-b gap'>
                            <span>color</span>
                            <input type='color' className='opacity-0 absolute h-1' onChange={e=> {
                                Edit('header.description.color', e.target.value, LinkInBioSettings.id)

                                e.target.parentElement.children[1].style.background = e.target.value 
                            }} id='description-color'/>
                            <label htmlFor='description-color' className='f-s-25 f-w-600 click hover border-r-2 w-3 h-3 display justify-c' style={{color : header?.description?.color}}>A</label>
                        </div>
                        <div className='display justify-s-b gap'>
                            <span>size</span>
                            <input type='range' className='h-1' onChange={e=> {
                                Edit('header.description.fontSize', e.target.value, LinkInBioSettings.id)
                            }} id='description-fontSize' />
                            <label htmlFor='description-fontSize' className='f-s-16 click hover border-r-2 w-3 h-3 display justify-c'>{header?.description?.fontSize + 'px'}</label>
                        </div>
                    </div>
                </div>
            }
            </div>

    )
}
