import React from 'react'

export function Footer() {
    return (

        <div className='display justify-c' style={{position: 'sticky', bottom: '1rem'}} >
            <a href='/' className='display gap grey p-04 border-r-04' id='link-qlee'>
                <img src='/favicon.ico' width={28} />
                <small className='f-w-300'>Made by Qlee.me</small>
            </a>
        </div>
    )
}
