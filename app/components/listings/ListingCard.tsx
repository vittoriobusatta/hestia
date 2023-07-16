"use client";

import Image from "next/image";
import { useState } from "react";

function ListingCard({ listing }: { listing: any }) {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <li>
      <picture>
        <Image
          className={`picture__image ${
            loadingComplete ? "picture__image--loading" : ""
          }`}
          src={listing.imageSrc}
          alt={listing.title}
          height={400}
          width={400}
          onLoadingComplete={() => setLoadingComplete(true)}
        />
      </picture>
      <div className="picture__content">
        <div className="picture__head">
          <h3>
            {listing.title} - <span>{listing.locationValue}</span>
          </h3>
          <p className="picture__category">{listing.category}</p>
        </div>
        <p className="picture__body">
          {listing.price} <span>€</span>
          <span> / night</span>
        </p>
      </div>
    </li>
  );
}

export default ListingCard;
