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
      console.log("No session found");
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      console.log("No user found");
      return null;
    }

    return {
      ...currentUser,
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    console.log("Error getting current user", error);
    return null;
  }
}
