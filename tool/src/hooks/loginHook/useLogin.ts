import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { userLoginStatus } from "~/atom";
import { useAtom } from "jotai";

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginResponse {
  data: unknown;
  status: number;
}

interface UseLoginResponse {
  isLoading: boolean;
  error: string | null;
  login: (data: LoginFormInputs) => Promise<LoginResponse | null>;
}

interface AxiosErrorWithResponse extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useLogin = (): UseLoginResponse => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [, setLoginStatus] = useAtom(userLoginStatus);

  const login = async (data: LoginFormInputs) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL}auth/sign-in`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      console.log({ data: response?.data?.accessToken });
      // save the access token inmemory
      if (response.status === 200) {
        toast.success("login successfully");
        setLoginStatus(true);
      }

      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        const axiosError = err as AxiosErrorWithResponse;
        const errorMessage =
          axiosError.response?.data?.message ?? "An error occurred.";
        setError(errorMessage);
        toast.error(errorMessage || "Something went wrong");
      } else {
        setError("An unknown error occurred.");
        toast.error("An unknown error occurred.");
      }
      console.error("Error during login:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    login,
  };
};
