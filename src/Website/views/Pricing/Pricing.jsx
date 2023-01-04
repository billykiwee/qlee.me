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
                    <div className='display justify-c' style={{width: '22%'}}>
                        <button className='blue hover-blue h-3 p-1 border-r-1'>
                            <span className='f-s-20'>Créer un compte</span>
                        </button>
                    </div>
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
                                                            <span className='display f-w-500 f-s-2rem'>{formatCurrency(plan.price)}</span>
                                                            <span className='f-s-16 m-l-04 opacity'>/mois</span>
                                                        </div>
                                                    </div>
                                                </div>
                                
                                                <div className='display'>
                                                    <a href={plan.payment} className='w-100p'>
                                                        <button 
                                                            onClick={e=> checkUserPlan ? history('/dashboard') : ''}
                                                            className={(plan.recommended ? 'yellow hover-yellow' : 'blue hover-blue') + ' f-s-16 border-b p-1 h-4 border-r-1'}
                                                        > 
                                                            <span className={(plan.recommended ? 'c-black' : 'c-white')}>{checkUserPlan ? 'Continuer' : 'Essayer'}</span> 
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
            </div>

        </Main>
    )
}
