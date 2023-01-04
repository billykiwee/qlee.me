import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isUserPremium } from '../../../Admin/settings/isPremium'
import { plans } from '../../../Admin/settings/plans'
import Main from '../../../App/components/Main'
import '../../../App/css/pricing.css'
import { useStateValue } from '../../../App/provider/StateProvider'
import formatCurrency from '../../../App/utils/formatCurrency'
import { fetchUser } from '../../../Client/lib/database/user/fetchUser'
import { Plans } from './data/plans'


export default function Pricing() {

    const history = useNavigate()

    const [{user}] = useStateValue()

    const [User, setUser] = useState({})

    useEffect(e=> {
        fetchUser(setUser, user?.email)
    }, [user])

    return (
        <Main>

            <div className='grid gap-2rem'>
                
                <div className='grid'>
                    <div className='grid'>
                        <h1 className='m-0 text-align-c'>Pricing</h1>
                        <h2 className='f-w-300 c-grey text-align-c f-s-25'>Toutes les fonctionnalités disponible pour le prix d'un expresso ☕️</h2>
                    </div>
                    {
                        !user &&  
                        <div className='display justify-c'>
                            <div className='display justify-c'>
                                <button className='blue hover-blue h-4 p-1 border-r-1'>
                                    <span className='f-s-18 c-black'>Créer un compte gratuitement</span>
                                </button>
                            </div>
                        </div>
                    }
                </div>

                <div className='display justify-c gap-1rem align-top m-t-1 pricing-blocks'>
                    {
                        Object.values(Plans)
                        .map(plan => {
                            
                            const checkUserPlan = plan.plan.toUpperCase().includes(isUserPremium(User).plan)

                            return (
                                <div className='grid' key={plan.plan}>
                                    <div className='border-b border border-r-1 card-pricing white'  >

                                        <div className='grid gap-2rem'>
                                            <div className='display justify-s-b align-top'>
                                                <div className='grid align-l gap'>
                                                    <span className='f-s-25 f-w-600'>{plan.plan}</span>
                                                    <span className='opacity'>{plan.subtitle}</span>
                                                </div>
                                                {
                                                    checkUserPlan &&
                                                    <div>
                                                        <img src='/images/check.svg' width={22} />
                                                    </div>
                                                }
                                            </div>
                            
                                            <div className='grid gap-1rem m-t-1'>
                                                <div className='display'>
                                                    <div className='lh-1 display align-b'>
                                                        <div className='display'>
                                                            <span className='display f-w-600 f-s-3rem'>{plan.price}</span>
                                                            <span className='f-s-20 m-l-04 opacity'>€ /mois</span>
                                                        </div>
                                                    </div>
                                                </div>
                                
                                                <div className='display'>
                                                    <a href={plan.payment} className='w-100p'>
                                                        <button 
                                                            onClick={e=> checkUserPlan ? history('/dashboard') : ''}
                                                            className={(plan.recommended ? 'yellow hover-yellow' : 'blue hover-blue') + ' f-s-16 border-b p-1 h-4 border-r-1'}
                                                        > 
                                                            <span style={{
                                                                color : plan.recommended ? 'black' : 'white'
                                                            }}
                                                            >{checkUserPlan ? 'Continuer' : 'Essayer'}</span> 
                                                        </button>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className='grid gap-04'>
                                            {
                                                plan.benefits &&
                                                plan.benefits.map((benefit)=> {
                                                    
                                                    return (
                                                        <div className='display gap hover border-r-1 h-2 click' key={benefit}>
                                                            <span className={'display justify-c c-black w-2'}>{benefit[1]}</span>
                                                            <p className='f-w-300'>{benefit[0]}</p>
                                                        </div>
                                                    )
                                                })
                                            }

                                            </div>
                                        </div>
                        
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <FAQ /> 

            </div>


        </Main>
    )
}



function FAQ() {

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
    ]
    return (
        <div className='m-t-4 grid gap-2rem'>
            <div className='display justify-c'>
                <div className='grid'>
                    <span className='f-s-25 c-blue f-w-500 text-align-c'>FAQ</span>
                    <h2 className='m-0'>Tu as une question ?</h2>
                </div>
            </div>
            
            <div className='display justify-s-b'>
                {
                    questions.map(question=> {
                        return (
                            <div className='grid gap'>
                                <span className='f-s-20 f-w-600'>{question.q}</span>
                                <span className='c-grey f-w-200'>{question.a}</span>
                            </div>
                        )
                    })
                }
            </div>
            
        </div>
    )
}