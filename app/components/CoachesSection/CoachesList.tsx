"use client";
import store, { AppDispatch } from "@/app/store";
import { ICoachSlice, coachActions, postSubmitApplicationToCoach } from "@/app/store/coachSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonRunning,
  faStopwatch,
  faMailBulk,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { IUserSlice, userActions } from "@/app/store/userSlice";
import { ICoachToList } from "@/app/types";
import DeleteRequestModal from "../DeleteRequestSection/DeleteRequestModal";

const CoachesList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const coachesArr = useSelector((state: ICoachSlice) => state.coachState.allCoachesArr);

  const addToCoachSubmitHandler = function (this: any) {
    dispatch(postSubmitApplicationToCoach(this));
  };

  const deletingRequest = useSelector((state: ICoachSlice) => state.coachState.deletingRequest);

  const startDeletingRequestHandler = function (this: any) {
    dispatch(userActions.setDeletingByUserRequest(this));
    dispatch(coachActions.setDeletingRequestToTrue());
    // console.log("first");
    // console.log(this);
  };

  const setCurrentUserId = async () => {
    const currentUser = await fetch("./api/users/getUserByEmail");
    const data = await currentUser.json();
    dispatch(userActions.setCurrentUserId(data?.result?._id));
  };
  useEffect(() => {
    setCurrentUserId();
  }, []);

  const currentUser = useSelector((state: IUserSlice) => state.userState.currentUser);

  const coachesList = coachesArr?.map((coach: ICoachToList) => {
    console.log(coach);
    const hasRequest = coach.requestToCoach?.find((req) => req.userId === currentUser.id);
    const inStudentsList = coach.studentsArr?.find(
      (student) => student.studentId === currentUser.id
    );
    return (
      <div key={coach._id}>
        <article className="  transition-shadow px-1 py-1 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-lg shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
          <div className=" flex sm:flex-row flex-col justify-around">
            <div className=" flex justify-center">
              <Image
                className="h-full"
                src="/coachLogo.jpg"
                alt="mainLogo"
                height={160}
                width={230}
                priority
              ></Image>
            </div>
            <div className=" lg:flex lg:justify-around lg:flex-row gap-4">
              <div className=" flex flex-col  pb-4">
                <div className=" pb-2">
                  <h1>Имя</h1>
                  <p className=" font-bold">{coach.name}</p>
                </div>
                <div>
                  <div className=" flex flex-row items-center">
                    <FontAwesomeIcon icon={faMailBulk} />
                    {/* <h1>Email:</h1> */}
                    <p>{coach.email}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className=" flex flex-row items-center">
                  <FontAwesomeIcon icon={faStopwatch} />
                  <div className=" self-end pt-1">
                    Тренировок проведено:{" "}
                    <span className=" text-sm font-bold">{coach.workoutsCount}</span>
                  </div>
                </div>
                <div className=" flex flex-row items-center">
                  <FontAwesomeIcon icon={faPersonRunning} />
                  <div className=" self-end pt-1">
                    Подопечных:{" "}
                    <span className=" text-sm font-bold">{coach.studentsArr?.length}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex sm:flex sm:flex-col sm:justify-center ">
              {!hasRequest && (
                <button
                  onClick={addToCoachSubmitHandler.bind(coach._id)}
                  className=" pl-1 pr-1 w-full sm:h-12 py-2 bg-mainColor hover:bg-mainGroupColour rounded-md shadow-cardButtonShadow"
                >
                  Записаться
                </button>
              )}
              {hasRequest && !inStudentsList && (
                <button
                  onClick={startDeletingRequestHandler.bind(hasRequest)}
                  className="delete-buttonStandart"
                >
                  Отменить запрос
                </button>
              )}
              {hasRequest && inStudentsList && (
                <button onClick={startDeletingRequestHandler} className="delete-buttonStandart">
                  Удалиться
                </button>
              )}
            </div>
          </div>
        </article>
      </div>
    );
  });

  return (
    <>
      <div className="grid gap-2">
        {coachesList?.length > 0 ? (
          coachesList
        ) : (
          <div className="flex justify-center items-center h-80">
            <h1 className=" text-2xl">Ничего не найдено</h1>
          </div>
        )}
      </div>
      {deletingRequest && <DeleteRequestModal></DeleteRequestModal>}
    </>
  );
};

export default CoachesList;
