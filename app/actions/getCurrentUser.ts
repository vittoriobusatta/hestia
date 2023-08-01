import { getServerSession } from "next-auth/next";
import prisma from "../libs/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser(): Promise<any> {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      throw new Error("No session found or user email is missing");
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      throw new Error("User not found in the database");
    }

    return {
      ...currentUser,
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    throw new Error("Something went wrong while fetching the current user");
  }
}
