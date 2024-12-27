// "use client";
import React from "react";

const AuthGraphQl = async () => {
  const data = await fetch("http://localhost:3002/graphql", {
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

  console.log({ dtata: data.data.users[0].email });
  return (
    <div>
      {data.data.users.map((item, i) => {
        return <div key={i}>{item.email}</div>;
      })}
    </div>
  );
};

export default AuthGraphQl;
