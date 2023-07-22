"use client";
import React, { useMemo } from "react";
import StripeCheckout from "../components/checkout/StripeCheckout";
import Resume from "../components/checkout/Resume";
import { formatResumeDate, parseFormattedDate } from "@/utils/helpers";
import { differenceInCalendarDays } from "date-fns";

interface Params {
  startDate: string;
  endDate: string;
  numberOfGuests: string;
}

function CheckoutClient({
  params,
  checkoutListing,
}: {
  params: Params;
  checkoutListing: any;
}) {
  const { startDate, endDate, numberOfGuests } = params;

  const totalPrice = useMemo(() => {
    if (startDate && endDate) {
      const formattedStartDate = parseFormattedDate(startDate);
      const formattedEndDate = parseFormattedDate(endDate);
      const days = differenceInCalendarDays(
        formattedEndDate,
        formattedStartDate
      );
      return days * checkoutListing.price;
    }
    return 0;
  }, [startDate, endDate, checkoutListing]);

  const item = {
    totalPrice: totalPrice,
    startDate: startDate,
    endDate: endDate,
    checkoutListing: checkoutListing,
    numberOfGuests: numberOfGuests,
  };

  const resumeDate = formatResumeDate(startDate, endDate);

  return (
    <div className="checkout">
      <div className="checkout__content">
        <div className="checkout__content__resume">
          <div className="checkout__content__title">
            <h1>Request to book</h1>
          </div>
          <h2>Your trip</h2>
          <div className="checkout__content__resume__date">
            <div>
              <h4>Dates</h4>
              <p>{resumeDate}</p>
            </div>
            <div>
              <h4>Guests</h4>
              <p>
                {numberOfGuests}
                {parseInt(numberOfGuests) > 1 ? " guests" : " guest"}
              </p>
            </div>
          </div>
          <hr color="#cccccc" />
          <StripeCheckout item={item} />
        </div>
        <Resume item={item} />
      </div>
    </div>
  );
}

export default CheckoutClient;
