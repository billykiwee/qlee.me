import { CardNumberElement } from "@stripe/react-stripe-js"
import axios from "axios"
import { serverTimestamp } from "firebase/firestore"
import { plans } from "../../../../Admin/settings/plans"
import { db } from "../../../../App/database/firebase"

export async function processPayment(props) {
    
    const { e, stripe, elements, setError, planID, billingID, total, user, snackBar, setValid, setMSG } = props
    e.preventDefault()
    
    setMSG({ loader: true })
    
    if (!stripe || !elements) return


    // card number element as the card element
    const cardNumberElement = elements?.getElement(CardNumberElement)

    const {error, paymentMethod} = await stripe.createPaymentMethod({ type: 'card', card: cardNumberElement })

    if (error) {
        setError({
            id : error.code.split('incomplete_')[1],
            message: error.message
        })

        setMSG({ loader: false })
    }

    const amount = total

    try {

        const payment = {
            id          : paymentMethod?.id,
            formatAmount: amount,
            amount      : (amount * 100).toFixed(0),
            date        : serverTimestamp(),
            type        : 'plan',
            billingID,
            user: user.email
        }

        const response = await axios({
            url   : 'http://localhost:8080/stripe/charge',
            method: 'post',
            data  : payment
        })


        await db.collection('users')
        .doc(user.email)
        .update({ plan: planID })

        await db.collection('transactions')
        .doc(payment.id)
        .set(payment)


        setValid(true)
        setMSG({ loader: false })

        snackBar.add({ text: 'Paiment réussi' })
        console.log(user.email, payment, 'paiement réussi')
    }
    catch(error) {
        console.log(error)
    }
}