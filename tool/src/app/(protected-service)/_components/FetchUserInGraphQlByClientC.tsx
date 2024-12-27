"use client";
import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import DeleteUserByEmail_inGraphQl from "./DeleteUserByEmail_inGraphQl";

const query = gql`
  query {
    users {
      id
      email
      username
      createdAt
      mobile
    }
  }
`;

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
  if (loading) return <>Loading.......</>;
  return (
    <div>
      <div className="m-3 border border-blue-400 p-3">
        <p className="underline">All user from client component:</p>
        {data?.users?.map((item, i) => {
          return (
            <DeleteUserByEmail_inGraphQl
              key={i}
              email={item?.email}
              refetchUserList={refetchUserList}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FetchUserInGraphQlByClientC;
