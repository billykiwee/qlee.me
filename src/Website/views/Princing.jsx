import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isUserPremium } from '../../Admin/settings/isPremium'
import { plans } from '../../Admin/settings/plans'
import Main from '../../App/components/Main'
import '../../App/css/pricing.css'
import { useStateValue } from '../../App/provider/StateProvider'
import formatCurrency from '../../App/utils/formatCurrency'
import { fetchUser } from '../../Client/lib/database/fetchUser'


export default function Pricing() {

    const history = useNavigate()

    const [{user}] = useStateValue()

    const [User, setUser] = useState({})

    useEffect(e=> {
        fetchUser(setUser, user?.email)
    }, [user])


    const Plans = {
        Free : {
            plan    : 'Free 💸',
            subtitle: 'Pour tous',
            price   : 0,
            benefits: [
                '10 liens'
            ],
        },
        Pro : {
            plan    : 'Pro 👨🏻‍💻',
            subtitle: 'Pour aller plus loin',
            price   : plans.PRO.price,
            benefits: [
                '100 liens',
                '1 Link in bio',
                'Lien personalisable',
                'Monétisations',
            ],
            recommended: true,
            payment    : 'https://buy.stripe.com/7sIbK43CR8677ja9Bc',
        },
        Entrprise : {
            plan    : 'Entreprise 🚀',
            subtitle: 'Booster votre présence',
            price   : plans.ENTREPRISE.price,
            benefits: [
                '1000 liens',
                'Link in bio illimités',
                'Vendre en ligne',
                'Lien personalisable',
                'Monétisations',
            ],
            payment: 'https://buy.stripe.com/00g9BW0qF5XZ32U14F',
        }
    }


    return (
        <Main>

            <div className='grid gap-2rem'>
                
                <div className='display wrap justify-s-b'>
                    <div className='grid gap'>
                        <span className="f-s-25 f-w-500">Pricing</span>
                        <span className='f-w-100'>Toutes les fonctionnalités disponible pour le prix d'un expresso ☕️</span>
                    </div>
                </div>

                <div className='display gap-1rem align-top m-t-1 pricing-blocks'>
                    {
                        Object.values(Plans)
                        .map(plan => {

                            const checkUserPlan = plan.plan.toUpperCase().includes(isUserPremium(User).plan)

                            return (
                                <div className='grid' key={plan.plan}>
                                    <div className='border-b border border-r-1 p-2 card-pricing' style={{boxShadow: checkUserPlan && '0px 0px 22px var(--border)'}} >

                                        <div className='grid gap-2rem'>
                                            <div className='display justify-s-b align-top'>
                                                <div className='grid align-l gap'>
                                                    <span className='f-s-25 f-w-600'>{plan.plan}</span>
                                                    <span className='opacity'>{plan.subtitle}</span>
                                                </div>
                                                {
                                                    checkUserPlan &&
                                                    <div>
                                                        <img src='/images/check.svg' width={34} />
                                                    </div>
                                                }
                                            </div>
                            
                                            <div className='grid gap-1rem'>
                                                <div className='display'>
                                                    <div className='lh-1 display align-b'>
                                                        <div className='display'>
                                                            <span className='display f-s-2rem'>{formatCurrency(plan.price)}</span>
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
                                                            <span>{checkUserPlan ? 'Continuer' : 'Essayer'}</span> 
                                                        </button>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className='grid'>
                                            {
                                                plan.benefits &&
                                                plan.benefits.map((benefit)=> {
                                                    
                                                    return (
                                                        <div className='display hover border-r-1 p-04 h-2 click' key={benefit}>
                                                            <span className='display m-r-04'>
                                                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.4 22.4C15.0522 22.4 17.5957 21.3465 19.4711 19.4711C21.3465 17.5957 22.4 15.0522 22.4 12.4C22.4 9.74786 21.3465 7.20432 19.4711 5.32896C17.5957 3.45359 15.0522 2.40002 12.4 2.40002C9.74786 2.40002 7.20432 3.45359 5.32896 5.32896C3.45359 7.20432 2.40002 9.74786 2.40002 12.4C2.40002 15.0522 3.45359 17.5957 5.32896 19.4711C7.20432 21.3465 9.74786 22.4 12.4 22.4ZM17.0338 10.7838C17.2615 10.548 17.3875 10.2323 17.3846 9.90452C17.3818 9.57678 17.2503 9.26326 17.0185 9.0315C16.7868 8.79974 16.4733 8.66828 16.1455 8.66543C15.8178 8.66258 15.502 8.78858 15.2663 9.01627L11.15 13.1325L9.53377 11.5163C9.29802 11.2886 8.98227 11.1626 8.65452 11.1654C8.32678 11.1683 8.01326 11.2997 7.7815 11.5315C7.54974 11.7633 7.41828 12.0768 7.41543 12.4045C7.41258 12.7323 7.53858 13.048 7.76627 13.2838L10.2663 15.7838C10.5007 16.0181 10.8186 16.1498 11.15 16.1498C11.4815 16.1498 11.7994 16.0181 12.0338 15.7838L17.0338 10.7838Z"/><path fill={plan.recommended ? 'var(--yellow)' : "var(--blue)"} d="M17.0338 10.7838C17.2615 10.548 17.3875 10.2323 17.3846 9.90452C17.3818 9.57678 17.2503 9.26326 17.0185 9.0315C16.7868 8.79974 16.4733 8.66828 16.1455 8.66543C15.8178 8.66258 15.502 8.78858 15.2663 9.01627L11.15 13.1325L9.53377 11.5163C9.29802 11.2886 8.98227 11.1626 8.65452 11.1654C8.32678 11.1683 8.01326 11.2997 7.7815 11.5315C7.54974 11.7633 7.41828 12.0768 7.41543 12.4045C7.41258 12.7323 7.53858 13.048 7.76627 13.2838L10.2663 15.7838C10.5007 16.0181 10.8186 16.1498 11.15 16.1498C11.4815 16.1498 11.7994 16.0181 12.0338 15.7838L17.0338 10.7838Z" /></svg>
                                                            </span>
                                                            <span className='f-w-300'>{benefit}</span>
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
