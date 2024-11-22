import toast from "react-hot-toast";
import { api } from "~/trpc/react";

export const useLoginHook = () => {
  return api.auth.signIn.useMutation({
    onMutate: ({}) => {
      // console.log("11111");
    },
    onSuccess: () => {
      toast.success("login successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
    onSettled: () => {
      // console.log("44444");
    },
  });
};
