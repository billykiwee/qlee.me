import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Footer() {

    const socialMedia = {
        GitHub : {
            logo1 : '/images/github.svg',
            logo2: '/images/github-white.svg',
            name : 'GitHub',
            color: '#1dd1a1',
            link: 'https://github.com/billykiwee'
        },
        LinkedIn : {
            logo1 : '/images/linkedin.svg',
            logo2: '/images/linkedin-white.svg',
            name : 'LinkedIn',
            color: '#0A66C2',
            link: 'https://www.linkedin.com/in/billy-turpin-a5b283217/'
        },
        Twitter : {
            logo1 : '/images/twitter.svg',
            logo2: '/images/twitter-white.svg',
            name : 'Twitter',
            color: '#47ACDF',
            link: 'https://twitter.com/billy_kiwee'
        }
    }
    


    const location = useLocation()    

    function isLinkInBio() {
        return location.pathname.includes('/@')
    }
    
    

    if (!isLinkInBio())
    return (
        <footer className='white'>
            <div className='display justify-s-b'>
                <div className='align-top display justify-s-b'>
                    <div className='display gap-04'>
                        {
                            Object.values(socialMedia).map(socialMedia=> {
                                return (
                                    <a 
                                        key={socialMedia.name}
                                        href={socialMedia.link}
                                        className='w-2 h-2 border-r-04 click' 
                                        onMouseMove={e=> e.target.style = 'opacity: 0.6'}
                                        onMouseLeave={e=> e.target.style = 'opacity: unset'}
                                    >
                                        <span className='display w-2 h-2'>
                                            <img src={socialMedia.logo1} id={'img-' + socialMedia.name} />
                                        </span>
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <a href='https://www.kiwee.site'>
                        <small className='c-grey click'>made by Kiwee.site</small>
                    </a>
                </div>
            </div>
        </footer>
    )
}
