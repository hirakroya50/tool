import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { userAccessToken } from "~/atom";
import { useAtom } from "jotai";

export const useReGenerateAccessTokenApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<unknown>(null);
  const [_, setUserAccessToken] = useAtom(userAccessToken);

  const reGenerateAccessToken = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL}auth/regenerate-accessToken`,
        {},
        { withCredentials: true },
      );
      setUserAccessToken(response?.data?.accessToken as string);
      setData(response.data);
      if (response.status === 200) {
        toast.success("success form the protected route");
      }
    } catch (err: unknown) {
      console.log(err);
      if (err instanceof Error) {
        setError(err);
      }
      toast.error("error. invalid accessToken");
    } finally {
      setLoading(false);
    }
  };

  return { reGenerateAccessToken, loading, error, data };
};
