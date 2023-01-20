import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { plans } from '../../../../../Admin/settings/plans'
import { useStateProps } from '../../../../../App/provider/ContextProvider'
import { PlansData } from './data/plans'


export default function Plans() {

    const history = useNavigate()
    const { auth, user } = useStateProps()
    const User = user?.profil


    return (
        <div className='display justify-c gap-1rem align-top m-t-1 pricing-blocks'>
            {
                Object.values(PlansData)
                .map(plan => {

                    return (
                        <div className='grid' key={plan.plan} >
                            <div className='border-b border border-r-1 card-pricing white' style={{ opacity : !plan.available && 0.4 }}  >

                                <div className='grid gap-2rem'>
                                    <div className='display justify-s-b align-top'>
                                        <div className='grid align-l gap'>
                                            <span className='f-s-25 f-w-600'>{plan.plan}</span>
                                            <span className='opacity'>{plan.subtitle}</span>
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
                                                    <span className='display f-w-600 f-s-3rem'>{plan.price}</span>
                                                    <span className='f-s-20 m-l-04 opacity'>€ /mois</span>
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
                                    <div className='grid gap-04 grey border-r-1 p-1 '>
                                        {
                                            plan.benefits &&
                                            plan.benefits
                                            .map((benefit)=> {
                                        
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
    )
}
