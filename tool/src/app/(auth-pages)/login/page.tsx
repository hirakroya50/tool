"use client";

import { useState } from "react";
import {
  type FieldErrors,
  useForm,
  UseFormRegister,
  type SubmitHandler,
} from "react-hook-form";
import toast from "react-hot-toast";

import { useAccessTokenTest } from "~/hooks/loginHook/useAccessTokenTest";
import { useLogin } from "~/hooks/loginHook/useLogin";
import { useLogout } from "~/hooks/loginHook/useLogout";
import { FormInput } from "./_components/FormInput";
import { PasswordInput } from "./_components/PasswordButton";
import { type LoginFormInputs } from "~/types";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>(); // Pass the form type

  const { error: errorLogin, isLoading: loginLoading, login } = useLogin();
  const {
    apiRequestWithHttpCookie,
    loading: loadingApiRequestWithHttpCookie,
    error: errorApiRequestWithHttpCookie,
  } = useAccessTokenTest();

  const {
    error: errorLogout,
    isLoading: isLoadingLogout,
    logout,
  } = useLogout();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const response = await login(data);
    if (response) {
      toast.success("login successfully");
    }
    if (errorLogin !== null) {
      toast.error(errorLogin || "Something went wrong");
    }
  };

  const handelLogout = async () => {
    const res = await logout();
    toast.success("logout successfully");
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-dark-background">
        <button
          className="absolute left-3 top-2 rounded bg-blue-500 p-2 text-white"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          Toggle Dark Mode
        </button>
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-dark-card">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-700 dark:text-dark-textPrimary">
            Login
          </h2>

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
              disabled={loginLoading}
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:hover:bg-dark-border"
            >
              {loginLoading ? "Loading..." : "Login"}
            </button>

            {errorLogin && <p>{errorLogin}</p>}
          </form>
          <ExtraButtonForTest
            loadingApiRequestWithHttpCookie={loadingApiRequestWithHttpCookie}
            errorApiRequestWithHttpCookie={errorApiRequestWithHttpCookie}
            apiRequestWithHttpCookie={apiRequestWithHttpCookie}
            isLoadingLogout={isLoadingLogout}
            handelLogout={handelLogout}
            errorLogout={errorLogout}
          />
        </div>
      </div>
    </div>
  );
}

// Define the props for the form input

const ExtraButtonForTest = ({
  loadingApiRequestWithHttpCookie,
  errorApiRequestWithHttpCookie,
  apiRequestWithHttpCookie,
  isLoadingLogout,
  handelLogout,
  errorLogout,
}: {
  loadingApiRequestWithHttpCookie: boolean;
  errorApiRequestWithHttpCookie?: { message: string } | null;
  apiRequestWithHttpCookie: () => Promise<void>;
  isLoadingLogout: boolean;
  handelLogout: () => void;
  errorLogout?: string | null;
}) => {
  return (
    <div className="mt-4 flex flex-col justify-center rounded-md border bg-gray-700 dark:bg-dark-card">
      <button
        className="m-4 rounded-lg bg-yellow-600 p-2 text-white hover:bg-yellow-700 dark:bg-dark-card dark:text-dark-textPrimary dark:hover:bg-yellow-800"
        onClick={async () => {
          await apiRequestWithHttpCookie();
        }}
        disabled={loadingApiRequestWithHttpCookie}
      >
        {loadingApiRequestWithHttpCookie
          ? "Loading..."
          : "Test the access token after login"}
      </button>
      {errorApiRequestWithHttpCookie && (
        <p>{errorApiRequestWithHttpCookie.message}</p>
      )}
      <button
        onClick={handelLogout}
        className="m-4 rounded-lg bg-green-600 p-2 text-white hover:bg-green-700 dark:bg-dark-card dark:text-dark-textPrimary dark:hover:bg-green-800"
      >
        {isLoadingLogout ? "loading....." : "Logout"}
      </button>
      {errorLogout && <p>{errorLogout}</p>}
    </div>
  );
};
