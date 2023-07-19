import prisma from "@/app/libs/prisma";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings() {
  try {
    const users = await prisma.user.findMany();
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = [];

    for (const listing of listings) {
      const userExists = users.find((user) => user.id === listing.userId);

      if (userExists) {
        safeListings.push({
          ...listing,
          createdAt: listing.createdAt.toISOString(),
        });
      } else {
        await prisma.listing.delete({ where: { id: listing.id } });
      }
    }

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
