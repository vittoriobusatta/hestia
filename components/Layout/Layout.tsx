"use client";

import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";
import LoginModal from "../Modals/Login";
import RegisterModal from "../Modals/Register";

function Layout({ children }: { children: ReactNode }) {

  return (
    <>
      {/* <Loader /> */}
      <Header />
      <LoginModal />
      <RegisterModal />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
