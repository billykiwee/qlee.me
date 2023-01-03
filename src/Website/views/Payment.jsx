import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import Main from '../../App/components/Main';

const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    phone: '',
    name: '',
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement('cardNumber').focus();
      return;
    }

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: {
        number: cardDetails.cardNumber,
        exp_month: cardDetails.expiry.split('/')[0],
        exp_year: cardDetails.expiry.split('/')[1],
        cvc: cardDetails.cvc,
      },
      billing_details: billingDetails,
    });

    setProcessing(false);

    if (error) {
      setError(error);
    } else {
      setPaymentMethod(paymentMethod);
    }
  };

  const handleChange = (event) => {
    setBillingDetails({
      ...billingDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleCardDetailsChange = (event) => {
    setCardDetails({
      ...cardDetails,
      [event.target.name]: event.target.value,
    });
  };

  return paymentMethod ? (
    // Show a success message
    <div>
      Payment succeeded, got paymentMethod: {paymentMethod.id}
    </div>
  ) : (
    <form onSubmit={handleSubmit} className='grid gap'>
        <input
            className='grey'
            name="email"
            type="email"
            placeholder="Email"
            value={billingDetails.email}
            onChange={handleChange}
        />
        <input
            className='grey'
            name="name"
            type="text"
            placeholder="Name"
            value={billingDetails.name}
            onChange={handleChange}
        />
        <input
            className='grey'
            name="phone"
            type="tel"
            placeholder="Phone"
            value={billingDetails.phone}
            onChange={handleChange}
        />
        <input
            className='grey'
            name="cardNumber"
            type="text"
            placeholder="Card number"
            value={cardDetails.cardNumber}
            onChange={handleCardDetailsChange}
        />
        <input
            className='grey'
            name="expiry"
            type="text"
            placeholder="Expiry (MM/YY)"
            value={cardDetails.expiry}
            onChange={handleCardDetailsChange}
        />
        <input
            className='grey'
            name="cvc"
            type="text"
            placeholder="CVC"
            value={cardDetails.cvc}
            onChange={handleCardDetailsChange}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button disabled={processing || !stripe} className='blue h-3 p-1'>
            <span>{processing ? 'Processing...' : 'Pay'}</span>
        </button>
    </form>
  );
};


export default function Payment() {
  return (
    <Main>
        <Elements stripe={loadStripe('pk_test_51HKFx4L8AEDuYjhscUrD37Q7AP9kCKtBF8uG8xO6DCh5FKNrTuyLAecOgxZyXHPtaV4jduDf6fWoJBiGuqjjcK8c00z71QBckl')} >
        <CheckoutForm />
        </Elements>
    </Main>
  );
};


