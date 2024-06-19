"use client";
import React, { useEffect } from "react";
import RequestsList from "./RequestsList";
import StudentsList from "./StudentsList";

const RequestsAddToCoachMain = () => {
  useEffect(() => {}, []);
  return (
    <>
      <h1 className=" text-center text-4xl font-bold mx-auto py-10"> Список заявок</h1>
      <RequestsList></RequestsList>
      <h1 className=" text-center text-4xl font-bold mx-auto py-10"> Список учеников</h1>
      <StudentsList></StudentsList>
    </>
  );
};

export default RequestsAddToCoachMain;
