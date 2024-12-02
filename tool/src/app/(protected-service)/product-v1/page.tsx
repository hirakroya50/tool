import React, { useEffect, useState } from "react";
import TrpcTest from "../_components/trpcTest";
import FirstComponent from "../_components/FirstComponent";

const page = () => {
  return (
    <div>
      <TrpcTest />
      <FirstComponent />
    </div>
  );
};

export default page;
