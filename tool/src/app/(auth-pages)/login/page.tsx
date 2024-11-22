"use client";

import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoginHook } from "~/hooks/auth";
import { useAccessTokenTest } from "~/hooks/useAccessTokenTest";

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
  const {
    mutate,
    data: apidata,
    status,
    error,
    isError: ourError,
    isSuccess,
    reset,
  } = useLoginHook();

  // Define the submit handler with proper typing

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    mutate(data);
  };

  const isLoading = status === "pending";
  const isError = status === "error";

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
      // Redirect or clear client-side state
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const {
    apiRequestWithHttpCookie,
    loading: buttonLoadingApiRequestWithHttpCookie,
    error: errorApiRequestWithHttpCookie,
    data: dataApiRequestWithHttpCookie,
  } = useAccessTokenTest();
  console.log(dataApiRequestWithHttpCookie, "=====apiRequestWithHttpCookie");
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-200">
          Login
        </h2>
        <p className="font-semibold text-gray-300 underline">
          Painting work I can do:
        </p>
        <p className="text-gray-300">
          1. Make the UI look like dark mode by tailwind config
        </p>
        <p className="text-gray-300">
          2. The `apiRequestWithHttpCookie` API call ist working, possibly due
          to login integration issues with tRPC or another problem.
        </p>
        <p className="text-gray-300">
          3. Use a custom hook for the API call or tRPC for API handling.
        </p>

        {/* <button className="border bg-blue-400" onClick={reset}>
        Reset
      </button> */}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-300"
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
              className={`w-full rounded-lg border bg-gray-700 px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 ${
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
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className={`w-full rounded-lg border bg-gray-700 px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="mt-4 flex flex-col justify-center rounded-md border bg-gray-700">
          <button
            className="m-4 rounded-lg bg-yellow-600 p-2 text-white hover:bg-yellow-700"
            onClick={async () => {
              await apiRequestWithHttpCookie();
            }}
            disabled={buttonLoadingApiRequestWithHttpCookie} // Disable button while loading
          >
            {buttonLoadingApiRequestWithHttpCookie
              ? "Loading..."
              : "Test the access token after login"}
          </button>
          <button
            onClick={handleLogout}
            className="m-4 rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
