import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ProfilImg } from '../../Website/Home'
import { useStateValue } from './StateProvider'

export default function Footer() {


    const [{user}] = useStateValue()

    
    return (
        <footer>
            <div className='display justify-s-b'>
                <div className='align-top display justify-s-b'>
                    <div>
                        <a href='https://github.com/billykiwee/loopme'>
                            <span className='display'>
                                <img src='/images/github.svg' className='w-3 h-3' />
                            </span>
                        </a>
                    </div>
                </div>
                <div>
                    <small className='c-grey'>made by Kiwee.site</small>
                </div>
            </div>
        </footer>
    )
}
