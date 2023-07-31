"use client";
import React, { useMemo } from "react";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import { differenceInDays } from "date-fns";

function Search() {
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (!locationValue) {
      return "Une destination";
    }

    return `${locationValue}, La Réunion`;
  }, [locationValue]);

  const durationLabel = useMemo(() => {
    if (!startDate || !endDate) {
      return "Une date";
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    let diff = differenceInDays(end, start);

    if (diff === 0) {
      diff = 1;
    }

    return `${diff} nuit${diff > 1 ? "s" : ""}`;
  }, [startDate, endDate]);

  const guestCountLabel = useMemo(() => {
    const count: any = Number(guestCount);

    if (!guestCount) {
      return "Nombre de voyageurs";
    }

    return `${guestCount} voyageur${count > 1 ? "s" : ""}`;
  }, [guestCount]);

  return (
    <div className="search" onClick={searchModal.onOpen}>
      <button className="search__input">{locationLabel}</button>
      <span className="search__line" />
      <button className="search__input">{durationLabel}</button>
      <span className="search__line" />
      <button className="search__input">{guestCountLabel}</button>
      <button className="search__button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
        >
          <path
            d="M15.7233 13.8365H14.7296L14.3774 13.4969C15.6101 12.0629 16.3522 10.2013 16.3522 8.1761C16.3522 3.66038 12.6918 0 8.1761 0C3.66038 0 0 3.66038 0 8.1761C0 12.6918 3.66038 16.3522 8.1761 16.3522C10.2013 16.3522 12.0629 15.6101 13.4969 14.3774L13.8365 14.7296V15.7233L20.1258 22L22 20.1258L15.7233 13.8365ZM8.1761 13.8365C5.04403 13.8365 2.51572 11.3082 2.51572 8.1761C2.51572 5.04403 5.04403 2.51572 8.1761 2.51572C11.3082 2.51572 13.8365 5.04403 13.8365 8.1761C13.8365 11.3082 11.3082 13.8365 8.1761 13.8365Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
}

export default Search;
