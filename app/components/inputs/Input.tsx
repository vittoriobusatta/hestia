import React, { ReactNode, useEffect, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  placeholder?: string;
  strenghtLabel?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  register,
  errors,
  strenghtLabel,
  placeholder,
  formatPrice,
}) => {
  const [pattern, setPattern] = useState<RegExp>(/./);

  // useEffect(() => {
  //   switch (type) {
  //     case "email":
  //       if (strenghtLabel) {
  //         setPattern(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);
  //         break;
  //       }
  //     case "password":
  //       if (strenghtLabel) {
  //         setPattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}$/);
  //         break;
  //       }
  //     default:
  //       setPattern(/./);
  //       break;
  //   }
  // }, [type, strenghtLabel]);

  return (
    <>
      <div className="form__group">
        {formatPrice && <span className="form__group__currency">€</span>}
        <input
          id={id}
          disabled={disabled}
          {...register(id, {
            required,
            // pattern: {
            //   value: pattern,
            //   message: `Inserer un ${
            //     type === "email" ? "email" : "mot de passe"
            //   }.`,
            // },
          })}
          placeholder={label}
          type={type}
        />
      </div>
      {errors[id] && (
        <p className="form__error">
          {(errors[id]?.message as ReactNode) || "Champ invalide"}
        </p>
      )}
    </>
  );
};

export default Input;
