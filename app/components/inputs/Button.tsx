"use client";

import React from "react";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: React.FC<{ size: number }>;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button disabled={disabled} onClick={onClick}>
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;
