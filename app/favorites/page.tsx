import React from "react";
import getFavoriteListings from "../actions/getFavoriteListings";
import Image from "next/image";

const Favorites = async function () {
  const favorites = await getFavoriteListings();

  if (favorites.length === 0) {
    return (
      <section className="landing">
        <div>
          <h2>You have no favorites</h2>
          <p>Once you favorite a place, your favorites will appear here.</p>
        </div>
      </section>
    );
  }

  return (
    <div className="landing">
      <h1>Favorites</h1>
      <ul className="listing">
        {favorites.map((listing: any) => {
          return (
            <li key={listing.id}>
              <h3>{listing.title}</h3>
              <Image
                src={listing.imageSrc}
                alt={listing.title}
                width={100}
                height={100}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Favorites;
