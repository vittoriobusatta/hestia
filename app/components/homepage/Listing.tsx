"use client";
import React from "react";
import ListingCard from "../listings/ListingCard";

function Listing({ listings, currentUser }: any) {
  console.log(currentUser);

  return (
    <section>
      <ul className="landing__listing">
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
