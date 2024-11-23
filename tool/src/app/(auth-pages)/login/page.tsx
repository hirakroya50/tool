"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
// import {
//   useApiRequestWithHttpCookieHook,
//   useLoginHook,
// } from "~/hooks/auth-by-trpc";
import { useAccessTokenTest } from "~/hooks/useAccessTokenTest";
import { useLogin } from "~/hooks/useLogin";
import { useLogout } from "~/hooks/useLogout";

// Define the types for form data
type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>(); // Pass the form type

  //------------------------------------------------------
  // THIS TWO HOOKS ARE FOR API CALL BY TRPC
  // const {
  //   mutate,
  //   data: apidata,
  //   status,
  //   error,
  //   isError: ourError,
  //   isSuccess,
  //   reset,
  // } = useLoginHook();
  // const {
  //   mutate: apiRequestWithHttpCookieHook,
  //   data: dataApiRequestWithHttpCookieHook,
  // } = useApiRequestWithHttpCookieHook();

  //---------------------------------------------------------

  const { error: errorLogin, isLoading: loginLoading, login } = useLogin();
  const {
    apiRequestWithHttpCookie,
    loading: loadingApiRequestWithHttpCookie,
    error: errorApiRequestWithHttpCookie,
    data: dataApiRequestWithHttpCookie,
  } = useAccessTokenTest();

  const {
    error: errorLogout,
    isLoading: isLoadingLogout,
    logout,
  } = useLogout();
  // Define the submit handler with proper typing

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    // mutate(data);
    const response = await login(data);
    console.log(response, "====");
    if (response) {
      // Handle successful login (e.g., redirect, store token)
      console.log("Login successful:", response.data);
      toast.success("login successfully");
    }
    if (errorLogin !== null) {
      toast.error(errorLogin || "Something went wrong");
    }
  };

  const handelLogout = async () => {
    const res = await logout();
    console.log("LOGOUT------", res);
  };

  console.log(dataApiRequestWithHttpCookie, "=====apiRequestWithHttpCookie");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className={isDarkMode ? "dark" : ""}>
      <button
        className="m-4 rounded bg-blue-500 p-2 text-white"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        Toggle Dark Mode
      </button>
      <div className="dark:bg-dark-background flex h-screen items-center justify-center bg-gray-100">
        <div className="dark:bg-dark-card w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <h2 className="dark:text-dark-textPrimary mb-6 text-center text-2xl font-bold text-gray-700">
            Login
          </h2>
          <p className="dark:text-dark-textSecondary font-semibold text-gray-500 underline">
            Painting work I can do:
          </p>
          <p className="dark:text-dark-textSecondary text-gray-600">
            1. Make the UI look like dark mode
          </p>
          <p className="dark:text-dark-textSecondary text-gray-600">
            2. The `apiRequestWithHttpCookie` API call isnt working, possibly
            due to login integration issues with tRPC or another problem.
          </p>
          <p className="dark:text-dark-textSecondary text-gray-600">
            3. Use a custom hook for the API call or tRPC for API handling.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="dark:text-dark-textPrimary mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className={`dark:bg-dark-card dark:text-dark-textPrimary w-full rounded-lg border bg-gray-100 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

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
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="dark:bg-dark-card dark:hover:bg-dark-border w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loginLoading ? "Loading..." : "Login"}
            </button>

            {errorLogin && <p>{errorLogin}</p>}
          </form>
          <div className="dark:bg-dark-card mt-4 flex flex-col justify-center rounded-md border bg-gray-700">
            <button
              className="dark:bg-dark-card dark:text-dark-textPrimary m-4 rounded-lg bg-yellow-600 p-2 text-white hover:bg-yellow-700 dark:hover:bg-yellow-800"
              onClick={async () => {
                await apiRequestWithHttpCookie();
                // apiRequestWithHttpCookieHook();
              }}
              disabled={loadingApiRequestWithHttpCookie} // Disable button while loading
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
              className="dark:bg-dark-card dark:text-dark-textPrimary m-4 rounded-lg bg-green-600 p-2 text-white hover:bg-green-700 dark:hover:bg-green-800"
            >
              {isLoadingLogout ? "loading....." : "Logout"}
            </button>
            {errorLogout && <p>{errorLogout}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
