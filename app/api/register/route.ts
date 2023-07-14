import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../app/libs/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  if (!email || !name || !password) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return new NextResponse("User already exists", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.error();
  }
}
