import { gql, useMutation } from "@apollo/client";
import { type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { type LoginFormInputs } from "~/types";

const CREATE_USER_MUTATION = gql`
  mutation SignUp(
    $email: String!
    $username: String!
    $mobile: String!
    $password: String!
  ) {
    signUp(
      email: $email
      username: $username
      mobile: $mobile
      password: $password
    ) {
      id
      email
      username
      createdAt
    }
  }
`;

export const useSignUpOrCreateUser = ({
  refetchUserList,
}: {
  refetchUserList: () => void;
}) => {
  const [signUp, { loading, error }] = useMutation(CREATE_USER_MUTATION);
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await signUp({
        variables: data,
      });
      toast.success("signup successfully");
      refetchUserList();
    } catch (error) {
      console.log("error is comming ..........", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("login error: Unknown error occurred");
      }
    }
  };
  return {
    onSubmit,
    loading,
    error,
  };
};
