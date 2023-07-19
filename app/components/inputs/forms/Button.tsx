"use client";

import React, { useEffect, useRef, useState } from "react";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  small?: boolean;
  icon?: React.FC<{ size: number }>;
  primaryButton?: boolean;
  secondaryButton?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  small,
  icon: Icon,
  primaryButton,
  secondaryButton,
}) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  function showCoords(event: MouseEvent) {
    const submitButton = submitRef.current;
    if (submitButton) {
      const rect = submitButton.getBoundingClientRect();
      const clientWidth = submitButton.clientWidth || 0;
      const clientHeight = submitButton.clientHeight || 0;

      setX((prevX) => {
        const newX = ((event.clientX - rect.left) / clientWidth) * 100;
        const roundedX = parseFloat(newX.toFixed(2));
        return roundedX !== prevX ? roundedX : prevX;
      });

      setY((prevY) => {
        const newY = ((event.clientY - rect.top) / clientHeight) * 100;
        const roundedY = parseFloat(newY.toFixed(2));
        return roundedY !== prevY ? roundedY : prevY;
      });
    }
  }

  useEffect(() => {
    const submitButton = submitRef.current;
    submitButton?.focus();
    submitButton?.addEventListener("mousemove", showCoords);
    return () => {
      submitButton?.removeEventListener("mousemove", showCoords);
    };
  }, []);

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      ref={submitRef}
      className={`button ${primaryButton ? "button--primary" : ""} ${
        secondaryButton ? "button--secondary" : ""
      } ${small ? "button--small" : ""}`}
    >
      {Icon && (
        <div className="button__icon">
          <Icon size={20} />
        </div>
      )}
      {primaryButton && (
        <span className="modal__submit__background">
          <span
            className="modal__submit__background__hover"
            style={
              {
                "--mouse-x": `${x}`,
                "--mouse-y": `${y}`,
              } as React.CSSProperties
            }
          />
        </span>
      )}
      <span className="button__text">{label}</span>
    </button>
  );
};

export default Button;
