"use client";

import React from "react";
import Modal from "./Modal";
import useRegisterModal from "@/hooks/useRegisterModal";

function Register() {
  const registerModal = useRegisterModal();
  
  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
    >
      <div className="modal__header">
        <h2 className="modal__title">Register</h2>
        <button className="modal__close" onClick={registerModal.onClose}>
          X
        </button>
      </div>
      <div className="modal__body">
        <form className="form">
          <div className="form__group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="form__input"
            />
          </div>
          <div className="form__group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="form__input"
            />
          </div>
          <div className="form__group">
            <button className="form__button">Register</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default Register;
