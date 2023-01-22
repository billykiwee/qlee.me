import React, { useState } from 'react'
import Main from '../../../App/components/Main'
import formatCurrency from '../../../App/utils/formatCurrency'
import { loadStripe } from '@stripe/stripe-js'
import { plans } from '../../../Admin/settings/plans'
import CheckoutForm from './components/CheckoutForm'
import { processPayment } from './functions/process'
import { Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import { useStateProps } from '../../../App/provider/ContextProvider'
import ValidPayment from './components/ValidPayment'
import { useParams } from 'react-router-dom'


export function Stripe({ props }) {

    const { planID, billiedID } = props

    const [ShowCart, setShowCart] = useState(true)

    const { snackBar } = useStateProps()
    const user = useStateProps()?.user?.profil
    
    const [MSG, setMSG] = useState({})


    const [error, setError] = useState({})

    const [valid, setValid] = useState(false)


    const stripe = useStripe()
    const elements = useElements()


    const total = billiedID === 'yearly' ? plans[planID].price?.[billiedID] * 12 : plans[planID].price?.[billiedID]


    if (valid) return <ValidPayment />
    return (
        <>
            <h2 className='m-0'>Paiement</h2>
            <form onSubmit={e=> processPayment({ e, stripe, elements, setError, planID, billiedID, total, user, snackBar, setValid, setMSG })} className='grid' >
                
                <div className='grid gap align-top blocks w-100p'>
                    <div className='grid w-100p '>
                        <div className='grid w-100p '>
                            <div className='grid white border border-r-1 p-1 shadow gap'>

                                <div className='grid m-b-1'>
                                    <div className='display justify-s-b m-t-1'>
                                        <span className='f-s-20 m-0'>Récapitulatif</span>
                                        <div className='display'>
                                            <button onClick={e=> setShowCart(ShowCart === false ? true : false)} className='border grey hover' type='button' >
                                                <span>{ShowCart === true ? 'Masquer' : 'Afficher'}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className='grid' style={{display : ShowCart === true ? 'block' : 'none'}} >
                                    <div className='display justify-s-b align-top f-s-14'>
                                        <div className='grid gap m-b-04 w-50'>
                                            <span className='c-grey'>Article</span>
                                            <span>Paiement {billiedID === 'yearly' ? 'annuel' : 'mensuel' } {planID}</span>
                                        </div>
                                        <div className='grid gap'>
                                            <span className='c-grey'>Prix TVA</span>
                                            <span className='text-align-e'>
                                                {
                                                    billiedID === 'yearly' 
                                                    ? formatCurrency(plans[planID].price?.[billiedID]) + ' x 12'
                                                    : formatCurrency(plans[planID].price?.[billiedID])
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className='display justify-s-b f-w-500'>
                                    <span className='f-s-18'>Total :</span>
                                    <span className='f-s-25'>{formatCurrency(total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CheckoutForm props={{ user, MSG, error, planID, billiedID, total }} />
                </div>
            </form>
        </>
    ) 

}


export default function Payment() {

    const { planID, billiedID } = useParams()

    const stripePromise = loadStripe('pk_test_51HKFx4L8AEDuYjhscUrD37Q7AP9kCKtBF8uG8xO6DCh5FKNrTuyLAecOgxZyXHPtaV4jduDf6fWoJBiGuqjjcK8c00z71QBckl')

    return (
        <Main>
            <div className='grid gap-1rem'>
                <Elements stripe={stripePromise} >
                    <Stripe props={{ planID : planID.toLocaleUpperCase(), billiedID }} />
                </Elements>
            </div>
        </Main>
    )
}


