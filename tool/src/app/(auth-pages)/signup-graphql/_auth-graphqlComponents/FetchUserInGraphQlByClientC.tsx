"use client";
import React from "react";
import DeleteUserByEmail_inGraphQl from "./DeleteUserByEmail_inGraphQl";

type UsersQueryResponse = {
  users: {
    id: string;
    email: string;
    username: string;
    createdAt: string;
    mobile: string;
  }[];
};

const FetchUserInGraphQlByClientC = ({
  data,
  loading,
  refetchUserList,
}: {
  data: UsersQueryResponse | undefined;
  refetchUserList: () => void;
  loading: boolean;
}) => {
  if (loading) return <>Loading all users list...</>;
  return (
    <>
      <p className="pb-3 text-center font-sans text-xl underline">
        All user from client component:
      </p>
      <div className="h-[25rem] overflow-auto">
        {data?.users?.length === 0 && (
          <div className="pt-10 text-center">No user found</div>
        )}
        {data?.users?.map((item, i) => {
          return (
            <DeleteUserByEmail_inGraphQl
              key={i}
              email={item?.email}
              refetchUserList={refetchUserList}
              id={item.id}
              username={item.username}
              mobile={item.mobile}
            />
          );
        })}
      </div>
    </>
  );
};

export default FetchUserInGraphQlByClientC;
