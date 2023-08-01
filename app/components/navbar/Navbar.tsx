"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { SafeUser } from "../../types/index";
import UserMenu from "./Menu/UserMenu";
import { usePathname } from "next/navigation";
import { Logo } from "@/utils/icons";
import { useHeader } from "@/app/hooks/useHeader";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const { color, setColor } = useHeader();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setColor("light");
    } else {
      setColor("dark");
    }
  }, [pathname, setColor]);

  return (
    <header
      className={`header`}
      style={{
        backgroundColor: color === "light" ? "#0f3a35" : "#fff",
        color: color === "light" ? "#fff" : "#222",
      }}
    >
      <Link href="/" className="header__logo">
        <Logo color={color} />
      </Link>
      <UserMenu currentUser={currentUser} />
    </header>
  );
};

export default Navbar;
