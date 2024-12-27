"use client";
import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { getClient } from "~/lib/apolloClient";
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

const FetchUserInGraphQlByClientC = () => {
  const { data, loading, refetch } = useQuery<UsersQueryResponse>(query);

  async function getData() {
    try {
      console.log({ data });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    void getData();
  }, []);

  if (loading) return <>Loading.......</>;
  return (
    <div>
      <button onClick={() => refetch()}>clikkk</button>
      <div className="m-3 border border-blue-400 p-3">
        <p className="underline">All user from client component:</p>
        {data?.users?.map((item, i) => {
          return <DeleteUserByEmail_inGraphQl key={i} email={item?.email} />;
        })}
      </div>

      {/* <SignUpForm /> */}
    </div>
  );
};

export default FetchUserInGraphQlByClientC;
