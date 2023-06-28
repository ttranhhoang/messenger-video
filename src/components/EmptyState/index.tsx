"use client";
import React from "react";

const EmptyState = () => {
  return (
    <div className="h-full px-4 py-10 sm:px-6 lg:px-8 lg:py-6 bg-gray-100 flex justify-center items-center">
      <div className="text-center flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          Select a chat or start a new conversation!
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
