"use client";

import React, { useEffect, useState } from "react";
import { api } from "~/trpc/react";

const FirstComponent = () => {
  const { data, isLoading, error } = api.post.hello.useQuery({ text: "nndd" });

  //   if (isLoading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error.message}</div>;\\\

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/hello");
        const data = await response.json();
        setMessage(data.message as string);
      } catch (error) {
        console.error("Error fetching API:", error);
        setMessage("Error fetching data");
      }
    };

    void fetchData();
  }, []);

  return (
    <div>
      <h1>{data?.greeting}</h1>

      <h1 className="text-red-500">
        {message ? `Message: ${message}` : "Loading..."}
      </h1>
    </div>
  );
};

export default FirstComponent;
