import { SafeListing, SafeUser } from "@/app/types";
import ListingCard from "@/app/components/listings/ListingCard";

interface FavoritesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {

  return (
    <>
      <div className="landing__listing">
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            listing={listing}
          />
        ))}
      </div>
    </>
  );
};

export default FavoritesClient;
