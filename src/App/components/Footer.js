import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ProfilImg } from '../../Website/Home'
import { useStateValue } from './StateProvider'

export default function Footer() {


    const [{user}] = useStateValue()

    
    return (
        <div className='m-t-1'>
            <footer className='shadow border-r-2 p-1 border'>
                <div className='align-top display justify-s-b'>
                    <div className='display gap-1rem'>
                        <Link to='/dashboard' className='display avatar-header' >
                            <img src={user?.photoURL} className='border-r-100' width={40} height={40} />
                        </Link>
                    </div>
                </div>

            </footer>
        </div>
    )
}
