import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

type Reservation = {
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  listingId: string;
  userId: string;
};
export const createReservation = async (reservation: Reservation) => {
  const { startDate, endDate, totalPrice, listingId, userId } = reservation;

  if (!userId) {
    new Error("No user found");
    return NextResponse.error();
  }

  if (!listingId || !startDate || !endDate || !totalPrice) {
    new Error("Missing reservation data");
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: userId,
          totalPrice: totalPrice,
          startDate: startDate,
          endDate: endDate,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation, {
    status: 200,
  });
};
