import React from 'react'
import { ProfilImg } from '../../Website/Home'

export default function Header() {
    return (
        <div className='p-1 m-b-1'>
            <header className='display justify-s-b'>
                <div className='display gap'>
                    <img src='/images/logo.png' className='w-2 h-2' />
                </div>
                <div className='display gap'>
                    <img src={ProfilImg} className='border-r-100 w-2 h-2' />
                    <button className='w-2 h-2'>
                        <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect class="hamburger_change" width="100" height="16" fill="black"></rect>
                            <rect class="hamburger_change1" id="x2" y="31" width="53.5088" height="16" fill="black"></rect>
                            <rect class="hamburger_change2" id="x3" y="62" width="100" height="16" fill="black"></rect>
                        </svg>
                    </button>
                </div>
            </header>
        </div>
    )
}
