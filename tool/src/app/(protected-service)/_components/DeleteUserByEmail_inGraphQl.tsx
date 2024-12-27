"use client";

import React from "react";
import { gql, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($email: String!) {
    deleteUser(email: $email)
  }
`;
const DeleteUserByEmail_inGraphQl = ({
  email,
  refetchUserList,
}: {
  email: string;
  refetchUserList: () => void;
}) => {
  const [deleteUser, { data, loading, error }] =
    useMutation(DELETE_USER_MUTATION);
  console.log({ data, loading, error });

  const handelDelete = async () => {
    try {
      await deleteUser({ variables: { email } });
      console.log("deleted sucessfully");
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
  return (
    <>
      <div className="flex gap-1">
        {email}

        <button
          onClick={handelDelete}
          className="rounded-[10px] bg-green-800 p-[1px] px-1 text-[8px] text-white"
        >
          {loading ? "Loading..." : "Delete"}
        </button>
      </div>
    </>
  );
};

export default DeleteUserByEmail_inGraphQl;
