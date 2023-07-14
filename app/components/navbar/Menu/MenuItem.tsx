"use client";

import React from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <li onClick={onClick}>
      <a>{label}</a>
    </li>
  );
};

export default MenuItem;
