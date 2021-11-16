import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51Jw0hLC5oEvRCY62lWyxMUN5YGqcco0HZWyaIRL2moF3g4KgDogZm6NuxSS7FHixQIXz2Z6VcidQxFW7MP2zl3Fs00DIe2yzBL');

const Payment = () => {
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState({});
    useEffect(() => {
        fetch(`https://pure-journey-93406.herokuapp.com/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data))
    }, [appointmentId])
    
    return (
        <div>
            <h1>Payment of {appointment.patientName} for {appointment.serviceName}</h1>
            <h4>Price: ${appointment.price}</h4>
            
            {appointment.price && <Elements stripe={stripePromise}>
                <CheckoutForm
                    appointment={appointment}
                />
            </Elements>}
        </div>
    );
};

export default Payment;