import { AppDispatch } from "@/app/store";
import { ICoachSlice, coachActions, getCoachRequests } from "@/app/store/coachSlice";
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

  const confirmRequestStatus = useSelector(
    (state: ICoachSlice) => state.coachState.confirmAddToCoachRequestStatus
  );
  const confirmRequestErrorMessage = useSelector(
    (state: ICoachSlice) => state.coachState.confirmAddToCoachRequestErrorMessage
  );

  useEffect(() => {
    if (confirmRequestStatus === "resolve" || confirmRequestStatus === "error") {
      const timeoutId = setTimeout(() => {
        dispatch(coachActions.setConfirmAddToCoachRequestStatusToReady());
      }, 5000);
      return () => {
        dispatch(coachActions.setConfirmAddToCoachRequestStatusToReady());
      };
    }
  }, [confirmRequestStatus]);

  const requestsElements = reqToCoach
    ?.filter((req) => req.active)
    .map((request) => {
      console.log(request);
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

              <div className="flex my-2 gap-3 flex-col md:flex-row">
                {request.active && (
                  <ConfirmRequstButton confirmRequest={request}></ConfirmRequstButton>
                )}

                <DeleteRequestButton active={request.active}></DeleteRequestButton>
              </div>
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
      <div className=" bottom-4 flex fixed w-full">
        <div className=" my-6 flex mx-auto w-full justify-center">
          {confirmRequestStatus === "loading" && (
            <div className=" flex flex-col items-center  shadow-notificationShadow">
              <h1 className=" text-center px-3 rounded-md py-3 bg-cyan-200">
                Подтверждение заявки
              </h1>
            </div>
          )}
          {confirmRequestStatus === "resolve" && (
            <div className=" flex flex-col items-center  shadow-notificationShadow">
              <h1 className=" text-center rounded-md   px-3 py-3 bg-green-200">
                Заявка успешно отправлена
              </h1>
            </div>
          )}
          {confirmRequestStatus === "error" && (
            <div className=" flex flex-col items-center shadow-notificationShadow">
              <h1 className=" text-center rounded-md   px-3 py-3 bg-rose-500">
                {`Ошибка ${confirmRequestErrorMessage}`}
              </h1>
            </div>
          )}
        </div>
      </div>{" "}
    </>
  );
};

export default RequestsList;
