import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";
import { Menu } from "./Menu";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Loader />
      <Header />
      <Menu />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
