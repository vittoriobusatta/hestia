import { getServerSession } from "next-auth/next";
import prisma from "../libs/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser(): Promise<any> {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      new Error("No session found");
      return NextResponse.error();
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      new Error("No user found");
      return NextResponse.error();
    }

    return {
      ...currentUser,
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    new Error("Something went wrong while fetching the current user");
    return NextResponse.error();
  }
}
