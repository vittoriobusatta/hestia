import React from "react";
import ClientOnly from "./ClientOnly";
import LoginModal from "./components/modals/Login";
import RegisterModal from "./components/modals/Register";
import Navbar from "./components/navbar/Navbar";
import getCurrentUser from "./actions/getCurrentUser";
import "../sass/styles.scss";
import { Providers } from "./components/provider";
import RentModal from "./components/modals/Rent";

export const metadata = {
  title: "Hestia - Rent your dream house",
  description: "Airbnb Clone",
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
          <ClientOnly>
            <LoginModal />
            <RegisterModal />
            <RentModal />
            <Navbar currentUser={currentUser} />
          </ClientOnly>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
