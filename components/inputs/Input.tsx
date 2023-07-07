import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
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
}) => {
  const [passwordStrengthClass, setPasswordStrengthClass] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const strenght = useMemo(
    () => [
      {
        id: 0,
        name: "very-weak",
        message: "Très faible",
        color: "red",
      },
      {
        id: 1,
        name: "weak",
        message:
          "Votre mot de passe doit contenir au moins 2 des 4 éléments suivants : majuscule, minuscule, chiffre, symbole.",
        color: "red",
      },
      {
        id: 2,
        name: "medium",
        message:
          "Pour obtenir un mot de passe plus solide, ajoutez quelques caractères, chiffres ou symboles.",
        color: "orange",
      },
      {
        id: 3,
        name: "strong",
        message: "C'est du solide !",
        color: "green",
      },
      {
        id: 4,
        name: "very-strong",
        message: "C'est du béton armé !",
        color: "green",
      },
    ],
    []
  );

  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const getPasswordStrength = (password: string): [string, string] => {
        const hasNumber = /\d/;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        const hasLetter = hasUpperCase && hasLowerCase;
        const hasAll =
          hasNumber && hasLetter && hasSpecial && password.length >= 12;

        if (hasAll) {
          return [strenght[4].message, strenght[4].color];
        } else if (
          hasUpperCase &&
          hasLowerCase &&
          hasNumber &&
          password.length >= 8
        ) {
          return [strenght[3].message, strenght[3].color];
        } else if (hasUpperCase && hasLowerCase && password.length >= 8) {
          return [strenght[3].message, strenght[3].color];
        }
        if (hasUpperCase && password.length >= 8) {
          return [strenght[2].message, strenght[2].color];
        }
        if (
          password.length >= 8 &&
          (hasUpperCase || hasLowerCase || hasNumber || hasSpecial)
        ) {
          return [strenght[1].message, strenght[1].color];
        }
        return [strenght[0].message, strenght[0].color];
      };

      if (!event || event.target.value === "") {
        setPasswordError("");
      } else {
        const password = event.target.value;
        const [message, color] = getPasswordStrength(password);
        setPasswordStrengthClass(color);
        setPasswordError(message);
      }
    },
    [strenght]
  );

  return (
    <>
      <div className="form__group">
        <input
          id={id}
          disabled={disabled}
          {...register(id, {
            required,
          })}
          placeholder={placeholder}
          type={type}
          onChange={(e) => {
            if (label === "Password" && strenghtLabel) {
              handlePasswordChange(e);
            } else {
              return;
            }
          }}
        />
        <label>{label}</label>
      </div>
      {passwordError && (
        <span className={`password-strength ${passwordStrengthClass}`}>
          {passwordError}
        </span>
      )}
    </>
  );
};

export default Input;
