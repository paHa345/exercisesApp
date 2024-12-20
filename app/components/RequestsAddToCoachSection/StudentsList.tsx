"use client";
import React, { useEffect } from "react";
import { AppDispatch } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { ICoachSlice, getCurrentCoachStudentsAndSetInState } from "@/app/store/coachSlice";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import DeleteRequestButton from "./DeleteRequestButton";
import { ICurrentCoachStudent } from "@/app/types";
import CoachesListLoadingCard from "../LoadingCardSection/CoachesListLoadingCard";

const StudentsList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchStudentsStatus = useSelector(
    (state: ICoachSlice) => state.coachState.fetchCurrentCoachStudentsStatus
  );

  const fetchStudentsErrorMessage = useSelector(
    (state: ICoachSlice) => state.coachState.fetchCurrenrCoachStudentErrorMessage
  );

  const currentCoachStudents: ICurrentCoachStudent[] | [] = useSelector(
    (state: ICoachSlice) => state.coachState.currentCoachStudents
  );

  const studentsEl = currentCoachStudents.map((student) => {
    return (
      <div key={student.studentsArr.studentId._id}>
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
                  <p className=" font-bold">{student?.studentsArr.studentId.name}</p>
                </div>
                <div>
                  <div className=" flex flex-row items-center">
                    <FontAwesomeIcon icon={faMailBulk} />
                    <p>{student?.studentsArr.studentId.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex my-2 gap-3 flex-col md:flex-row">
              <DeleteRequestButton
                requestId={student?.studentsArr.addRequestId}
                active={false}
              ></DeleteRequestButton>
            </div>
          </div>
        </article>
      </div>
    );
  });
  useEffect(() => {
    dispatch(getCurrentCoachStudentsAndSetInState());
  }, []);

  return (
    <>
      <div className="pb-10">
        {fetchStudentsStatus === "loading" && <CoachesListLoadingCard></CoachesListLoadingCard>}
        {fetchStudentsStatus === "error" && (
          <div>
            {" "}
            <h1>{fetchStudentsErrorMessage}</h1>
          </div>
        )}
        {fetchStudentsStatus === "resolve" && <div>{studentsEl}</div>}
      </div>
    </>
  );
};

export default StudentsList;
