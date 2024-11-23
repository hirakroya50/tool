"use client";

import { useState } from "react";
import {
  type FieldErrors,
  useForm,
  UseFormRegister,
  type SubmitHandler,
} from "react-hook-form";
import toast from "react-hot-toast";
// import {
//   useApiRequestWithHttpCookieHook,
//   useLoginHook,
// } from "~/hooks/auth-by-trpc";
import { useAccessTokenTest } from "~/hooks/useAccessTokenTest";
import { useLogin } from "~/hooks/useLogin";
import { useLogout } from "~/hooks/useLogout";
import { FormInput } from "./_components/FormInput";
import { PasswordInput } from "./_components/PasswordButton";
import { LoginFormInputs } from "~/types";

// Define the types for form data

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

  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="dark:bg-dark-background flex h-screen items-center justify-center bg-gray-100">
        <button
          className="absolute left-3 top-2 rounded bg-blue-500 p-2 text-white"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          Toggle Dark Mode
        </button>
        <div className="dark:bg-dark-card w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <p>1. role-based access control like Admin, User, Moderator</p>
          <p>
            2. multiple user sessions from different devices, terminate active
            sessions log out from all devices.
          </p>
          <p>
            {" "}
            3. event-driven architecture - For example, use message queues
            (RabbitMQ, Kafka, etc.) OTPs, verification emails, or triggering
            post-login events.
          </p>
          <p>
            4. IP and Location Tracking for Security - Log the IP address and
            location (approximate) of every login attempt and notify users of
            unusual login attempts.
          </p>
          <p>
            5 Provide users with an option to enable or disable notifications
            for logins from new devices or locations.
          </p>
          <h2 className="dark:text-dark-textPrimary mb-6 text-center text-2xl font-bold text-gray-700">
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
              className="dark:bg-dark-card dark:hover:bg-dark-border w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  );
};
