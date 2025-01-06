import { gql, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($email: String!) {
    deleteUser(email: $email)
  }
`;

export const useDeleteUserByEmail_inGraphQl = ({
  email,
  refetchUserList,
}: {
  email: string;
  refetchUserList: () => void;
}) => {
  const [deleteUser, { data, loading, error }] =
    useMutation(DELETE_USER_MUTATION);

  const handelDelete = async () => {
    try {
      await deleteUser({ variables: { email } });
      toast.success("delete successfully");

      refetchUserList();
    } catch (error) {
      console.log("errorcomming", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("login error: Unknown error occurred");
      }
    }
  };

  return {
    handelDelete,
    loading,
  };
};
