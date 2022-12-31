import { BookmarkIcon, EyeIcon, LinkIco } from '@heroicons/react/24/outline'
import { SwatchIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";



export default function Articles({links}) {


    const articles = [
        {
            name: 'Mon compte',
            icon: <UserCircleIcon width={22} className='c-black' />,
            img : 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
            link: '/profil'
        },
        {
            name: 'Link in bio',
            icon: <SwatchIcon width={22} className='c-black' />,
            img : 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
            link: '/link-in-bio'
        }
    ]

    return (
        <div className='display gap-1rem' style={{overflowX: 'scroll'}}>
            
            <Swiper 
                slidesPerView={1.66} 
                spaceBetween={18}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
            >
                {
                    articles
                    .map(article=> {
                        return (

                            <SwiperSlide className='m-b-2' key={article.name}>
                                <Link to={article.link} >
                                    <div className='grid white border-r-1 border-b hover'>
                                        <div className='grid border-r-1 white p-1' 
                                            style={{
                                                height: '144px',
                                                backgroundImage: `url(${article.img})`,
                                                backgroundPosition: 'center', 
                                                backgroundSize: 'cover',
                                                borderBottomLeftRadius: 0,
                                                borderBottomRightRadius: 0,
                                            }}
                                        >
                                        </div>
                                        <div className='display gap justify-c h-2 p-1'>
                                            <div className='display gap-04'>
                                                {article.icon}
                                                <span>{article.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}
