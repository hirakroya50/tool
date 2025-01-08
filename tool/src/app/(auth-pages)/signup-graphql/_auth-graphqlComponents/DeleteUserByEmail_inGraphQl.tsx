"use client";
import React from "react";
import { useDeleteUserByEmail_inGraphQl } from "~/hooks/signup-graphqlHooks/useDeleteUserByEmail_inGraphQl";

const DeleteUserByEmail_inGraphQl = ({
  email,
  refetchUserList,
  id,
  username,
  mobile,
}: {
  email: string;
  refetchUserList: () => void;
  id: string | number;
  username: string;
  mobile: string;
}) => {
  const { handelDelete, loading } = useDeleteUserByEmail_inGraphQl({
    email,
    refetchUserList,
  });

  return (
    <div className="mb-1 flex items-center justify-between rounded-lg border p-2 pr-4 shadow-sm">
      <div className="flex flex-col text-sm text-gray-700">
        <span>
          <strong>ID:</strong> {id}
        </span>
        <span>
          <strong>Username:</strong> {username}
        </span>
        <span>
          <strong>Email:</strong> {email}
        </span>
        <span>
          <strong>Mobile:</strong> {mobile}
        </span>
      </div>
      <button
        onClick={handelDelete}
        className={`rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 ${
          loading ? "cursor-not-allowed opacity-70" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default DeleteUserByEmail_inGraphQl;
