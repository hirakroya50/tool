import toast from "react-hot-toast";
import { api } from "~/trpc/react";

export const useLoginHook = () => {
  const mutation = api.auth.signIn.useMutation({
    onMutate: () => {
      console.log("Mutation started");
    },
    onSuccess: () => {
      toast.success("Login successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong , cant login");
    },
    onSettled: () => {
      console.log("Mutation settled");
    },
  });

  return {
    ...mutation,
    isLoading: mutation?.status === "pending",
  };
};

export const useApiRequestWithHttpCookieHook = () => {
  const mutation = api.auth.apiRequestWithHttpCookie.useMutation({
    onMutate: () => {
      console.log("Mutation started");
    },
    onSuccess: () => {
      console.log("Request successful");
    },
    onError: (error) => {
      console.error(error.message || "Something went wrong");
      toast.error(
        " trpc can't catch the token " + error.message ||
          "Something went in api request",
      );
    },
    onSettled: () => {
      console.log("Mutation settled");
    },
  });

  return {
    ...mutation,
    isLoading: mutation?.status === "pending",
  };
};
