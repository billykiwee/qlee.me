import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStateProps } from '../../../../../App/provider/ContextProvider'
import { PlansData } from '../data/plans'

export default function Plans({ billied }) {

    const history = useNavigate()
    const { auth, user } = useStateProps()
    const User = user?.profil


    return (
        <div className='display justify-c gap-1rem align-top m-t-1 pricing-blocks'>
            {
                Object.values(PlansData)
                .map((plan, i) => {

                    const colorTop = {
                        FREE  : 'linear-gradient(136deg, rgb(11 113 241 / 0.06), transparent)',
                        PRO : 'linear-gradient(136deg, rgba(250, 202, 35, 0.06), transparent)',
                        ENTREPRISE: 'linear-gradient(136deg, rgb(27 209 161 / 0.06), transparent)'
                    }
                    
                    return (
                        <div className='grid border-r-1 shadow' key={i} style={{ border : '1px solid var(--grey-2)' }} >

                            <div className='p-2 grid gap-1rem white' 
                                style={{ 
                                    borderRadius: '1rem 1rem 0 0', 
                                    background: colorTop?.[plan.id],
                                }} 
                            >
                                <div className='display justify-s-b align-top'>
                                    <div className='grid align-l gap'>
                                        <span className={'f-s-2rem f-w-600 ' + (plan.id === 'FREE' ? 'c-blue' : plan.id === 'PRO' ? 'c-yellow' : 'c-green')}>{plan.plan}</span>
                                        <span className='opacity f-s-18'>{plan.subtitle}</span>
                                    </div>
                                    {
                                        User.plan === plan.id &&
                                        <div>
                                            <img src='/images/check.svg' width={22} />
                                        </div>
                                    }
                                </div>
                
                                <div className='grid gap-1rem m-t-1'>

                                    <div className='display'>
                                        <div className='lh-1 display align-b'>
                                            <div className='display'>
                                                <span className='display f-w-600 f-s-3rem'>€
                                                    {
                                                        plan.id === 'FREE'
                                                        ? 0
                                                        : plan.price?.[billied]
                                                    }
                                                </span>
                                                <span className='f-s-20 m-l-04 opacity m-t-04'>/ mois</span>
                                            </div>
                                        </div>
                                    </div>
                    
                                    <div className='display'>
                                        {
                                            !plan.available 
                                            ?
                                            <button className='green border-r-1 h-4 p-1 f-s-16 border-b'>
                                                <span>Bientôt</span>
                                            </button>
                                            :
                                            <Link to={ 
                                                !auth 
                                                ? history('/login') 
                                                : user.plan === plan.plan ? history('/dashboard') : plan.payment 
                                            }  
                                            className='w-100p'>
                                                <button className={
                                                        (plan.recommended ? 'yellow hover-yellow' : 'blue hover-blue') 
                                                        + ' f-s-16 border-b p-1 h-4 border-r-1'
                                                    }
                                                > 
                                                    <span style={{ color : plan.recommended ? 'black' : 'white' }}>
                                                        {user.plan ? 'Continuer' : 'Essayer'}
                                                    </span> 
                                                </button>
                                            </Link>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='card-pricing' style={{ opacity : !plan.available && 0.4, borderRadius: '0 0 1rem 1rem' }} >

                                <div className='grid gap-2rem'>
                                    <div className='grid gap-04'>
                                        {
                                            plan.benefits &&
                                            plan.benefits
                                            .map((benefit, i)=> {
                                        
                                                return (
                                                    <div className='display gap hover h-2 p-04 click' style={{ borderBottom : i !== plan.benefits.length-1 && '1px solid var(--grey-2)' }} key={benefit}>
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
    )
}
