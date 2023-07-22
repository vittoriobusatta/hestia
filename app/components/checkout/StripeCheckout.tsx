"use client";

import React, { useEffect, useState } from "react";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./StripeForm";
import axios from "axios";
import Stripe from "stripe";

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
  }, [
    checkoutListing.id,
    checkoutListing.price,
    endDate,
    startDate,
    totalPrice,
  ]);

  const appearance = {
    theme: "stripe" as "stripe",
  };

  const options = {
    clientSecret,
    appearance,
    layout: {
      type: "accordion",
      defaultCollapsed: false,
      radios: true,
      spacedAccordionItems: false,
    },
  };

  return (
    <div className="checkout__form">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
