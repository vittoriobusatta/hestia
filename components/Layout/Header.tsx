import Link from "next/link";
import React from "react";
import { useStore } from "../../store/store";

export function Header() {
  const { openMenu, setOpenMenu } = useStore();

  return (
    <header className="header">
      <Link href="/" className="header__logo">
        LOGO
      </Link>
      <div className="header__menu">
        <button
          className="header__menu__button"
          onClick={() => setOpenMenu(!openMenu)}
        >
          Menu
        </button>
      </div>
    </header>
  );
}

export default Header;
