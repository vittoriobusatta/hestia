import React from "react";
import LoginModal from "./components/modals/Login";
import SearchModal from "./components/modals/Search";
import RegisterModal from "./components/modals/Register";
import Navbar from "./components/navbar/Navbar";
import getCurrentUser from "./actions/getCurrentUser";
import { Providers } from "./components/provider";
import RentModal from "./components/modals/Rent";
import "../sass/styles.scss";

export const metadata = {
  title: "Hestia - Rent your dream house",
  description: "Airbnb Clone",
  charset: "utf-8",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let currentUser;
  try {
    currentUser = await getCurrentUser();
  } catch (error: any) {
    console.error("Error while fetching current user:", error.message);
    currentUser = null;
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
