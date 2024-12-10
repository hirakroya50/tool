import React from "react";
import TrpcTest from "../_components/trpcTest";
import DebouncingSearch from "../_components/DebouncingSearch";
import ThrottlingSearch from "../_components/ThrottlingSearch";

const page = () => {
  return (
    <div>
      <TrpcTest />
      <DebouncingSearch debounceDelay={500} placeholder="DebouncingSearch..." />
      <ThrottlingSearch throttleDelay={700} placeholder="ThrottlingSearch" />
    </div>
  );
};

export default page;
