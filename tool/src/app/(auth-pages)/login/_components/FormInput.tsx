import { type FieldErrors, UseFormRegister } from "react-hook-form";
import { LoginFormInputs } from "~/types";

interface FormInputProps {
  id: "email" | "password";
  type: "email" | "password";
  label: string;
  register: UseFormRegister<LoginFormInputs>;
  errors: FieldErrors<LoginFormInputs>;
  validation?: object;
  placeholder?: string;
}

export const FormInput = ({
  id,
  type,
  label,
  register,
  errors,
  validation = {},
  placeholder = "",
}: FormInputProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="dark:text-dark-textPrimary mb-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, validation)}
        className={`dark:bg-dark-card dark:text-dark-textPrimary w-full rounded-lg border bg-gray-100 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
          errors[id]
            ? "border-red-500 focus:ring-red-500"
            : "focus:ring-blue-500"
        }`}
      />
      {errors[id] && (
        <p className="mt-2 text-sm text-red-500">{errors[id]?.message}</p>
      )}
    </div>
  );
};
