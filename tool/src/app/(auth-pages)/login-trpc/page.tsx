"use client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type LoginFormInputs } from "~/types";
import { useLoginHook } from "~/hooks/trpcHook/auth-by-trpc";
import { FormInput } from "../login/_components/FormInput";
import { PasswordInput } from "../login/_components/PasswordButton";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>(); // Pass the form type

  const {
    mutate,
    // data: loginData,
    // status,
    error,
    // isError,
    // isSuccess,
    // reset,
    isLoading,
  } = useLoginHook();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    mutate(data);
  };

  return (
    <div>
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-dark-background">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-dark-card">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-700 dark:text-dark-textPrimary">
            Login by trpc
          </h2>
          <p className="pb-3 text-xs">
            its just a example. trpc to make axios call / can use next backend
            and also with trpc{" "}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormInput
              errors={errors}
              id="email"
              label="Email"
              register={register}
              type="email"
              placeholder="user email"
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              }}
            />

            <PasswordInput errors={errors} register={register} />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:hover:bg-dark-border"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>

            {error && <p>{error.message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
