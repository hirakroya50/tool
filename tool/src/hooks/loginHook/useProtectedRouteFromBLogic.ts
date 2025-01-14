import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { userAccessToken } from "~/atom";
import { useAtom } from "jotai";

export const useProtectedRouteFromBLogic = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<unknown>(null);
  const [accessToken] = useAtom(userAccessToken);

  const protectedApiCallBLogic = async () => {
    setLoading(true);
    setError(null);
    console.log({ accessToken, acc: "form the after lo atom" });
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_B_LOGIC_MICROSERVICE_URL}products/protected-route`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setData(response.data);
      if (response.status === 200) {
        toast.success(
          "success form the protected route -- b-logic microservice",
        );
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

  return { protectedApiCallBLogic, loading, error, data };
};
