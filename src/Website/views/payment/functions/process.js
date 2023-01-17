import { useElements, useStripe } from "@stripe/react-stripe-js"

export async function processPayment(props) {

    const { stripe, elements } = props


    if (!stripe || !elements) return

    // card number element as the card element
    const cardNumberElement = elements?.getElement(CardNumberElement)

    const {error, paymentMethod} = await stripe.createPaymentMethod({ type: 'card', card: cardNumberElement })

    if (error) setError({
        id : error.code.split('incomplete_')[1],
        message: error.message
    })

    const amount = plans[planID].price

    try {

        const payment = {
            id          : paymentMethod?.id,
            formatAmount: amount,
            amount      : (amount * 100).toFixed(0),
            date        : serverTimestamp()
        }

        const response = await axios({
            url   : 'http://localhost:8080/stripe/charge',
            method: 'post',
            data  : payment
        })

        await db.collection('users')
        .doc(user.email)
        .update({ plan: planID })

        await db.collection('users')
        .doc(user.email)
        .collection('transactions')
        .doc(payment.id)
        .set(payment)

        snackBar.add({
            text: 'Paiment réussi'
        })
        console.log(user.email, payment, 'paiement réussi')
    }
    catch(error) {
        console.log(error)
    }
}