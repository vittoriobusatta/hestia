import React from "react";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";
import getCurrentUser from "../actions/getCurrentUser";

const Favorites = async function () {
  const favorites = await getFavoriteListings();
  const currentUser = await getCurrentUser();

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
      <FavoritesClient listings={favorites} currentUser={currentUser} />
    </div>
  );
};

export default Favorites;
