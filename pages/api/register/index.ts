import bcrypt from "bcrypt";
import prisma from "../../../app/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    res.status(200).json(user);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
