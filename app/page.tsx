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
  let currentUser;
  try {
    currentUser = await getCurrentUser();
  } catch (error: any) {
    console.error("Error while fetching current user:", error.message);
    currentUser = null;
  }
  const listings = await getListings(searchParams);

  return (
    <>
      <Landing />
      <Listing listings={listings} currentUser={currentUser} />
    </>
  );
};

export default Home;

export const dynamic = "force-dynamic";
