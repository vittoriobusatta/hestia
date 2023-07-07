import React from "react";
import { useStore } from "../../store/store";

export function Menu() {
  const { openMenu } = useStore();

  return <section className={`menu ${openMenu ? "menu--open" : ""}`}></section>;
}
