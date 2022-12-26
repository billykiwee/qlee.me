import { BookmarkIcon, EyeIcon, LinkIco } from '@heroicons/react/24/outline'
import { SwatchIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import formatDate from '../../../../App/utils/formatDate'
import getFavicon from '../../../../App/utils/getFavicon'


export default function Articles({links}) {

    const [topLink, setTopLink] = useState({})

    useEffect(e=> {

        try {
            const top = links.length > 0 && links.sort((a, b) => b.views - a.views)[0]
            setTopLink(top)
        }
        catch (err) {
            console.log(err);
        }

    }, [links])


    const articles = [
        {
            name: 'Mon compte',
            icon:  <UserCircleIcon width={22} className='c-black' />,
            img: 'https://images.unsplash.com/photo-1664574652984-5b5f769bef07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
            link: '/login'
        },
        {
            name: 'Link in bio',
            icon:  <SwatchIcon width={22} className='c-black' />,
            img: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
            link: '/link-in-bio'
        },
    ]




    return (
       /*  <div className='display gap-1rem border border-b white border-r-1 hover ' >
            <Link to={'/stats/' + topLink.id} className='display gap-1rem w-100p' key={topLink.id}>
                <div className='display gap-1rem p-1 w-100p'>                                
                    <div className='grid gap-1rem'>
                        <span className='f-s-16'>Meilleur lien</span>

                        <div className='display gap-1rem justify-s-b align-top'>
                            <div className='display gap'>
                                <img src={topLink.icon ?? getFavicon(topLink?.url)} width={44} className='border-r-2' />
                                <div className='grid'>
                                    <div className='display gap'>
                                        <BookmarkIcon width={16} />
                                        <span>{topLink.name}</span>
                                    </div>
                                    <div className='display gap'>
                                        <LinkIcon width={16} />
                                        <span className='link'>{topLink.shortLink}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='display gap'>
                                <EyeIcon width={16} />
                                <span>{topLink.views}</span>
                                <span>clics</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div> */
        <div className='display gap-1rem' style={{overflowX: 'scroll'}}>
            {
                articles
                .map(article=> {
                    return (
                        <Link to={article.link}>
                            <div className='grid white border-r-1 border-b'>
                                <div className='grid border border-r-1 white p-1 hover' 
                                    style={{width: '188px',
                                        height: '122px',
                                        backgroundImage: `url(${article.img})`,
                                        backgroundPosition: 'center', 
                                        backgroundSize: 'cover',
                                        borderBottomLeftRadius: 0,
                                        borderBottomRightRadius: 0,
                                    }}
                                >
                                </div>
                                <div className='display gap justify-c  p-1'>
                                    {article.icon}
                                    <span>{article.name}</span>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}
