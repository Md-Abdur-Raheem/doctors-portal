import { CircularProgress } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth'

const CheckoutForm = ({ appointment }) => {
    const { price, patientName, _id } = appointment;
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [clientSecrets, setClientSecrets] = useState('');
    const { user } = useAuth();

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        fetch('https://pure-journey-93406.herokuapp.com/create-payment-intent', {
            method: "POST",
            headers: { 'content-type': "application/json" },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecrets(data.clientSecret));
    },[price])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            setError(error.message);
            setSuccess('')
        }
        else {
            setError('');
            console.log(paymentMethod);
        }

        //payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecrets, {
              payment_method: {
                card: card,
                billing_details: {
                    name: patientName,
                    email: user.email
                },
              },
            },
          );
        if (intentError) {
            setError(intentError.message);
            setSuccess('');
        }
        else {
            setError('');
            setSuccess('Your payment process successfully')
            console.log(paymentIntent);
            setProcessing(false);
            const payment = {
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                last4: paymentMethod.card.last4,
                transcationId: paymentIntent.id
            }
            fetch(`https://pure-journey-93406.herokuapp.com/appointments/${_id}`, {
                method: "PUT",
                headers: { 'content-type': "application/json" },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => console.log(data))

        }
        
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                options={{
                    style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                        color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                    },
                }}
                />
               
                    {
                    processing ? <CircularProgress />
                        : <button type="submit" disabled={!stripe || success}>Pay ${price}</button>
                    }
                
            </form>
            {
                error && <p style={{color:"red"}}>{error }</p>
            }
            {
                success && <p style={{color:"green"}}>{success }</p>
            }
        </div>
    );
};

export default CheckoutForm;

/* 
1. install stripe & stripe-react
2. set publishable key
3. Elements
4. CheckoutForm
----------------
5. create payment method
6. create payment intent api
7. load cliet secret
8. confirmed payment
9. handle user error


*/