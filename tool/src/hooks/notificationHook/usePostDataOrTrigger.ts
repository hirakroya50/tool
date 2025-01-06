// hooks/usePostData.js
import axios from "axios";
import { useState } from "react";

const usePostDataOrTrigger = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  //   const [response, setResponse] = useState();

  const postData = async ({ data }: { data: string }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL}redis/lpush-pub-sub`,
        {
          data,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      setIsError(false);
      return res;
    } catch (err) {
      setIsError(true);
      if (axios.isAxiosError(err)) setError(err as Error);
      else setError(new Error("An unknown error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return { postData, isError, loading, error };
};

export default usePostDataOrTrigger;
