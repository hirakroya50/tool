"use client";

import React from "react";
import { gql, useMutation } from "@apollo/client";
const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($email: String!) {
    deleteUser(email: $email)
  }
`;
const DeleteUserByEmail_inGraphQl = ({ email }: { email: string }) => {
  const [deleteUser, { data, loading, error }] =
    useMutation(DELETE_USER_MUTATION);
  console.log({ data, loading, error });
  return (
    <>
      <div className="flex gap-1">
        {email}

        <button
          onClick={async () => {
            try {
              await deleteUser({ variables: { email } });
              console.log("deleted sucessfully");
            } catch (error) {
              console.log("errorcomming", error);
            }
          }}
          className="rounded-[10px] bg-green-800 p-[1px] px-1 text-[8px] text-white"
        >
          {loading ? "Loading..." : "Delete"}
        </button>
      </div>
    </>
  );
};

export default DeleteUserByEmail_inGraphQl;
