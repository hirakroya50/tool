import { useState } from "react";
import axios from "axios";

interface UseLogoutResponse {
  isLoading: boolean;
  error: string | null;
  logout: () => Promise<void>;
}

export const useLogout = (): UseLogoutResponse => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
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
      console.log("Logout successful:", response);
      // PAINDING
      //REDIRECT TO THE LOGIN PAGE
      return response?.data;
    } catch (err: unknown) {
      // Handle error safely
      if (err instanceof Error) {
        setError(err.message); // Assign the error message
      } else {
        setError("An unknown error occurred during logout.");
      }
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
