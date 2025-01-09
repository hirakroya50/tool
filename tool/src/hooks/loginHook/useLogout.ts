import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { useAtom } from "jotai";
import { userLoginStatus } from "~/atom";

interface UseLogoutResponse {
  isLoading: boolean;
  error: string | null;
  logout: () => Promise<void>;
}

export const useLogout = (): UseLogoutResponse => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setLoginStatus] = useAtom(userLoginStatus);
  const logout = async () => {
    if (!isLoggedIn) {
      toast.error("user not login");
      return;
    }
    setIsLoading(true);
    setError(null); // Clear any previous error

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL}auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      // PAINDING
      //REDIRECT TO THE LOGIN PAGE
      if (response.status === 200) {
        toast.success("logout successfully");
        setLoginStatus(false);
      }
      return response?.data;
    } catch (err: unknown) {
      // Handle error safely
      if (err instanceof Error) {
        setError(err.message); // Assign the error message
      } else {
        setError("An unknown error occurred during logout.");
      }
      toast.error(error);
      console.log("Error during logout--hirakkk:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    logout,
  };
};
