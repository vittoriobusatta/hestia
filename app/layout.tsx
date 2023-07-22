import React from "react";
import LoginModal from "./components/modals/Login";
import RegisterModal from "./components/modals/Register";
import Navbar from "./components/navbar/Navbar";
import getCurrentUser from "./actions/getCurrentUser";
import { Providers } from "./components/provider";
import RentModal from "./components/modals/Rent";
import ClientOnly from "./components/ClienOnly";
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
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          {/* <ClientOnly> */}
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
          {/* </ClientOnly> */}
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";