import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useProtectedRouteFromBLogic = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<unknown>(null);

  const protectedApiCallBLogic = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_B_LOGIC_MICROSERVICE_URL}products/protected-route`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJlbWFpbCI6ImhpcmFrcm95YTUwQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzM2ODcyOTk1LCJleHAiOjE3MzY4NzM4OTV9.SLMjY9ky0X8spMou7lFjs1DmBlj_gTrEqUOasnaOxYc",
          },
        },
      );
      console.log({ response, mssms: "sssss" });
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

  return { protectedApiCallBLogic, loading, error, data };
};
