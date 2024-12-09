import React from "react";
import TrpcTest from "../_components/trpcTest";
import DebouncingSearch from "../_components/DebouncingSearch";

const page = () => {
  return (
    <div>
      <TrpcTest />
      <DebouncingSearch debounceDelay={500} placeholder="DebouncingSearch..." />
    </div>
  );
};

export default page;
