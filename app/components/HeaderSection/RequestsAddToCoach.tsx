"use client";
import { IUserSlice } from "@/app/store/userSlice";
import { useSession } from "next-auth/react";
import React from "react";
import { useSelector } from "react-redux";

const RequestsAddToCoach = () => {
  const session = useSession();
  //   const currentUser = await fetch(`./api/users/getUserByEmail`);
  //   const data = await currentUser.json();
  //   console.log(data.result.addToStudentsRequests);
  //   const requestsCount = useSelector((state: IUserSlice) => state.userState.currentUser);
  //   console.log(requestsCount);
  return <div>RequestsAddToCoach</div>;
};

export default RequestsAddToCoach;
