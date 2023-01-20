import { ChevronDownIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useState } from 'react'

export function FAQ() {


    const [showQ, setShowQ] = useState('')

    const questions = [
        {
            id : 'q-1',
            q : 'Le service est-il gratuit ou y a-t-il des frais supplémentaires pour des fonctionnalités avancées ?',
            a : "Oui, le service est gratuit jusqu'à 10 liens. Les autres fonctionnalités comme les statistqiues sont payante."
        },
        {
            id : 'q-2',
            q : 'What’s the difference between Projects and Pages in your pricing plans',
            a : 'Projects are a set of pages grouped under one domain & design settings. So, simply telling, 1 Project equals a Domain, like www.onepage.io'
        },
        {
            id : 'q-3',
            q : 'Do I have to buy or install anything in addition to using Onepage?',
            a : 'No, you don’t. Onepage is a cloud-based solution means hosting is already included in free or paid plans. As well as any additional plug-ins are not required.'
        },
        {
            id : 'q-4',
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
            
            <div className='grid gap-1rem align-top' >
                {
                    questions.map((question, i)=> {

                        return (
                            <div className='display grey border-r-1 p-1 w-100p'>
                                <div className='grid gap-1rem w-100p'>
                                    <div className='display justify-s-b gap'>
                                        <div className='display gap'>
                                            <QuestionMarkCircleIcon className='c-grey' width={26} />
                                            <span>{question.q}</span>
                                        </div>
                                        <div className='grey hover border-r-2 h-2 w-2 display justify-c shadow border'>
                                            <button onClick={e=> setShowQ(e=> e !== question.id ? question.id : '') } style={{
                                                transform : showQ === question.id ? 'rotate(180deg)' : 'rotate(0deg)'
                                            }}>
                                                <ChevronDownIcon width={20} className='c-black' />
                                            </button>
                                        </div>
                                    </div>
                                    {
                                        showQ === question.id &&
                                        <div>
                                            <span className='c-grey f-w-200 f-s-18'>{question.a}</span>
                                        </div>
                                    }
                                </div>
                            </div>  
                        )
                    })
                }
                {/* <div className='grid gap-1rem p-1' key={i}>
                                <div className='grid gap'>
                                    <QuestionMarkCircleIcon className='c-grey w-3' />
                                    <span className='f-s-25 f-w-500'>{question.q}</span>
                                </div>
                                <span className='c-grey f-w-200 f-s-18'>{question.a}</span>
                            </div> */}
            </div>
            
        </div>
    )
}