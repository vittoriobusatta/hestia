import getListingById from "@/app/actions/getListingById";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ListingClient listing={listing} currentUser={currentUser} />
    </>
  );
};

export default ListingPage;
