import React from "react";

function CheckoutClient({ searchParams }: any) {
  return (
    <div className="landing">
      <p>Payment {searchParams.redirect_status}</p>
    </div>
  );
}

export default CheckoutClient;
