import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <section className="landing">
        <div>
          <h2>You have no trips</h2>
          <p>Once you book a place, your trips will appear here.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="landing__listing">
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </section>
  );
};

export default TripsPage;
