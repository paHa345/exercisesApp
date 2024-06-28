"use client";
import { AppDispatch } from "@/app/store";
import { ICoachSlice, coachActions, postSubmitApplicationToCoach } from "@/app/store/coachSlice";
import { IUserSlice, userActions } from "@/app/store/userSlice";
import { ICoachToList } from "@/app/types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
interface IProps {
  coach: ICoachToList;
}

const CoachElementButton = ({ coach }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const postReqToCoachStatus = useSelector(
    (state: ICoachSlice) => state.coachState.postSubmitApplicationStatus
  );

  const deleteRequestByUserStatus = useSelector(
    (state: ICoachSlice) => state.coachState.deleteRequestByUserStatus
  );

  const currentUser = useSelector((state: IUserSlice) => state.userState.currentUser);

  const addToCoachSubmitHandler = function (this: any) {
    if (postReqToCoachStatus === "loading") {
      console.log("Wait");
      return;
    }

    dispatch(postSubmitApplicationToCoach(this));
  };

  const startDeletingRequestHandler = function (this: any) {
    if (deleteRequestByUserStatus === "loading") {
      console.log("Wait");
      return;
    }

    dispatch(userActions.setDeletingByUserRequest(this));
    dispatch(coachActions.setDeleteRequestByUserStatusToReady());
    dispatch(coachActions.setDeletingRequestToTrue());
  };

  const rejectedByCoach = currentUser?.addToStudentsRequests?.find((request) => {
    return request.coachId === coach._id && request.rejectedByCoach === true;
  });

  const hasRequest = coach.requestToCoach?.find((req) => req.userId === currentUser._id);

  const inStudentsList = coach.studentsArr?.find((student) => student.studentId === currentUser.id);
  return (
    <>
      <div className=" flex sm:flex sm:flex-col sm:justify-center ">
        {!rejectedByCoach ? (
          <div>
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
        ) : (
          <div>
            <p>Отменено тренером</p>
            <button
              onClick={startDeletingRequestHandler.bind(rejectedByCoach)}
              className="delete-buttonStandart"
            >
              Удалить запрос
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CoachElementButton;
