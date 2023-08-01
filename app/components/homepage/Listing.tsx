"use client";
import React from "react";
import ListingCard from "../listings/ListingCard";

function Listing({ listings, currentUser }: any) {
  return (
    <section id="landing__listing">
      <ul className="landing__list">
        {listings.map((listing: any) => {
          return (
            <ListingCard
              key={listing.id}
              listing={listing}
              currentUser={currentUser}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default Listing;
