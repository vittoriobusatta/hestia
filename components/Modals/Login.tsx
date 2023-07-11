"use client";

import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import useLoginModal from "@/hooks/useLoginModal";
import Input from "../inputs/Input";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

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

      if (callback?.ok) {
        console.log("Logged in!");
        // router.refresh();
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
    <div>
      <h1>Welcome back, Login to your account!</h1>
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
    </div>
  );

  const FooterContent = (
    <div>
      <p>
        First time using Airbnb?
        <span onClick={onToggle}>Create an account</span>
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Login"
      body={BodyContent}
      footer={FooterContent}
      onSubmit={handleSubmit(onSubmit)}
    ></Modal>
  );
}

export default Login;
