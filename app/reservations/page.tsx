import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import TripsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <>
        <div>
          <h1>Unauthorized</h1>
          <p>Please login</p>
        </div>
      </>
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <>
        <div>
          <h1>Reservations</h1>
          <p>No reservations found</p>
        </div>
      </>
    );
  }

  return (
    <div className="landing">
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </div>
  );
};

export default ReservationsPage;
