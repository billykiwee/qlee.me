import React from 'react'
import { ProfilImg } from '../../Website/Home'
import { useStateValue } from './StateProvider'

export default function Header() {


    const [{user}] = useStateValue()

    
    return (
        <div className='m-b-2'>
            <header className='display justify-s-b shadow border-r-2 p-1 border'>
                <div className='display gap click'>
                    <a href='/' className='display'>
                        <img src='/images/logo.png' width={40} height={40} />
                    </a>
                </div>
                <div className='display gap'>
                    <a href='/dashboard' className='display avatar-header'>
                        <img src={user?.photoURL} className='border-r-100' width={40} height={40} />
                    </a>
                    <button className='hamburger border-b hover border'>
                        <span className='display'>
                            <img src='/images/hamburger.svg' width={24} height={24}  />
                        </span>
                    </button>
                </div>
            </header>
        </div>
    )
}
