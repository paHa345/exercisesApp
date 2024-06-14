import { AppDispatch } from "@/app/store";
import { ICoachSlice, getCoachRequests } from "@/app/store/coachSlice";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmRequstButton from "./ConfirmRequstButton";
import CoachesListLoadingCard from "../LoadingCardSection/CoachesListLoadingCard";
import DeleteRequestButton from "./DeleteRequestButton";

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
    return (
      <div key={request._id}>
        <article className=" my-4 transition-shadow px-1 py-1 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-lg shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
          <div className=" flex sm:flex-row flex-col justify-around">
            <div className=" py-2 flex justify-center">
              <Image
                className="h-full"
                src="/user-placeholder.jpg"
                alt="mainLogo"
                height={50}
                width={100}
                priority
              ></Image>
            </div>
            <div className=" lg:flex lg:justify-around lg:flex-row gap-4">
              <div className=" flex flex-col  pb-4">
                <div className=" pb-2">
                  <h1>Имя</h1>
                  <p className=" font-bold">{request.userId.name}</p>
                </div>
                <div>
                  <div className=" flex flex-row items-center">
                    <FontAwesomeIcon icon={faMailBulk} />
                    <p>{request.userId.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <ConfirmRequstButton confirmRequest={request}></ConfirmRequstButton>
            <DeleteRequestButton></DeleteRequestButton>
          </div>
        </article>
      </div>
    );
  });

  useEffect(() => {
    dispatch(getCoachRequests());
  }, []);

  return (
    <>
      <div className=" pb-10">
        {getRequestStatus === "loading" && <CoachesListLoadingCard></CoachesListLoadingCard>}
        {getRequestStatus === "resolve" && <div> {requestsElements}</div>}
        {getRequestStatus === "error" && (
          <div>
            {" "}
            <h1>{getRequestsErrorMessage}</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default RequestsList;
