"use client";

import Image from "next/image";
import { useState } from "react";
import HeartButton from "../inputs/HeartButton";
import { Listing } from "@prisma/client";
import { useRouter } from "next/navigation";

type ListingCardProps = {
  listing: Listing;
  currentUser: any;
};

function ListingCard({ listing, currentUser }: ListingCardProps) {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const router = useRouter();

  const { id, title, locationValue, category, price, imageSrc } = listing;

  return (
    <li className="landing__item" onClick={() => router.push(`/listings/${id}`)}>
      <picture className="picture">
        <Image
          className={`picture__image ${
            loadingComplete ? "picture__image--loading" : ""
          }`}
          src={imageSrc}
          alt={title}
          height={400}
          width={400}
          onLoadingComplete={() => setLoadingComplete(true)}
          priority
        />
        <div className="picture__hearth">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </picture>
      <div className="picture__content">
        <div className="picture__head">
          <h3>
            {title} - <span>{locationValue}</span>
          </h3>
          <p className="picture__category">{category}</p>
        </div>
        <p className="picture__body">
          {price} <span>€</span>
          <span> / night</span>
        </p>
      </div>
    </li>
  );
}

export default ListingCard;
