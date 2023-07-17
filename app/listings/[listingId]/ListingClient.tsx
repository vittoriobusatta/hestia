"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { categories } from "@/app/data/categories";
import Avatar from "@/app/components/Avatar";
import Image from "next/image";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category);
  }, [listing.category]);

  return (
    <section className="listing__page">
      <Image
        className="listing__image"
        src={listing?.imageSrc}
        alt={listing?.title}
        height={400}
        width={400}
      />
      <div className="listing__content">
        <div className="listing__head">
          <div className="listing__head__left">
            <h1>{listing?.title}</h1>
            <p>{listing?.locationValue}</p>
          </div>
          <div className="listing__head__right">
            <h2>Hosted by <span>{listing?.user.name?.split(" ")[0]}</span></h2>
            <Avatar src={listing?.user.image} />
          </div>
        </div>
        <hr />
        <div className="listing__body">
          <p>
            {listing?.roomCount} {listing?.roomCount > 1 ? "rooms" : "room"} {"-"}
            {""} {listing?.bathroomCount}
            {""} {listing?.bathroomCount > 1 ? "bathrooms" : "bathroom"} {"-"}
            {""} {listing?.guestCount}{" "}
            {listing?.guestCount > 1 ? "guests" : "guest"}
          </p>
          <p>{listing?.price} € / night</p>
        </div>
        <p>{listing?.description}</p>
      </div>
    </section>
  );
};

export default ListingClient;
