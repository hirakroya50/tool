"use client";

import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";

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

  // Define the submit handler with proper typing
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log(data);
    try {
      // Make the API request to the backend using axios

      const response = await axios.post(
        process.env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "auth/sign-in",
        data, // axios automatically serializes the object to JSON
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensures that cookies are sent and received
        },
      );

      console.log("api call ended======>", response);

      // Handle successful login (e.g., store token, redirect)
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Error during login:", error);
      // Optionally, you can show an error message to the user here
    }
  };

  const apiRequestWithHttpCookie = async () => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_B_LOGIC_MICROSERVICE_URL +
          "products/access-token-test",
        {}, // Body can be empty if cookies are sent via headers
        {
          withCredentials: true, // Ensure cookies are included in the request
        },
      );
      console.log(response.data, response);
    } catch (error) {
      console.log(error, "======error comgn in 2nd");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
      console.log("Logout successful====", res);
      // Redirect or clear client-side state
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
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
              className={`w-full rounded-lg border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
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
              className="mb-2 block text-sm font-medium text-gray-700"
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
              className={`w-full rounded-lg border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
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
            className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <div className="mt-4 flex flex-col justify-center rounded-md border bg-[#00000010]">
          <button
            className="m-4 rounded-lg bg-yellow-500 p-2 text-white"
            onClick={apiRequestWithHttpCookie}
          >
            button to test the access token after login
          </button>
          <button
            onClick={handleLogout}
            className="m-4 rounded-lg bg-green-500 p-2 text-white"
          >
            logout
          </button>
        </div>
      </div>
    </div>
  );
}
