"use client";

import React from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, className }) => {
  return (
    <li onClick={onClick} className="menu__items">
      <a>{label}</a>
    </li>
  );
};

export default MenuItem;
