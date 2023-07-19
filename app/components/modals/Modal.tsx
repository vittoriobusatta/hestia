"use client";

import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "../inputs/forms/Button";

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

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    onClose();
  }, [onClose]);

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
            <div className="modal__body">{body}</div>

            {/* {footer && <div className="modal__footer">{footer}</div>} */}
            <div className="modal__footer">
              <div className="modal__actions">
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                    secondaryButton
                  />
                )}
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                  primaryButton
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
