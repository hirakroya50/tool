import React from "react";
import NotificationPopOver from "./_components/NotificationPopOver";
import PostDataOrTrigger from "./_components/PostDataOrTrigger";
const Page = () => {
  return (
    <div className="flex">
      <PostDataOrTrigger />
      <NotificationPopOver />
    </div>
  );
};

export default Page;
