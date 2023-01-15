import { collection } from "firebase/firestore"
import { db } from "../../../../App/database/firebase"

async function processPayment() {

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
        const response = await axios({
            url: 'http://localhost:8080/stripe/charge',
            method: 'post',
            data : {
                amount: (amount * 100).toFixed(0),
                id: paymentMethod?.id
            }
        })


        const payment = {
            id : response.id
        }

        console.log(payment);

       /*  db.collection('users')
        .doc('email')
        collection('transactions')
        .set({}) */

        console.log('paiement réussi');
    }
    catch(error) {
        console.log(error)
    }
}