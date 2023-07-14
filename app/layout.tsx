import React from "react";
import ClientOnly from "./ClientOnly";
import LoginModal from "./components/modals/Login";
import RegisterModal from "./components/modals/Register";
import Navbar from "./components/navbar/Navbar";
import getCurrentUser from "./actions/getCurrentUser";
import "../sass/styles.scss";
import { Providers } from "./components/provider";

export const metadata = {
  title: "Hestia",
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
            <Navbar currentUser={currentUser} />
          </ClientOnly>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
