import React from 'react'
import { db } from '../../../../../../../App/database/firebase'
import { Edit } from '../functions/Edit'

export default function Header({ props}) {

    const { header } = props
    
    return (
        <div className='grid gap'>
            <label className='f-s-20'>Header</label>

            <div className='grid p-1 border-r-04 white gap border'>
                <div className='display justify-s-b gap'>
                    <span>Title</span>
                </div>
                <div className='display justify-s-b gap'>
                    <span>color</span>
                    <input type='color' 
                        className='opacity-0 absolute' 
                        id='title-color'
                        onChange={e=> {
                            Edit('header.title.color', e.target.value)
                            e.target.parentElement.children[1].style.background = e.target.value 
                        }}
                    />
                    <label htmlFor='title-color' className='f-s-25 f-w-600 click hover border-r-2 w-3 h-3 display justify-c' style={{color : header?.title?.color}}>A</label>
                </div>
                <div className='display justify-s-b gap'>
                    <span>size</span>
                    <input type='range' onChange={e=> {
                       Edit('header.title.fontSize', e.target.value)
                    }} id='title-fontSize' />
                    <label htmlFor='title-fontSize' className='f-s-16 click hover border-r-2 w-3 h-3 display justify-c'>{header?.title?.fontSize + 'px'}</label>
                </div>
            </div>
        </div>
    )
}
