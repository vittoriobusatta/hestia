"use client";

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval, format } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { getFormattedDate } from "@/utils/helpers";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    const startDate = dateRange.startDate ?? new Date();
    const endDate = dateRange.endDate ?? new Date();

    const startDateString = getFormattedDate(startDate);
    const endDateString = getFormattedDate(endDate);

    router.push(
      `/checkout?&startDate=${startDateString}&endDate=${endDateString}&listingId=${listing.id}&numberOfGuests=1`
    );

    setIsLoading(false);
  }, [currentUser, dateRange, listing, loginModal, router]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <section className="listing__page">
      <div className="listing__content">
        <ListingHead listing={listing} user={listing?.user} />
        <div className="listing__d">
          <ListingInfo listing={listing} />
          <ListingReservation
            price={listing.price}
            totalPrice={totalPrice}
            onChangeDate={(value: any) => setDateRange(value)}
            dateRange={dateRange}
            onSubmit={onCreateReservation}
            disabled={isLoading}
            disabledDates={disabledDates}
          />
        </div>
      </div>
    </section>
  );
};

export default ListingClient;
