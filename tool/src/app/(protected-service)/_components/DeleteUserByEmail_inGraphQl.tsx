"use client";
import React from "react";
import { useDeleteUserByEmail_inGraphQl } from "~/hooks/auth-graphqlHooks/useDeleteUserByEmail_inGraphQl";

const DeleteUserByEmail_inGraphQl = ({
  email,
  refetchUserList,
  id,
  username,
}: {
  email: string;
  refetchUserList: () => void;
  id: string | number;
  username: string;
}) => {
  const { handelDelete, loading } = useDeleteUserByEmail_inGraphQl({
    email,
    refetchUserList,
  });

  return (
    <>
      <div className="flex gap-1">
        id: {id} -- username: {username} -- {email}
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
