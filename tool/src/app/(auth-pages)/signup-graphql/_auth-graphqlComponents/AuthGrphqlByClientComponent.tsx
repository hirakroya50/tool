"use client";
import React from "react";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

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

const AuthGrphqlByClientComponent = () => {
  const { data } = useSuspenseQuery<UsersQueryResponse>(query);
  console.log({ dataformserver: data });
  return (
    <div>
      {data?.users?.map((item, i) => {
        return <div key={i}>{item?.email}</div>;
      })}
    </div>
  );
};

export default AuthGrphqlByClientComponent;
