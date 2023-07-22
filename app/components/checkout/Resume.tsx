"use client";

import React from "react";
import Image from "next/image";
import { parseFormattedDate } from "@/utils/helpers";

interface ResumeProps {
  item: {
    startDate: string;
    endDate: string;
    checkoutListing: any;
    totalPrice: number;
    numberOfGuests: string;
  };
}

function Resume({ item }: ResumeProps) {
  const { startDate, endDate, checkoutListing, numberOfGuests, totalPrice } =
    item;

  const start = parseFormattedDate(startDate);
  const end = parseFormattedDate(endDate);

  const nights = Math.round((end.getTime() - start.getTime()) / 86400000);

  console.log(checkoutListing);

  return (
    <div className="checkout__content__item">
      <div className="checkout__content__item__price">
        <div>
          <Image
            src={checkoutListing.imageSrc}
            alt={checkoutListing.title}
            width={300}
            height={300}
          />
          <h3>
            {/* {checkoutListing.title.length > 20
              ? checkoutListing.title.slice(0, 20) + "..."
              : checkoutListing.title} */}
            {checkoutListing.title} in {checkoutListing.locationValue}
          </h3>
        </div>
        <hr color="#cccccc" />
        <div
          className="
        checkout__content__item__price__details
        "
        >
          <h2>Details of price</h2>
          <div
            className="
          checkout__content__item__price__details__total
          "
          >
            <p>
              {checkoutListing.price}€ x {nights} nights
            </p>
            <p>{totalPrice}€</p>
          </div>
          <hr color="#cccccc" />
          <div
            className="
          checkout__content__item__price__details__total
          "
          >
            <p>Subtotal</p>
            <p>{totalPrice}€</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
