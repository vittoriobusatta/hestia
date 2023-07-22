import getListingById from "../actions/getListingById";
import CheckoutClient from "./CheckoutClient";

interface Params {
  listingId: string;
  startDate: string;
  endDate: string;
  numberOfGuests: string;
}

const Checkout = async ({ searchParams }: { searchParams: Params }) => {
  if (!searchParams.listingId) {
    return <div>Loading...</div>;
  }

  try {
    const listing = await getListingById(searchParams);

    return (
      <div className="landing">
        <CheckoutClient params={searchParams} checkoutListing={listing} />
      </div>
    );
  } catch (error) {
    console.log("Error fetching listing:", error);

    return <div>Error fetching listing.</div>;
  }
};

export default Checkout;