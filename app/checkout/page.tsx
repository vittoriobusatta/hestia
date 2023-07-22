import getListingById from "../actions/getListingById";
import CheckoutClient from "./CheckoutClient";

interface Params {
  listingId: string;
  startDate: string;
  endDate: string;
}

const Checkout = async ({ searchParams }: { searchParams: Params }) => {
  const listing = await getListingById(searchParams);

  return (
    <div className="landing">
      <CheckoutClient params={searchParams} checkoutListing={listing} />
    </div>
  );
};

export default Checkout;
