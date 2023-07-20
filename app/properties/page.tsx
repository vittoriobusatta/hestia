import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div>
        <h1>Properties</h1>
        <p>Please sign in</p>
      </div>
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <div>
        <h1>Properties</h1>
        <p>You have no properties</p>
      </div>
    );
  }

  return (
    <div className="landing">
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </div>
  );
};

export default PropertiesPage;
