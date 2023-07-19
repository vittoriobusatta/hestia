"use client";

import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import Input from "../inputs/forms/Input";
import Button from "../inputs/forms/Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";

function Register() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <>
      <h1 className="modal__body__title">
        Welcome to Hestia, Create an account!
      </h1>
      <form className="form">
        <Input
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          strenghtLabel={true}
        />
      </form>
    </>
  );

  const FooterConent = (
    <>
      <div className="modal__separator">
        <div className="modal__separator__text">or</div>
      </div>
      <div className="modal__footer__buttons">
        <Button
          outline
          label="Continue with Google"
          icon={FcGoogle}
          onClick={() => signIn("google")}
          classname="google"
        />
        <Button
          outline
          label="Continue with Github"
          icon={AiFillGithub}
          onClick={() => signIn("github")}
        />
      </div>
      <p>
        Already have an account?
        <span onClick={onToggle}> Log in</span>
      </p>
    </>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title="Sign up"
      body={bodyContent}
      footer={FooterConent}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Continue"
    ></Modal>
  );
}

export default Register;
