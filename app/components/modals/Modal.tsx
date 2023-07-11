"use client";

import React, {
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  onSubmit?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  onSubmit,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    onClose();
  }, [onClose]);

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal__overlay" onClick={handleClose} />
          <div className="modal__content">
            <div className="modal__header">
              <h2 className="modal__title">{title}</h2>
              <button className="modal__close" onClick={handleClose}>
                X
              </button>
            </div>
            <div className="modal__body">{body}</div>
            <button className="modal__submit" onClick={onSubmit}>
              Submit
            </button>
            <div className="modal__footer">{footer}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
