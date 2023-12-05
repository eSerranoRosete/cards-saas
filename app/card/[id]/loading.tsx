import React from "react";

export default function LoadingPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="items-center flex flex-col">
        <div className="w-12 h-1 bg-white animate-spin" />
        <h1 className="mt-10 text-sm">Loading</h1>
      </div>
    </div>
  );
}
