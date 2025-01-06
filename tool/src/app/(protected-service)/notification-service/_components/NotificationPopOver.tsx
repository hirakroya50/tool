"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { Bell } from "lucide-react";
import NotificationC from "./NotificationC";

const NotificationPopOver = () => {
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    setOpen(true); // Ensure the popover opens when the button is clicked
  };
  return (
    <div className="fixed right-32 top-4">
      {/* <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" onClick={handleButtonClick}>
            <Bell />
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              1
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" side="bottom"> */}
      <div className="">Notification</div>
      <NotificationC />
      {/*
        </PopoverContent>
      </Popover> */}
    </div>
  );
};

export default NotificationPopOver;
