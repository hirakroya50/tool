import React from "react";

import { gql } from "@apollo/client";
import { getClient } from "~/lib/apolloClient";

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

const AuthGraphQlQueryInServerComponent = async () => {
  const { data } = await getClient().query<UsersQueryResponse>({
    query,
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });
  console.log({ data });
  return (
    <div>
      <div className="m-3 border border-blue-400 p-3">
        <p className="underline">All user From Server component:</p>
        {data?.users?.map((item, i) => {
          return <div key={i}>{item?.email}</div>;
        })}
      </div>
    </div>
  );
};

export default AuthGraphQlQueryInServerComponent;
