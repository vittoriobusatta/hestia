"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "@/app/types";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          router.refresh();
        })
        .catch((error) => {
          console.error(error);
          alert("An error occured while trying to cancel the reservation.");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <div className="landing__listing">
      {reservations.map((reservation: any) => (
        <ListingCard
          key={reservation.id}
          listing={reservation.listing}
          reservation={reservation}
          actionId={reservation.id}
          onAction={onCancel}
          disabled={deletingId === reservation.id}
          actionLabel="Cancel reservation"
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default TripsClient;
