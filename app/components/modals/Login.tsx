"use client";

import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import Input from "../inputs/Input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../inputs/Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

function Login() {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok && !callback?.error) {
        console.log("Logged in!");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        console.log("Error logging in!");
      }
    });
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const BodyContent = (
    <>
      <h1 className="modal__body__title">
        Welcome back, Login to your account!
      </h1>
      <form>
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
        />
      </form>
    </>
  );

  const FooterContent = (
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
        />
        <Button
          outline
          label="Continue with Github"
          icon={AiFillGithub}
          onClick={() => signIn("github")}
        />
      </div>
      <p>
        First time using Hestia?
        <span onClick={onToggle}> Create an account</span>
      </p>
    </>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Login"
      body={BodyContent}
      footer={FooterContent}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Continue"
    ></Modal>
  );
}

export default Login;
