import toast from "react-hot-toast";
import { api } from "~/trpc/react";

export const useLoginHook = () => {
  toast.success("on muted successfully");

  return api.auth.signIn.useMutation({
    onMutate: ({}) => {
      toast.success("on muted successfully");
    },
    onSuccess: () => {
      toast.success(" successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
    onSettled: () => {
      toast.success("onSettled");
    },
  });
};
