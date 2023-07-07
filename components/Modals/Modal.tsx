"use client";

import React, { ReactNode, useCallback, useEffect, useState } from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
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
          <div className="modal__content">{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
