import { ChevronDownIcon, MinusCircleIcon, PlusCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useState } from 'react'

export function FAQ() {


    const [showQ, setShowQ] = useState('')

    const questions = [
        {
            id : 'q-1',
            q : 'Le service est-il gratuit ?',
            a : "Oui, le service est gratuit jusqu'à 10 liens. Les autres fonctionnalités comme les statistqiues sont payante."
        },
        {
            id : 'q-2',
            q : 'What’s the difference between Projects and Pages in your pricing plans',
            a : 'Projects are a set of pages grouped under one domain & design settings. So, simply telling, 1 Project equals a Domain, like www.onepage.io'
        },
        {
            id : 'q-3',
            q : 'Puis-je arrêter mon abonnement à votre service ?',
            a : "Oui, nos abonnements sont sans engagement. Vous pouvez à tout moment arrêter votre abonnement."
        },
        {
            id : 'q-4',
            q : 'Le service est-il garanti de ne pas être banni par les réseaux sociaux ou les moteurs de recherche ?',
            a : 'Oui, car les lien sont sous le nom domaine qlee.me qui utilise la technologie SSL'
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
            
            <div className='display justify-c margin-auto w-100p' >
                <div className='display justify-c w-100p'  >
                    <div className='grid gap w-100p' >
                        {
                            questions.map((question, i)=> {
                                return (
                                    <div className='display white border-r-1 p-1 shadow' >
                                        <div className='grid gap-1rem w-100p'>
                                            <div className='display justify-s-b gap'>
                                                <div className='display gap'>
                                                    <span>{question.q}</span>
                                                </div>
                                                <div className='display justify-c click border-r-100 w-2 h-2 hover' onClick={e=> setShowQ(e=> e !== question.id ? question.id : '') } >
                                                    {
                                                        showQ !== question.id 
                                                        ? <PlusCircleIcon width={28} className='c-grey' />
                                                        : <MinusCircleIcon width={28} className='c-grey' />
                                                    }
                                                </div>
                                            </div>
                                            {
                                                showQ === question.id &&
                                                <div>
                                                    <small className='c-grey f-w-200 f-s-16'>{question.a}</small>
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
            </div>
            
        </div>
    )
}