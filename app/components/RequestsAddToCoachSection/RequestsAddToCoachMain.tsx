"use client";
import React, { useEffect } from "react";
import RequestsList from "./RequestsList";

const RequestsAddToCoachMain = () => {
  useEffect(() => {}, []);
  return (
    <>
      <h1 className=" text-center text-4xl font-bold mx-auto py-10"> Список заявок</h1>
      <RequestsList></RequestsList>
    </>
  );
};

export default RequestsAddToCoachMain;
