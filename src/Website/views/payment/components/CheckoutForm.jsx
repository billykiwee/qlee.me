import React, { useState } from 'react'
import { useStateProps } from '../../../../App/provider/ContextProvider'
import { serverTimestamp } from 'firebase/firestore'
import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from 'axios'
import { db } from '../../../../App/database/firebase'
import { plans } from '../../../../Admin/settings/plans'
import formatCurrency from '../../../../App/utils/formatCurrency'



export default function CheckoutForm({ props }) {


    const { user, error, planID, handleChange, infos } = props



    const [typeCard, setTypeCard] = useState('')

    return (
        <div className='grid white border border-r-1 p-2 shadow gap-1rem'>
                    
            <div className='grid m-b-1 gap'>
                <h2 className='f-s-25 m-0'>Vos informations</h2>
                <span className='c-grey f-w-300'>Entrez vos informations de contact et de paiement</span>
            </div>

            <div className='grid'>
                <label>Nom</label>
                <input type='text' className='div-input grey h-4 m-t-04' value={infos.name} id='name' onChange={handleChange} />
            </div>
            <div className='grid'>
                <label>Email</label>
                <input type='email' value={infos.email} className='div-input h-4 grey m-t-04' id='email'onChange={handleChange} />
            </div>
            
            <div className='grid gap-1rem' >
                <div className='grid gap'>
                    <label className='display'>Numéro de carte</label>
                    <div className='display justify-s-b border border-r-04 p-1 div-input grey h-4' id='card_number' >
                        <div className='w-100p'>
                            <CardNumberElement onChange={e=> setTypeCard(e.brand) } />
                        </div>

                        <div className='display gap-04'>
                            <div className="display">
                                {
                                    (!typeCard || typeCard === 'visa') &&
                                    <img alt="" src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg"/>
                                }
                                {
                                    typeCard === 'mastercard' &&
                                    <img alt="" src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg"/>
                                }
                                {
                                    typeCard === 'AmericanExpress' &&
                                    <img alt="" src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg"/>
                                }
                                {
                                    typeCard === 'amex' &&
                                    <img alt="" src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg"/>
                                }
                                {
                                    typeCard === 'discover' &&
                                    <img alt="" src="https://js.stripe.com/v3/fingerprinted/img/discover-ac52cd46f89fa40a29a0bfb954e33173.svg"/>
                                }
                            </div>
                        </div>
                    </div>
                    {error.id === 'number' && <small className='c-red'>{error.message}</small>}
                </div>

                <div className='grid gap'>
                    <div className='display justify-s-b gap'>
                        <div className='display gap justify-s-b w-100p align-top'>
                            <div className='grid w-100p gap'>
                                <label className='display'>Date d'expiration</label>
                                <div className='display justify-s-b border border-r-04 p-1 div-input h-4 grey' id='card_expiry'>
                                    <div className=' w-100p'>
                                        <CardExpiryElement className='c-white' />
                                    </div>
                                </div>
                            </div>
                            <div className='grid w-100p gap'>
                                <label className='display'>Code</label>
                                <div className='display justify-s-b border border-r-04 p-1 div-input h-4 grey' id='card_cvc'>
                                    <div className='w-100p'>
                                        <CardCvcElement className='c-white' />
                                    </div>
                                    <span className='display'>
                                        <svg className="p-CardCvcIcons-svg" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="var(--black)" role="presentation"><path opacity=".2" fill-rule="evenodd" clip-rule="evenodd" d="M15.337 4A5.493 5.493 0 0013 8.5c0 1.33.472 2.55 1.257 3.5H4a1 1 0 00-1 1v1a1 1 0 001 1h16a1 1 0 001-1v-.6a5.526 5.526 0 002-1.737V18a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h12.337zm6.707.293c.239.202.46.424.662.663a2.01 2.01 0 00-.662-.663z"></path><path opacity=".4" fill-rule="evenodd" clip-rule="evenodd" d="M13.6 6a5.477 5.477 0 00-.578 3H1V6h12.6z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M18.5 14a5.5 5.5 0 110-11 5.5 5.5 0 010 11zm-2.184-7.779h-.621l-1.516.77v.786l1.202-.628v3.63h.943V6.22h-.008zm1.807.629c.448 0 .762.251.762.613 0 .393-.37.668-.904.668h-.235v.668h.283c.565 0 .95.282.95.691 0 .393-.377.66-.911.66-.393 0-.786-.126-1.194-.37v.786c.44.189.88.291 1.312.291 1.029 0 1.736-.526 1.736-1.288 0-.535-.33-.967-.88-1.14.472-.157.778-.573.778-1.045 0-.738-.652-1.241-1.595-1.241a3.143 3.143 0 00-1.234.267v.77c.378-.212.763-.33 1.132-.33zm3.394 1.713c.574 0 .974.338.974.778 0 .463-.4.785-.974.785-.346 0-.707-.11-1.076-.337v.809c.385.173.778.26 1.163.26.204 0 .392-.032.573-.08a4.313 4.313 0 00.644-2.262l-.015-.33a1.807 1.807 0 00-.967-.252 3 3 0 00-.448.032V6.944h1.132a4.423 4.423 0 00-.362-.723h-1.587v2.475a3.9 3.9 0 01.943-.133z"></path></svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {error.id !== 'number' && <small className='c-red'>{error.message}</small>}
                </div>
            </div>

            <div className='display w-100p'>
                <div className='display w-100p'>
                    <button className='blue c-white hover-blue border-r-1 f-s-16 h-4 p-1' type='submit'>
                        <span>Payer {formatCurrency(plans[planID].price)} par mois</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
