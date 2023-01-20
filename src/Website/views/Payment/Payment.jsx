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


export function Stripe({ planID }) {

    const [ShowCart, setShowCart] = useState(true)

    const { snackBar } = useStateProps()
    const user = useStateProps()?.user?.profil
    
    const [MSG, setMSG] = useState({})


    const [error, setError] = useState({})

    const [valid, setValid] = useState(false)


    const stripe = useStripe()
    const elements = useElements()
    

    if (valid) return <ValidPayment />
    return (
        <>
            <h1 className='m-0'>Paiement</h1>
            <form onSubmit={e=> processPayment({ e, stripe, elements, setError, planID, user, snackBar, setValid, setMSG })} >
                
                <div className='grid justify-s-b gap align-top blocks' >
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
                                            <span>Paiement récurrent {planID}</span>
                                        </div>
                                        <div className='grid gap'>
                                            <span className='c-grey'>Prix TVA</span>
                                            <span>{formatCurrency(plans[planID].price)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='display justify-s-b f-w-500'>
                                    <span className='f-s-18'>Total :</span>
                                    <span className='f-s-20'>{formatCurrency(plans[planID].price)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CheckoutForm props={{ user, MSG, error, planID }} />
                </div>
            </form>
        </>
    ) 

}


export default function Payment() {

    const { planID } = useParams()

    const stripePromise = loadStripe('pk_test_51HKFx4L8AEDuYjhscUrD37Q7AP9kCKtBF8uG8xO6DCh5FKNrTuyLAecOgxZyXHPtaV4jduDf6fWoJBiGuqjjcK8c00z71QBckl')

    return (
        <Main>
            <div className='grid gap-1rem'>
                <Elements stripe={stripePromise} >
                    <Stripe planID={planID.toLocaleUpperCase()} />
                </Elements>
            </div>
        </Main>
    )
}

