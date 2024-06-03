"use client";
import store from "@/app/store";
import { ICoachSlice } from "@/app/store/coachSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonRunning,
  faStopwatch,
  faMailBulk,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

const CoachesList = () => {
  const coachesArr = useSelector((state: ICoachSlice) => state.coachState.allCoachesArr);

  const coachesList = coachesArr?.map((coach) => {
    return (
      <div key={coach._id}>
        <article className="  transition-shadow px-1 py-1 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-lg shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
          <div className=" flex sm:flex-row flex-col justify-around">
            {/* <Link target="_blank" href={`../catalog/${exercise._id}`}>
              <div className=" flex flex-col gap-2">
                <h1 className=" grow text-base text font-bold pl-1 pt-1">{exercise.name}</h1>
                <div className=" flex flex-row justify-around">
                  {exercise.type === "base" ? (
                    <p className="  bg-baseColour self-center py-1 px-2 rounded-md">Базовое</p>
                  ) : (
                    <p className="  bg-isolatedColour self-center py-1 px-2 rounded-md text-cyan-50">
                      Изолированное
                    </p>
                  )}
                  <p className="  bg-mainGroupColour self-center py-1 px-2 rounded-md">
                    {exercise.mainGroupRu}
                  </p>
                </div>
              </div>
              <div className=" flex flex-row justify-center"></div>
            </Link> */}
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
              <button
                //   onClick={addExerciseHandler.bind(exercise)}
                className=" pl-1 pr-1 w-full sm:h-12 py-2 bg-mainColor hover:bg-mainGroupColour rounded-md shadow-cardButtonShadow"
              >
                Записаться
              </button>
            </div>
          </div>
        </article>
      </div>
    );
  });

  return <div className="grid gap-2">{coachesList}</div>;
};

export default CoachesList;
