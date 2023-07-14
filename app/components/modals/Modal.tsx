"use client";

import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "../inputs/Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  onSubmit?: () => void;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  onSubmit,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    onClose();
  }, [onClose]);

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
    if (showModal) {
      submitButton?.focus();
      submitButton?.addEventListener("mousemove", showCoords);
      return () => {
        submitButton?.removeEventListener("mousemove", showCoords);
      };
    }
  }, [showModal]);

  useEffect(() => {
    const submitButton = submitRef.current;
    if (showModal) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
          submitButton?.click();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }),
    [showModal];

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    if (onSubmit) {
      onSubmit();
    }
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal__overlay" onClick={handleClose} />
          <div className="modal__content">
            <header className="modal__header">
              <div className="modal__close">
                <button onClick={handleClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    height={16}
                    width={16}
                    stroke="#111"
                    strokeWidth={3}
                  >
                    <path d="m6 6 20 20M26 6 6 26"></path>
                  </svg>
                </button>
              </div>
              <div className="modal__title">
                <h2>{title}</h2>
              </div>
            </header>
            <div className="modal__body">
              {body}
              <button
                className="modal__submit"
                onClick={handleSubmit}
                ref={submitRef}
              >
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
                <span
                  className="
                modal__submit__text
                "
                >
                  {actionLabel}
                </span>
              </button>
            </div>
            <div className="modal__footer">
              {secondaryAction && secondaryActionLabel && (
                <Button
                  disabled={disabled}
                  label={secondaryActionLabel}
                  onClick={handleSecondaryAction}
                  outline
                />
              )}
              {footer}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
