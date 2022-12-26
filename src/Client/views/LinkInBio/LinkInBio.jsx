import { ChevronRightIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Main from '../../../App/components/Main'
import { useStateValue } from '../../../App/provider/StateProvider'
import getFavicon from '../../../App/utils/getFavicon'
import { fetchUser } from '../../lib/database/fetchUser'
import { fetchUserLinks } from '../../lib/database/fetchUserLinks'

export default function LinkInBio() {

    const [{user}] = useStateValue()


    const [User,setUser] = useState([])
    const [UserLinks,setUserLinks] = useState([])

    useEffect(e=> {
        fetchUser(setUser, user?.email)
        fetchUserLinks(setUserLinks, user?.email)

    }, [user?.email])



 
    return (
        <Main className='display p-1' style={{
            height: '100%',
            display: 'grid',
            aligItems: 'stretch',
            alignContent: 'space-between',
        }}
        >

            <div className='grid gap-1rem w-100p'>  
                
                <div className='grid gap p-1'>
                    <div className='display justify-c'>
                        <img src={User.photoURL} width={80} />
                    </div>
                    <div className='grid gap-04'>
                        <div className='display justify-c'>
                            <span className='f-s-25 f-w-400'>{User.name}</span>
                        </div>
                        <div className='display justify-c'>
                            <span className='f-s-16 c-grey f-w-300 text-align-c'>Développeur web React... Bienvenue dans mon univers !</span>
                        </div>
                    </div>
                </div>

                <div className='grid gap'>
                    {
                        UserLinks
                        .filter(e=> e.linkInBio === true)
                        .map(link=> {

                            return (
                                <a href={'https://' +link.shortLink} key={link.url}>
                                    <div className='display border white border-r-1 border-b p-1 hover click h-2' >
                                        <div className='display justify-c absolute'>
                                            <img src={link.icon ?? getFavicon(link.url)} width={40} className='border-r-100' />
                                        </div>
                                        <div className='display justify-c w-100p'>
                                            <span className='f-s-16'>{link.name}</span>
                                        </div>
                                    </div>
                                </a>
                            )
                        })
                    }
                </div>
            </div>
            

            <div className='display justify-c' style={{position: 'sticky', bottom: '1rem'}} >
                <a href='/' className='display gap' id='link-qlee' 
                    onMouseEnter={e=> {
                        document.querySelector('#link-qlee').children[1].style.display = 'flex'
                    }}
                    onMouseLeave={e=> {
                        document.querySelector('#link-qlee').children[1].style.display = 'none'
                    }}
                >
                    <img src='/favicon.ico' width={32} />
                    <span className='c-grey f-w-300 disable'>Made by Qlee.me</span>
                </a>
            </div>
        </Main>
    )
}
