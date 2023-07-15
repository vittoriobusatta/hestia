"use client";

import React from "react";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: React.FC<{ size: number }>;
  classname?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  classname,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`button 
      ${classname ? classname : ""}
    `}
    >
      {Icon && (
        <div className="button__icon">
          <Icon size={20} />
        </div>
      )}
      <div className="button__text">{label}</div>
    </button>
  );
};

export default Button;
