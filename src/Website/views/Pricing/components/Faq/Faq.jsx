import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'

export function FAQ() {

    const questions = [
        {
            q : 'Is access to Onepage free of charge?',
            a : 'Yes, it is. By picking a free plan, you can create and host 1 Project with 3 pages. It’s self-sufficient for smaller businesses and individuals'
        },
        {
            q : 'What’s the difference between Projects and Pages in your pricing plans',
            a : 'Projects are a set of pages grouped under one domain & design settings. So, simply telling, 1 Project equals a Domain, like www.onepage.io'
        },
        {
            q : 'Do I have to buy or install anything in addition to using Onepage?',
            a : 'No, you don’t. Onepage is a cloud-based solution means hosting is already included in free or paid plans. As well as any additional plug-ins are not required.'
        },
        {
            q : 'Do I have to buy or instnepage?',
            a : 'No, you don’t. Onepage is a clouee or paid plans. As well as any additional plug-ins are not required.'
        },
    ]

    return (
        <div className='grid gap-3rem m-t-4'>
            <div className='display justify-c p-2'>
                <div className='grid'>
                    <span className='f-s-25 c-blue f-w-800 text-align-c'>FAQ</span>
                    <h1 className='m-0 text-align-c'>Toujours une question ?</h1>
                </div>
            </div>
            
            <div className='grid gap-1rem align-top question' >
                {
                    questions.map((question, i)=> {
                        return (
                            <div className='grid gap-1rem p-1' key={i}>
                                <div className='grid gap'>
                                    <QuestionMarkCircleIcon className='c-grey w-3' />
                                    <span className='f-s-25 f-w-500'>{question.q}</span>
                                </div>
                                <span className='c-grey f-w-200 f-s-18'>{question.a}</span>
                            </div>
                        )
                    })
                }
            </div>
            
        </div>
    )
}