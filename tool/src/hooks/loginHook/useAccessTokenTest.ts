import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useAccessTokenTest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<unknown>(null);

  const apiRequestWithHttpCookie = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_B_LOGIC_MICROSERVICE_URL}products/access-token-test`,
        {},
        { withCredentials: true },
      );
      setData(response.data);
      if (response.status === 200) {
        toast.success("Test api request the access token from cached data");
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

  return { apiRequestWithHttpCookie, loading, error, data };
};

//converted funtion
// const apiRequestWithHttpCookie = async () => {
//     try {
//       const response = await axios.post(
//         process.env.NEXT_PUBLIC_B_LOGIC_MICROSERVICE_URL +
//           "products/access-token-test",
//         {}, // Body can be empty if cookies are sent via headers
//         {
//           withCredentials: true, // Ensure cookies are included in the request
//         },
//       );

//       console.log(response, "===res");
//     } catch (error) {
//       console.log(error, "======error comgn in 2nd");
//     }
//   };
