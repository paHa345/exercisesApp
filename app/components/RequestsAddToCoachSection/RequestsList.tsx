import { AppDispatch } from "@/app/store";
import { ICoachSlice, getCoachRequests } from "@/app/store/coachSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RequestsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reqToCoach = useSelector((state: ICoachSlice) => state.coachState.requestsAppToCoach);

  const getRequestStatus = useSelector(
    (state: ICoachSlice) => state.coachState.getCoachRequestsStatus
  );

  const getRequestsErrorMessage = useSelector(
    (state: ICoachSlice) => state.coachState.getCoachRequestsErrorMessage
  );

  const requestsElements = reqToCoach?.map((request) => {
    return <div key={request._id}>{request._id}</div>;
  });

  useEffect(() => {
    console.log("RequestsList");
    dispatch(getCoachRequests());
  }, []);

  return (
    <>
      {getRequestStatus === "loading" && <div>Loading</div>}
      {getRequestStatus === "resolve" && <div> {requestsElements}</div>}
      {getRequestStatus === "error" && (
        <div>
          {" "}
          <h1>{getRequestsErrorMessage}</h1>
        </div>
      )}
    </>
  );
};

export default RequestsList;
