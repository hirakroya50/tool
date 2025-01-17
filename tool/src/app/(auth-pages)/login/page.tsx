"use client";

import {
  type FieldErrors,
  useForm,
  UseFormRegister,
  type SubmitHandler,
} from "react-hook-form";

import { useAccessTokenTest } from "~/hooks/loginHook/useAccessTokenTest";
import { useLogin } from "~/hooks/loginHook/useLogin";
import { useLogout } from "~/hooks/loginHook/useLogout";
import { FormInput } from "./_components/FormInput";
import { PasswordInput } from "./_components/PasswordButton";
import { type LoginFormInputs } from "~/types";
import { useProtectedRoute } from "~/hooks/loginHook/useProtectedRoute";
import { useReGenerateAccessTokenApi } from "~/hooks/loginHook/useReGenerateAccessTokenApi";
import { useProtectedRouteFromBLogic } from "~/hooks/loginHook/useProtectedRouteFromBLogic";
import { useRefreshTokenAccessTestAuthMicro } from "~/hooks/loginHook/useRefreshTokenAccessTestAuthMicro";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { error: errorLogin, isLoading: loginLoading, login } = useLogin();

  const {
    error: errorLogout,
    isLoading: isLoadingLogout,
    logout,
  } = useLogout();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    await login(data);
  };

  const handelLogout = async () => {
    await logout();
  };

  return (
    <div>
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-dark-background">
        <div className="w-full max-w-xl rounded-lg bg-white p-8 shadow-lg dark:bg-dark-card">
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
          <ExtraButtonForTest />
          <button
            onClick={handelLogout}
            className="mt-2 w-full rounded-lg bg-green-600 p-2 text-white hover:bg-green-700 dark:bg-dark-card dark:text-dark-textPrimary dark:hover:bg-green-800"
          >
            {isLoadingLogout ? "loading....." : "Logout (auth-microS)"}
          </button>
          {errorLogout && <p>{errorLogout}</p>}
        </div>
        <About />
      </div>
    </div>
  );
}

// Define the props for the form input

const ExtraButtonForTest = () => {
  const { apiRequestWithHttpCookie, loading: loadingApiRequestWithHttpCookie } =
    useAccessTokenTest();

  const { refreshTokenAccessTestAuthMicro } =
    useRefreshTokenAccessTestAuthMicro();
  const { protectedApiCall } = useProtectedRoute();
  const { protectedApiCallBLogic } = useProtectedRouteFromBLogic();
  const { reGenerateAccessToken } = useReGenerateAccessTokenApi();
  return (
    <div className="mt-4 flex flex-col justify-center rounded-md border bg-gray-700 dark:bg-dark-card">
      <p className="text-white">
        access token will expire in 10s (test in button no 1 and 2)
      </p>

      <div className="m-3 flex rounded-md bg-red-400">
        <button
          onClick={async () => {
            await protectedApiCall();
          }}
          title="protected api call with accessToken"
          className="m-4 rounded-lg bg-yellow-600 p-2 text-white hover:bg-yellow-700 dark:bg-dark-card dark:text-dark-textPrimary dark:hover:bg-yellow-800"
        >
          1. protected route (auth microservice)
        </button>
        <button
          onClick={async () => {
            await protectedApiCallBLogic();
          }}
          title="protected api call with accessToken"
          className="m-4 rounded-lg bg-yellow-600 p-2 text-white hover:bg-yellow-700 dark:bg-dark-card dark:text-dark-textPrimary dark:hover:bg-yellow-800"
        >
          2. protected route (b-logic-microservice)
        </button>
      </div>
      <div className="mx-3 flex rounded-lg bg-green-600">
        <button
          title="make a protected route call to b-logic product"
          className="m-4 rounded-lg bg-yellow-600 p-2 text-white hover:bg-yellow-700 dark:bg-dark-card dark:text-dark-textPrimary dark:hover:bg-yellow-800"
          onClick={async () => {
            await refreshTokenAccessTestAuthMicro();
          }}
        >
          3. refresh-token access test (auth-microservice)
        </button>
        <button
          title="make a protected route call to b-logic product"
          className="m-4 rounded-lg bg-yellow-600 p-2 text-white hover:bg-yellow-700 dark:bg-dark-card dark:text-dark-textPrimary dark:hover:bg-yellow-800"
          onClick={async () => {
            await apiRequestWithHttpCookie();
          }}
          disabled={loadingApiRequestWithHttpCookie}
        >
          4.{" "}
          {loadingApiRequestWithHttpCookie
            ? "Loading..."
            : "refresh-token access test (b-logic)"}
        </button>
      </div>

      <button
        onClick={async () => {
          await reGenerateAccessToken();
        }}
        className="m-4 rounded-lg bg-[#6b4545] p-2 text-white hover:bg-yellow-700 dark:bg-dark-card dark:text-dark-textPrimary dark:hover:bg-yellow-800"
      >
        5. regenerate the accessToken (auth-microS)
      </button>
    </div>
  );
};

const About = () => {
  return (
    <div className="w-[40%] p-3">
      Implemented Login and Signup Functionality with React and NestJS Developed
      <ol className="list-disc space-y-3 p-5 pl-6 text-gray-800">
        {[
          "Developed a user authentication system using Next.js and NestJS, integrating form handling with react-hook-form and asynchronous API calls for login and signup processes.",
          "Implemented the login functionality with secure token handling using cookies and error management via custom hooks (useLogin and useAccessTokenTest).",
          "Utilized React components (FormInput, PasswordInput) for seamless user input validation and feedback using toast notifications.",
          "Integrated a signup process in the NestJS backend, ensuring unique user registration by checking for existing email, username, or mobile conflicts.",
          "Ensured secure password storage using hashing and implemented detailed error handling for a smooth user experience.",
          "Employed HTTP status codes and robust API responses for effective communication between the frontend and backend.",
        ].map((item, i) => {
          return (
            <li key={i} className="text-xs">
              {item}
            </li>
          );
        })}
      </ol>
    </div>
  );
};
