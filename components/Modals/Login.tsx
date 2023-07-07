"use client";

import React from "react";
import Modal from "./Modal";
import useLoginModal from "@/hooks/useLoginModal";

function Login() {
  const loginModal = useLoginModal();

  return (
    <Modal isOpen={loginModal.isOpen} onClose={loginModal.onClose}>
      <div className="modal__header">
        <h2 className="modal__title">Login</h2>
        <button className="modal__close" onClick={loginModal.onClose}>
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
            <button className="form__button">Login</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default Login;
