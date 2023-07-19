"use client";

import dynamic from "next/dynamic";
import { SafeListing } from "@/app/types";
import { getCoordinates } from "@/app/actions/getCoordinates";
import { useMemo } from "react";
import { categories } from "@/app/data/categories";

const Map = dynamic(() => import("../../components/map/Map"), {
  ssr: false,
});

interface ListingInfoProps {
  listing: SafeListing;
}

const ListingInfo: React.FC<ListingInfoProps> = ({ listing }) => {
  const category = useMemo(() => {
    return categories.find((items: any) => items.label === listing.category);
  }, [listing.category]);

  const coordinates = useMemo(() => {
    return getCoordinates(listing?.locationValue);
  }, [listing?.locationValue]);

  const Icon = useMemo(() => {
    return category?.icon;
  }, [category]);

  const { roomCount, bathroomCount, guestCount, price, description } = listing;

  return (
    <section className="listing__i">
      <div className="listing__body">
        <div>
          {Icon && <Icon />}
          <p>{category?.label}</p>
        </div>
        <p>
          {roomCount} {roomCount === 1 ? "room" : "rooms"} - {bathroomCount}{" "}
          {bathroomCount === 1 ? "bathroom" : "bathrooms"} - {guestCount}{" "}
          {guestCount === 1 ? "guest" : "guests"}
        </p>

      </div>
      <hr />
      <p>{description}</p>
      <Map center={coordinates} strongZoom={true} />
    </section>
  );
};

export default ListingInfo;
