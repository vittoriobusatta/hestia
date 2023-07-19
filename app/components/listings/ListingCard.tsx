"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import HeartButton from "../inputs/HeartButton";
import { useRouter } from "next/navigation";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { format } from "date-fns";
import Button from "../inputs/forms/Button";

interface ListingCardProps {
  listing: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

function ListingCard({
  listing,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}: ListingCardProps) {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const router = useRouter();

  const { id, title, locationValue, category, price, imageSrc } = listing;

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <li
      className="landing__item"
      onClick={() => router.push(`/listings/${id}`)}
    >
      <picture className="picture">
        <Image
          className={`picture__image ${
            loadingComplete ? "picture__image--loading" : ""
          }`}
          src={imageSrc}
          alt={title}
          height={400}
          width={400}
          onLoadingComplete={() => setLoadingComplete(true)}
          priority
        />
        <div className="picture__hearth">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </picture>
      <div className="picture__content">
        <div className="picture__head">
          <h3> 
            {title} - <span>{locationValue}</span>
          </h3>
          <p className="picture__category">{reservationDate || category}</p>
        </div>
        <p className="picture__body">
          {(reservation && (
            <span className="font-light">{reservation.totalPrice} €</span>
          )) || <span className="font-light">{price} € / night</span>}
        </p>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
            primaryButton
          />
        )}
      </div>
    </li>
  );
}

export default ListingCard;
