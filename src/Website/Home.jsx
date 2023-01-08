import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination, Mousewheel, Keyboard } from "swiper";


import Main from '../App/components/Main'
import { BanknotesIcon, LinkIcon, PencilSquareIcon, RocketLaunchIcon, ScissorsIcon, ShareIcon, SwatchIcon, UserIcon } from '@heroicons/react/24/solid';
import { formatNumber } from '../App/utils/formatNumber';
import formatCurrency from '../App/utils/formatCurrency';
import { fetchLinks } from '../Client/lib/database/links/fetchLinks';
import ListLink from '../Client/views/Dashboard/components/ListLink';
import { SwitchInput } from '../App/components/Switch';
import getFavicon from '../App/utils/getFavicon';

export default function Home() {

    const subjects = [
        {
            icon: '👨🏻‍💻',
            name: 'Work'
        },
        {
            icon: '🏀',
            name: 'Sport'
        },
        {
            icon: '🎨',
            name: 'Artists'
        },
        {
            icon: '🎮',
            name: 'Gamers'
        },
        {
            icon: '🍔',
            name: 'Food'
        },
        {
            icon: '🎬',
            name: 'Video creators'
        },
        {
            icon: '🎙',
            name: 'Podcasters'
        },
        {
            icon: '📖',
            name: 'Writers'
        },
        {
            icon: '🎸',
            name: 'Musicians'
        },
    ]

    const steps = [
        {
            name: 'Create',
            text: "Create links easily, organize all the links the way you want. Make it right now, it's free !",
            icon: <PencilSquareIcon width={38} className='c-blue' />
        },
        {
            name: 'Integrate',
            text: "Create links easily, organize all the links the way you want. Make it right now, it's free !",
            icon: <LinkIcon width={38} className='c-blue' />
        },
        {
            name: 'Share',
            text: "Create links easily, organize all the links the way you want. Make it right now, it's free !",
            icon: <ShareIcon width={38}  className='c-blue' />
        },
    ]

    const exemples = [
        {
            name: '@Celine',
            img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80'
        },
        {
            name: '@HBO',
            img: 'https://linktr.ee/_gatsby/image/3366c979a0e1dbf88ebae4f99acfcb3d/6a30f42b5bff44434c29c5c6b36ab839/hbo.avif?eu=0205d5faf0e45b2de94ef3064e19324860060ceb18abf477bdcfe18886fe5cda552ed622bb5723ea37c7aab77e3124cb335a42082ebde91c0e0544d461f049b03809765cdfe50063f1e28b53bd864f2de8b09b8d32583fcbe878424ad4726cadd87d21529d55854db49fcc5b63871653a1e7f7acc87eed4faac253450347fa857031b82f6ab3a4e6e876258a530bdf7e8789f88d296a2f3f66cf9ddad6fcb8e1ad89aa58b66ee56956ef9b434322302688f7b912c7&a=w%3D890%26h%3D890%26fm%3Davif%26q%3D75&cd=fae6508b0d22194261a6fbab5a6791af'
        },
        {
            name: '@basket',
            img: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
        },
        {
            name: '@Joyca',
            img : 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
        },
        {
            name: '@Seb',
            img: 'https://images.unsplash.com/photo-1593757147298-e064ed1419e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
        },
        {
            name: '@Cookin co',
            img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
        }
    ]


    const features = [
        {
            name: 'Cut',
            text: "Short and manage your URLs in a seconde",
            icon: <div className='display justify-c blue border-b border-r-1 ' style={{width: '100px', height: '88px'}}><ScissorsIcon width={44} /></div>
        },
        {
            name: 'Links',
            text: "Create a link in bio page with yours links in one clic",
            icon: <div className='display justify-c yellow border-b border-r-1 ' style={{width: '100px', height: '88px'}}><SwatchIcon width={44} className='c-white' /></div>
        },
        {
            name: 'Stats',
            text: "Aanalyse your bests links to a better scale up",
            icon:  <div className='display justify-c orange border-b border-r-1 ' style={{width: '100px', height: '88px'}}><RocketLaunchIcon width={44} /></div>
        },
    ]


    const tempateLinks = [
        {
            name: 'Ma boutique de vetement',
            shortLink: 'ma-boutique',
            check: true
        },
        {
            name: 'Mon instagram',
            shortLink: '@joe',
            check: true
        },
        {
            name: 'Ma boutique de vetement',
            shortLink: 'ma-boutique',
            check: false
        }
    ]




    const [AllLinks, setAllLinks] = useState([])

    useEffect(e=> {
        fetchLinks(setAllLinks)
    }, [])

    return (
        <Main>

            <div className='grid blocks w-100p'>
                <div className='display justify-s-b align-top'>

                    <div className='grid gap-3rem w-100p'>
                        <div className='grid gap-04 title-home'>
                            <small className='link'>ONE SECOND TO</small>
                            <h1 className='m-t-0 m-b-1'>Qlee your links</h1>
                            <span className='opacity f-w-300'>Don't panic, that just the best URL shortener for your web presence you have never seen before !</span>
                        </div>

                        <div className='grid gap-1rem w-100p'>
                            <div className='display div-input h-4 border border-r-1 w-100p white'>
                                <div className='display w-100p'>
                                    <span className='link p-l-1 p-r-04'>qlee.me/</span>
                                    <input className='border-0 p-0  w-100p' placeholder='mon-nom' />
                                </div>
                            </div>
                            <div className='display justify-e'>
                                <button className='blue border-b p-1 border-r-1 h-4'>
                                    <span className='f-s-16 c-white'>Let's go</span>
                                </button>
                            </div>
                            <div className='display justify-c'>
                                <span className='opacity'>C'est gratuit !</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='display justify-e'>
                    <img src='favicon.ico' width='288px' height='288px' />
                </div>
            </div>
            <div className='steps-div'>
                <div className='title-steps'>
                    <small className='link'>MAKE IT EASY</small>
                    <h2 className='m-t-04'>Features design for you</h2>
                </div>
                <div className='display gap-1rem steps'>
                    {
                        steps.map(step=> {
                            return (
                                <div className='steps-blocks' key={step.name}>
                                    <div className='grid'>
                                        <div className='justify-c display'>
                                            <div className='steps-blocks-head'>
                                                <div className='display justify-c border-r-100 p-1 blue-secondary steps-icon'>
                                                    <span>{step.icon}</span>
                                                </div>
                                                <span className='f-s-20 f-w-500'>{step.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <span className='display c-grey f-w-200 text-align-c'>{step.text}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className='steps-div'>
                <div className='title-steps'>
                    <small className='link'>ALL IN ONE</small>
                    <h2 className='m-t-04'>All that you need</h2>
                </div>
                <div className='display gap-1rem features'>
                    {
                        features.map(feature=> {
                            return (
                                <div className='features-blocks' key={feature.name}>
                                    <div className='grid'>
                                        <div className='justify-c display'>
                                            <div className='steps-blocks-head'>
                                                {feature.icon}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='grid gap-1rem'>
                                        <div className='grid gap text-align-c'>
                                            <span className='f-s-25 f-w-500'>{feature.name}</span>
                                            <span className='display c-grey f-w-200 text-align-c'>{feature.text}</span>
                                        </div>
                                        <span className='link hover-link text-align-c'>know more</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className='subject-div'>
                <div className='grid'>
                    <div className='title-subject'>
                        <small className='link'>FOR ALL TYPE OF LINKS</small>
                        <h2 className='m-t-04'>For everyone</h2>
                    </div>

                    <div className='subject-div-blocks'>
                        {
                            subjects.map(subject=> {
                                return (
                                    <div className='display subject-blocks' key={subject.name}>
                                        <span className='f-s-16'>{subject.icon}</span>
                                        <span>{subject.name}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <Swiper 
                    className='w-100p'
                    slidesPerView={1.8} 
                    spaceBetween={18}
                    loop
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                >
                        {
                            exemples.map(exemple=> {
                                return (
                                    <SwiperSlide className='m-b-3' key={exemple.name}>
                                        <div className='grid gap-1rem' >
                                            <img src={exemple.img} className='exemples-img' />
                                            <span className='exemples-name'>{exemple.name}</span>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                </Swiper>
            
            </div>


            <div className='display justify-s-b'>
                <div className='display w-50'>
                    <h2>Manage your links as you wish</h2>
                </div>
                <div className='grid gap w-50'>
                    <img src='/images/capture.png' width='100%' />
                   {/*  {
                        tempateLinks.map(t=> {
                            let checked = t.check

                            console.log(checked);
                            return (
                                <div className='display border border-r-1 border-b white p-1'>
                                    <img src={getFavicon('www.youtube.com')} width={30} className='border-r-100' />
                                    <div className='display gap-04 '>
                                        <span className='f-s-16'>{t.name}</span>
                                        <SwitchInput checked={checked} onChange={e=> checked = e.target.checked} />
                                    </div>
                                </div>
                            )
                        })
                    } */}
                </div>
            </div>

            <div className='yellow p-2 border-r-2'>
                <div>
                    <h2 className='m-t-0'>Some numbers</h2>
                </div>

                <div className='grid gap-1rem'>
                    <div className='display justify-s-b align-top'>
                        <div className='grid'>
                            <span className='f-s-2rem f-w-600 '>{formatNumber(AllLinks.length)}</span>
                            <div className='display gap-1rem'>
                                <span className='opacity f-w-300'>Created links</span>
                            </div>
                        </div>
                        <SwatchIcon width={28} className='c-black' />
                    </div>
                    <div className='display justify-s-b align-top'>
                        <div className='grid'>
                            <span className='f-s-2rem f-w-600'>{formatNumber(293)}</span>
                            <div className='display gap-1rem e'>
                                <span className='opacity f-w-300'>Users</span>
                            </div>
                        </div>
                        <UserIcon width={28} className='c-black' />
                    </div>
                </div>
            </div>

           {/*  <Swiper 
                className='w-100p'
                style={{height: '80vh'}}
                direction={"vertical"}
                navigation={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            >

                <SwiperSlide className='display justify-c'></SwiperSlide>

            </Swiper> */}

        </Main>
    )
}

