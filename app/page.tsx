import React from "react";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "@/app/actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import Categories from "./components/navbar/Categories";
import "../sass/styles.scss";
import StripeProvider from "./components/checkout/StripeProvider";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);

  return (
    <section className="landing">
      <Categories />
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
      {/* <StripeProvider /> */}
    </section>
  );
};

export default Home;

export const dynamic = "force-dynamic";
