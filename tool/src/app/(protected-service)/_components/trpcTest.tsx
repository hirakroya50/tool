import React from "react";
import { api } from "~/trpc/server";

const TrpcTest = async () => {
  const hello = await api.product.hello({
    text: "from tRPC",
    secound: "emailllooo",
  });

  void api.post.getLatest.prefetch();

  return <div>hiii {hello.greeting}</div>;
};

export default TrpcTest;
