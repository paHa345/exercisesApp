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

  const req = reqToCoach.filter((el) => {
    return el.active;
  });

  useEffect(() => {
    dispatch(getCoachRequests());
  }, [pathName]);

  return <div>{req?.length > 0 && req.length}</div>;
};

export default RequestsAddToCoach;
