import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useProtectedRoute = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<unknown>(null);

  const protectedApiCall = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL}auth/protected-route`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJlbWFpbCI6ImhpcmFrcm95YTUwQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzM2ODcwMTYxLCJleHAiOjE3MzY4NzEwNjF9.eVwNItt3bcdELoSSCnbGdJ7eQbq-G4WXAtv_pvahDsg",
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

  return { protectedApiCall, loading, error, data };
};
