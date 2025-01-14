import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useRefreshTokenAccessTestAuthMicro = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<unknown>(null);

  const refreshTokenAccessTestAuthMicro = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL}auth/refresh-token-test`,
        {},
        { withCredentials: true },
      );
      setData(response.data);
      if (response.status === 200) {
        toast.success(
          "success! api request the refresh token from cached data",
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      }
      toast.error("error in api request or no token in cached or login first");
    } finally {
      setLoading(false);
    }
  };

  return { refreshTokenAccessTestAuthMicro, loading, error, data };
};
