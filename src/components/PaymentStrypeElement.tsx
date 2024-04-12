//@ts-nocheck
"use client";
import React from "react";
import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_OTRO_TOKEN_XD);

const PaymenStripeElement = ({ clientSecret }: { clientSecret: string }) => {
  const options = {
    clientSecret: clientSecret,
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };
  return (
    <>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </>
  );
};

export default PaymenStripeElement;
