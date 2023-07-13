import { User } from "@prisma/client";

export type SafeUser = Omit<User, "email_verified"> & {
  email_verified: string | null;
};
