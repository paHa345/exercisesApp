"use client";
import React from "react";

const RefreshButton = () => {
  const revalidateHandler = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await fetch("/api/revalidate?secret=supersecret");
    console.log("Revalidate");
    // setResult("Done. Try to refresh the page");
  };
  return (
    <a href="" onClick={revalidateHandler}>
      Revalidate
    </a>
  );
};

export default RefreshButton;
