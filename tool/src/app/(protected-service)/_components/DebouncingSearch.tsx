"use client";
import React, { useState, useEffect } from "react";
interface SearchBarProps {
  placeholder?: string;
  debounceDelay?: number;
}
const DebouncingSearch: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  debounceDelay = 300,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    /*
     it will create a timer. if   "searchTerm" value change then it will clear the timer and restart a new timer . 
     how its clear the timer : by unmount feature of the useEffect . useEffect hook will run the javascript , when the 
     code of the useEffect get new code run / or the effect run again before end of the previous timer / or the logic will 
     rerun the it will run the unmount logic . that will clear the timer .
     but 
     if there is no new timer start then the settime out will run normaly and update the "debouncedValue" . and then if the 
     "debouncedValue" value change the only it wll run the logic for the api call 
    */

    console.log("working 111");
    const handler = setTimeout(() => {
      console.log("working 111---set");

      setDebouncedValue(searchTerm);
    }, debounceDelay);

    return () => {
      console.log("working 111---clear");

      clearTimeout(handler);
    };
  }, [searchTerm, debounceDelay]);

  useEffect(() => {
    if (debouncedValue === "") return;
    if (debouncedValue) {
      console.log("API Call Triggered for:---------->", debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div className="m-4 border px-4 shadow">
      <p className="text-red-500 underline">DebouncingSearch:</p>
      <div className="flex flex-col items-center gap-2.5">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full rounded border border-gray-300 p-2.5 text-base"
        />
        <p className="w-full text-xs text-gray-500">
          {debouncedValue
            ? `Searching for: ${debouncedValue}`
            : "Start typing to search..."}
        </p>
      </div>
    </div>
  );
};

export default DebouncingSearch;
