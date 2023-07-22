"use client";
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Button from "../inputs/forms/Button";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, elements]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    console.log(process.env.NEXT_PUBLIC_BASE_URL);
    

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        },
      });

      if (error) {
        // Handle specific error types or use a default error message
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(
            error.message ?? "An unexpected error occurred. Please try again."
          );
        } else {
          setMessage("An unexpected error occurred.");
        }
      } else {
        // Payment success scenario
        setMessage("Payment succeeded!");
      }
    } catch (error) {
      console.log("Error creating payment element", error);
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs" as "tabs",
    paymentMethodTypes: ["card", "klarna", "apple_pay", "google_pay"],
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        rowGap: "22px",
      }}
    >
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Button disabled={!stripe || !elements} label="Pay" primaryButton />
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
