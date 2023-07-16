import React from "react";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "@/app/actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import Categories from "./components/navbar/Categories";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);
  return (
    <section className="landing">
      <Categories />
        {currentUser ? (
          <div className="home__message">
            <h1>
              Welcome back, <span>{currentUser.name}!</span>
            </h1>
          </div>
        ) : (
          <div className="home__message">
            <h1>Welcome to Hestia!</h1>
          </div>
        )}
        <ul className="listing">
          {listings.map((listing: any) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </ul>
    </section>
  );
};

export default Home;

export const dynamic = "force-dynamic";
