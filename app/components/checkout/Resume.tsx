"use client";

import React from "react";
import { formatResumeDate } from "@/utils/helpers";
import Image from "next/image";

interface ResumeProps {
  item: {
    startDate: string;
    endDate: string;
    checkoutListing: any;
    totalPrice: number;
  };
}

function Resume({ item }: ResumeProps) {
  const { startDate, endDate, checkoutListing, totalPrice } = item;
  const resumeDate = formatResumeDate(startDate, endDate);

  return (
    <div>
      <div>
        <p>Your Trip</p>
        <p>Dates</p>
        <p>{resumeDate}</p>
        <p>Price</p>
        <p>
          {totalPrice}
          <span>{checkoutListing?.currency === "usd" ? "$" : "€"}</span>
        </p>
      </div>
      <div>
        <Image
          src={checkoutListing?.imageSrc}
          alt={checkoutListing?.title}
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}

export default Resume;
