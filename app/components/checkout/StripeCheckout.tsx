"use client";

import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./StripeForm";
import axios from "axios";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

interface ResumeProps {
  item: {
    startDate: string;
    endDate: string;
    checkoutListing: any;
    totalPrice: number;
  };
}

export default function StripeCheckout({ item }: ResumeProps) {
  const [clientSecret, setClientSecret] = useState("");

  const { startDate, endDate, checkoutListing, totalPrice } = item;

  useEffect(() => {
    const getClientSecret = async () => {
      await axios
        .post("api/checkout/stripe_intent", {
          headers: { "Content-Type": "application/json" },
          items: [
            {
              price: checkoutListing.price,
              startDate: startDate,
              endDate: endDate,
              totalPrice: totalPrice,
              listingId: checkoutListing.id,
            },
          ],
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    };
    getClientSecret();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}
