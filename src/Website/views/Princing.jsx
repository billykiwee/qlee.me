import { ArrowsRightLeftIcon, ChartPieIcon, Cog6ToothIcon, LinkIcon, QrCodeIcon, SwatchIcon } from '@heroicons/react/24/solid'
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
                ['10 liens', <ArrowsRightLeftIcon width={18} />],
                ['Qr code', <QrCodeIcon width={18} />],
                ['Lien personalisable', <Cog6ToothIcon width={18} />],
            ],
        },
        Pro : {
            plan    : 'Pro 👨🏻‍💻',
            subtitle: 'Pour aller plus loin',
            price   : plans.PRO.price,
            benefits: [
                ['100 liens', <ArrowsRightLeftIcon width={18} />],
                ['Qr code', <QrCodeIcon width={18} />],
                ['Lien personalisable', <Cog6ToothIcon width={18} />],
                ['Statistiques', <ChartPieIcon width={18} />]
            ],
            recommended: true,
            payment    : 'https://buy.stripe.com/7sIbK43CR8677ja9Bc',
        },
        Entrprise : {
            plan    : 'Entreprise 🚀',
            subtitle: 'Booster votre présence',
            price   : plans.ENTREPRISE.price,
            benefits: [
                ['1000 liens', <ArrowsRightLeftIcon width={18} />],
                ['Qr code', <QrCodeIcon width={18} />],
                ['Link in bio', <SwatchIcon width={18} />],
                ['Lien personalisable', <Cog6ToothIcon width={18} />],
                ['Statistiques', <ChartPieIcon width={18} />]
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
                                                            <span className='c-white'>{checkUserPlan ? 'Continuer' : 'Essayer'}</span> 
                                                        </button>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className='grid'>
                                            {
                                                plan.benefits &&
                                                plan.benefits.map((benefit)=> {
                                                    
                                                    return (
                                                        <div className='display gap-1rem hover border-r-1 p-04 h-2 click' key={benefit}>
                                                            <span className={'display justify-c ' + (plan.recommended ? 'c-yellow' : 'c-blue')}>{benefit[1]}</span>
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
