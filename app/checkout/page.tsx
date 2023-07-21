"use client";
import StripeProvider from "../components/checkout/StripeProvider";

function Checkout() {
  return (
    <div className="landing">
      <StripeProvider />
    </div>
  );
}

export default Checkout;
