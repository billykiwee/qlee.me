import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
// import required modules
import { Autoplay, Pagination, Mousewheel, Keyboard } from "swiper";
import { BiSubdirectoryRight } from 'react-icons/bi'

import Main from '../../../App/components/Main'
import { ArrowRightIcon, BanknotesIcon, ChartPieIcon, GlobeEuropeAfricaIcon, LinkIcon, PencilSquareIcon, RocketLaunchIcon, ScissorsIcon, ShareIcon, SwatchIcon, UserIcon } from '@heroicons/react/24/solid';
import { fetchLinks } from '../../../Client/lib/database/links/fetchLinks';
import { SwitchInput } from '../../../App/components/Switch';
import getFavicon from '../../../App/utils/getFavicon';
import { GetWidth } from '../../../App/utils/GetWidth';
import { useContext } from 'react';
import { useStateProps } from '../../../App/provider/ContextProvider';


export default function Home() {

    const { users, stats, links } = useStateProps()


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
            text: "Create links easily",
            icon: <PencilSquareIcon width={38} className='c-blue' />
        },
        {
            name: 'Manage',
            text: "Update, edit and custom your links",
            icon: <LinkIcon width={38} className='c-blue' />
        },
        {
            name: 'Share',
            text: "Share your links all around you",
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
            icon: <div className='display justify-c blue border-r-100 ' style={{width: '66px', height: '66px'}}><ScissorsIcon width={40} /></div>
        },
        {
            name: 'Redirect',
            text: "Create a link in bio page with yours links in one clic",
            icon: <div className='display justify-c green border-r-100 ' style={{width: '66px', height: '66px'}}><BiSubdirectoryRight size={38} className='c-white' /></div>
        },
        {
            name: 'Links in bio',
            text: "Create a link in bio page with yours links in one clic",
            icon: <div className='display justify-c yellow border-r-100 ' style={{width: '66px', height: '66px'}}><SwatchIcon width={40} className='c-white' /></div>
        },
        {
            name: 'Stats',
            text: "Aanalyse your bests links to a better scale up",
            icon:  <div className='display justify-c orange border-r-100 ' style={{width: '66px', height: '66px'}}><RocketLaunchIcon width={40} /></div>
        },
    ]

    const tempateLinks = [
        {
            name     : 'Ma boutique',
            check    : true,
            icon     : 'www.goody.com'
        },
        {
            name     : 'Mon facebook',
            check    : false,
            icon     : 'www.facbook.com'
        },
        {
            name     : 'Mon instagram',
            check    : true,
            icon     : 'www.twitch.com'
        },
        {
            name     : 'Ma youtube',
            check    : true,
            icon     : 'www.youtube.com'
        }
    ]


    const Stats = [
        {
            title : 'Created links',
            number: links.length,
            icon  : <SwatchIcon width={30} />
        },
        {
            title : 'Users',
            number: users.length,
            icon  : <UserIcon width={30} />
        },
        {
            title : 'Statistics',
            number: stats.length,
            icon  : <ChartPieIcon width={30} />
        },
        {
            title : 'Countries',
            number: 2933,
            icon  : <GlobeEuropeAfricaIcon width={30} />
        },
    ]


    const width = GetWidth()





    



    const style = { }

    return (
        <Main className='grid' style={{gap: width < 480 ? '4rem' : '10rem'}}>

            <div className='grid blocks w-100p' style={style}>
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

                <div className='display justify-c'>
                    <img src='favicon.ico' width='288px' height='288px' />
                </div>
            </div>

            <div className='grid justify-s-b align-top blocks' style={style}>
                <div className='grid'>
                    <span className='link f-w-600 f-s-20'>ALL IN ONE</span>
                    <h1 className='m-t-04'>All that you need</h1>
                </div>
                <div className='grid gap-2rem p-1'>
                    {
                        features.map((feature, i)=> {
                            return (
                                <div className='display gap-2rem align-top p-1' key={feature.name} style={{borderBottom: i !== features.length-1 ? '1px solid #d2d2d2': ''}}>
                                    <div className='grid'>
                                        <div className='display'>
                                            <div className='steps-blocks-head'>
                                                {feature.icon}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='grid gap-1rem'>
                                        <div className='grid gap'>
                                            <span className='f-s-25 f-w-500'>{feature.name}</span>
                                            <span className='display c-grey f-w-200' >{feature.text}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {/* <div className='steps-div' style={style}>
                <div className='title-steps'>
                    <h1 className='m-0'>How ?</h1>
                </div>
                <div className='display gap-1rem steps m-t-2'>
                    {
                        steps.map(step=> {
                            return (
                                <div className='p-1 gap grid' key={step.name}>
                                    <div className='grid gap'>
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
            </div> */}

            <div className='subject-div' style={style}>
                <div className='grid gap-2rem'>
                    <div className='grid'>
                        <small className='link f-w-600 f-s-20'>FOR ALL TYPE OF LINKS</small>
                        <h1 className='m-0'>For everyone</h1>
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

                <Swiper className='w-100p' 
                    slidesPerView={width < 480 ? 2 : 3}  
                    spaceBetween={18} 
                    loop
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
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

            <div className='grid justify-s-b blocks' style={style}>
                <div className='display'>
                    <h1 className='m-0'>Manage your links as you wish</h1>
                </div>
                <div className='grid gap p-2'>
                    {
                        tempateLinks.map(t=> {
                            return (
                                <div className='display justify-s-b border border-r-1 border-b white p-1'>
                                    <div className='display gap-1rem'>
                                        <img src={getFavicon(t.icon)} width={30} className='border-r-100' />
                                        <span className='f-s-16'>{t.name}</span>
                                    </div>
                                    <div className='display gap-04 '>
                                        <SwitchInput dimension={0.9} checked={t.check} onChange={e=> t.check = false} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className='grid p-2 border-r-2' style={{style, color: 'black'}}>
                <div className='display justify-c'>
                    <h1 className='m-t-0 c-black'>Some numbers</h1>
                </div>

                <div className='grid gap blocks'>
                    {
                        Stats.map((stat)=> {

                            return (
                                <div className='display gap-2rem justify-c p-2 border-r-2 shadow yellow'>
                                    <div className={(width < 480 ? 'grid' : 'display') + ' gap align-top'}>

                                        <div className='grid gap' style={{color: 'black'}}>
                                            <div className='f-s-2rem f-w-500 display justify-c gap-1rem'>
                                                {stat.icon}
                                                <NumberIncreaser length={stat.number} id={stat.title.replace(/[^a-zA-Z0-9]/g, "-")} />
                                            </div>
                                            <span className='f-s-18 f-w-300 text-align-c'>{stat.title}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </Main>
    )
}


export function NumberIncreaser({ length, id}) {

    const [number, setNumber] = useState(0)
    const [start, setStart]   = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setStart(entry.isIntersecting))
        })

        const targetNode = document.querySelector('#' + id)
        if (targetNode) observer.observe(targetNode)

        return () => observer.disconnect()
    }, [])

    useEffect(() => {

        let interval = null
        if (start) {
            interval = setInterval(() => {
                if (number >= length) {
                    clearInterval(interval)
                    return
                }
                setNumber(number + 1)
            }, 0)
        }
        return () => clearInterval(interval)

    }, [start, number, length])

    return <span id={id}>{number}</span>
}