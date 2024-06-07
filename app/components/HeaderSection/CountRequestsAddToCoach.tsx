"use client";
import { AppDispatch } from "@/app/store";
import { ICoachSlice, getCoachRequests } from "@/app/store/coachSlice";
import { IUserSlice } from "@/app/store/userSlice";
import { useSession } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RequestsAddToCoach = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pathName = usePathname();

  const reqToCoach = useSelector((state: ICoachSlice) => state.coachState.requestsAppToCoach);

  useEffect(() => {
    dispatch(getCoachRequests());
  }, [pathName]);

  return <div>{reqToCoach.length > 0 && reqToCoach.length}</div>;
};

export default RequestsAddToCoach;
