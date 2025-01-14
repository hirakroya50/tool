import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { userAccessToken } from "~/atom";
import { useAtom } from "jotai";

export const useProtectedRoute = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<unknown>(null);
  const [accessToken] = useAtom(userAccessToken);

  const protectedApiCall = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL}auth/protected-route`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setData(response.data);
      if (response.status === 200) {
        toast.success("success form the protected route -- auth microservice");
      }
    } catch (err: unknown) {
      console.log(err);
      if (err instanceof Error) {
        setError(err);
      }
      toast.error("error! invalid accessToken");
    } finally {
      setLoading(false);
    }
  };

  return { protectedApiCall, loading, error, data };
};
