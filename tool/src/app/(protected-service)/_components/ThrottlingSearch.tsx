"use client";

import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";

interface SearchBarProps {
  placeholder?: string;
  throttleDelay?: number;
}

const ThrottlingSearch: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  throttleDelay = 500, // Default throttle delay
}) => {
  const [query, setQuery] = useState("");

  // Throttling function using useCallback
  const throttle = (func: (searchTerm: string) => void, delay: number) => {
    let lastCall = 0;
    return (searchTerm: string) => {
      const now = new Date().getTime();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(searchTerm);
      }
    };
  };

  // Mock API Call
  const apiCall = (searchTerm: string) => {
    if (searchTerm === "") return;

    console.log("API Call: Searching for" + `${searchTerm}`);
    toast.success("throttle API call for: " + searchTerm);
  };

  // Throttled version of the API call
  const throttledApiCall = useCallback(throttle(apiCall, throttleDelay), [
    throttle,
    throttleDelay,
  ]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // setQuery(value);
    throttledApiCall(value); // Call the throttled API
  };
  return (
    <div className="m-4 border p-4 shadow">
      <p className="text-red-500 underline"> ThrottledSearch:</p>
      <p></p>
      <input
        type="text"
        // value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 p-2 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default ThrottlingSearch;
