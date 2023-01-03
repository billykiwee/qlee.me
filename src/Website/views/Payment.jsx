import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';

export const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    phone: '',
    name: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement('card').focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });

    setProcessing(false);

    if (payload.error) {
      setError(payload.error);
    } else {
      setPaymentMethod(payload.paymentMethod);
    }
  };

  const handleChange = (event) => {
    setBillingDetails({
      ...billingDetails,
      [event.target.name]: event.target.value,
    });
  };

  return paymentMethod ? (
    // Show a success message
    <div>
      Payment succeeded, got paymentMethod: {paymentMethod.id}
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={billingDetails.email}
        onChange={handleChange}
      />
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={billingDetails.name}
        onChange={handleChange}
      />
      <input
        name="phone"
        type="tel"
        placeholder="Phone"
        value={billingDetails.phone}
        onChange={handleChange}
      />
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770
