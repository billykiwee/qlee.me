import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import Main from '../App/components/Main'
import { LinkIcon, PencilSquareIcon, ShareIcon } from '@heroicons/react/24/solid';

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


    return (
        <Main className='main-home'>

            <div className='grid blocks w-100p'>
                <div className='display justify-s-b align-top'>

                    <div className='grid gap-3rem w-100p'>
                        <div className='grid gap-04 title-home'>
                            <small className='link'>ONE SECOND TO</small>
                            <h1 className='m-t-0 m-b-1'>Qlee your links</h1>
                            <span className='opacity f-w-300'>Don't panic, that juste the best shortener for your web presence you have never seen before !</span>
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
                                <div className='steps-blocks'>
                                    <div className='grid'>
                                        <div className='justify-c display'>
                                            <div className='steps-blocks-head'>
                                                <div className='display justify-c border-r-100 p-1 blue-secondary steps-icon'>
                                                    <span>{step.icon}</span>
                                                </div>
                                                <span className='f-s-20'>{step.name}</span>
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

            <div className='subject-div'>
                <div className='title-subject'>
                    <small className='link'>FOR ALL TYPE OF LINKS</small>
                </div>

                <div className='subject-div-blocks'>
                    {
                        subjects.map(subject=> {
                            return (
                                <div className='display subject-blocks'>
                                    <span className='f-s-20'>{subject.icon}</span>
                                    <span>{subject.name}</span>
                                </div>
                            )
                        })
                    }
                </div>
               
            </div>


        </Main>
    )
}

