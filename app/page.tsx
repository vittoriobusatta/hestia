import React from "react";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "@/app/actions/getListings";
import "../sass/styles.scss";
import Landing from "./components/homepage/Landing";
import Listing from "./components/homepage/Listing";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);

  return (
    <section className="landing">
      <Landing />
      <Listing listings={listings} currentUser={currentUser} />
    </section>
  );
};

export default Home;

export const dynamic = "force-dynamic";
