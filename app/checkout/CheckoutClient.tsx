"use client";
import React, { useEffect, useMemo, useState } from "react";
import StripeCheckout from "../components/checkout/StripeCheckout";
import Resume from "../components/checkout/Resume";
import axios from "axios";
import { parseFormattedDate } from "@/utils/helpers";
import { differenceInCalendarDays } from "date-fns";
import { getFormattedDate } from "@/utils/helpers";

interface Params {
  startDate: string;
  endDate: string;
}

function CheckoutClient({
  params,
  checkoutListing,
}: {
  params: Params;
  checkoutListing: any;
}) {
  const { startDate, endDate } = params;

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
  };

  return (
    <div className="checkout__content">
      <StripeCheckout item={item} />
      <Resume item={item} />
    </div>
  );
}

export default CheckoutClient;
