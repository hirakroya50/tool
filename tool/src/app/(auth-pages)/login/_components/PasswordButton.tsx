import { useState } from "react";

import { type FieldErrors, UseFormRegister } from "react-hook-form";
import { LoginFormInputs } from "~/types";

interface PasswordInputProps {
  register: UseFormRegister<LoginFormInputs>;
  errors: FieldErrors<LoginFormInputs>;
  label?: string;
  placeholder?: string;
  className?: string;
}
export const PasswordInput = ({ errors, register }: PasswordInputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="mb-4">
      <label
        htmlFor="password"
        className="dark:text-dark-textPrimary mb-2 block text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <div className="relative">
        <input
          id="password"
          type={passwordVisible ? "text" : "password"}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
          className={`dark:bg-dark-card dark:text-dark-textPrimary w-full rounded-lg border bg-gray-100 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
            errors.password
              ? "border-red-500 focus:ring-red-500"
              : "focus:ring-blue-500"
          }`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-2 text-gray-600"
        >
          {passwordVisible ? <>Hide</> : <>Open</>}
        </button>
      </div>

      {errors.password && (
        <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
      )}
    </div>
  );
};
