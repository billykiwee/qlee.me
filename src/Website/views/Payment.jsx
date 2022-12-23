import React, { useRef, useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

export default function Payment() {

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    setProcessing(true);

    // Générer un paiement avec Stripe et récupérer le client secret
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'John Doe',
        },
      }
    }).then(({ paymentIntent }) => {
      // Gérer le succès du paiement
      setSucceeded(true);
      setError(null);
      setProcessing(false);
    }).catch((error) => {
      // Gérer les erreurs du paiement
      setSucceeded(false);
      setError(error);
      setProcessing(false);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter your card details</h2>
      <CardElement />
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      <button disabled={processing || succeeded}>
        {processing ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );

}