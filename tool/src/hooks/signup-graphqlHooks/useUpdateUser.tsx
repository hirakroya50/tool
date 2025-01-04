import { gql, useMutation } from "@apollo/client";
import toast from "react-hot-toast";

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: String!, $username: String!, $mobile: String!) {
    updateUser(username: $username, mobile: $mobile, id: $id) {
      id
      email
      username
      mobile
    }
  }
`;

export const useUpdateUser = ({
  refetchUserList,
}: {
  refetchUserList: () => void;
}) => {
  const [updateUser, { loading: loadingFroUpdate, error: errorForUpdate }] =
    useMutation(UPDATE_USER_MUTATION);

  const handelUpdate = async ({
    id,
    username,
    mobile,
  }: {
    id: string;
    username: string;
    mobile: string;
  }) => {
    try {
      await updateUser({
        variables: {
          id,
          username,
          mobile,
        },
      });
      refetchUserList();
      toast.success("update successful");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "An unknown error occurred");
        toast.error("Inlaid ID or same mobile no. Other error for update");
      } else {
        toast.error("Inlaid ID or same mobile no. Other error for update");
      }
      console.error(error, "====error");
    }
  };
  return { handelUpdate, loadingFroUpdate, errorForUpdate };
};
