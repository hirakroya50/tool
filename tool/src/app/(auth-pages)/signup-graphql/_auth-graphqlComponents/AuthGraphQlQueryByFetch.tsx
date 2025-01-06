// "use client";
import React from "react";
type UsersQueryResponse = {
  data: {
    users: {
      id: string;
      email: string;
      username: string;
      createdAt: string;
      mobile: string;
    }[];
  };
};
const AuthGraphQlQueryByFetch = async () => {
  const url = process.env.NEXT_PUBLIC_B_LOGIC_MICROSERVICE_URL_GRAPH_QL;

  if (!url) {
    console.error("GraphQL URL is not defined in environment variables.");
    throw new Error("GraphQL URL is required but not defined.");
  }

  const data: UsersQueryResponse = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      query: `
      query {
        users {
          id
          email
          username
          createdAt
          mobile
        }
      }
    `,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return (
    <div>
      {data.data.users.map((item, i) => {
        return <div key={i}>{item.email}</div>;
      })}
    </div>
  );
};

export default AuthGraphQlQueryByFetch;
