"use client";
import React from "react";

const RefreshButton = () => {
  const revalidateHandler = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // await fetch("/api/revalidate?secret=supersecret");
    // await fetch("./../../../pages/api/revalidatePages.tsx");
    const dataReq = await fetch("../../../pages/api/test.tsx");
    const data = await dataReq.json();
    console.log(data);
    // setResult("Done. Try to refresh the page");
  };
  return (
    <a href="" onClick={revalidateHandler}>
      Revalidate
    </a>
  );
};

export default RefreshButton;
