import { Listing, Reservation, User } from "@prisma/client";

export type SafeUser = Omit<User, "emailVerified"> & {
  emailVerified: string | null;
};

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type CurrentUser = {
  email: string | null;
  emailVerified: string | null;
  favoriteIds: string[];
  hashedPassword: string | null;
  id: string;
  image: string | null;
  name: string | null;
};
