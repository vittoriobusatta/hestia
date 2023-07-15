import Image from "next/image";
import React from "react";

function ListingCard({ listing }: { listing: any }) {
  return (
    <li>
      <picture>
        <Image
          src={listing.imageSrc}
          alt={listing.title}
          height={400}
          width={400}
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
