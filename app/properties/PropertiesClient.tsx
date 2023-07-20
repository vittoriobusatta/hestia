"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";
import ListingCard from "@/app/components/listings/ListingCard";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          console.log("Property deleted");
          router.refresh();
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <div className="landing__listing">
      {listings.map((listing: any) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          actionId={listing.id}
          onAction={onDelete}
          disabled={deletingId === listing.id}
          actionLabel="Delete property"
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default PropertiesClient;
