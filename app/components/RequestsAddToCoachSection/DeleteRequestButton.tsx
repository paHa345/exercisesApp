import { AppDispatch } from "@/app/store";
import { ICoachSlice, coachActions } from "@/app/store/coachSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteOrRejectRequestByCoachModal from "./DeleteOrRejectRequestByCoachModal";
import { IAddToStudentsReq } from "@/app/types";
import { userActions } from "@/app/store/userSlice";

interface DeleteRequestButtonProps {
  active: boolean;
  requestId?: string;
  rejectOrDeleteRequest?: IAddToStudentsReq;
}

const DeleteRequestButton = ({
  active,
  requestId,
  rejectOrDeleteRequest,
}: DeleteRequestButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const deletingRequestByCoach = useSelector(
    (state: ICoachSlice) => state.coachState.deletingRequest
  );
  const students = useSelector((state: ICoachSlice) => state.coachState.currentCoachStudents);

  const deleteRequestHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (active) {
      // отклонить запрос на добавление в ученики
      console.log("Отклонить заявку");
      // console.log(rejectOrDeleteRequest);
      await dispatch(userActions.setRejectingOrDeletingByCoachRequest(rejectOrDeleteRequest));
      dispatch(coachActions.setDeletingRequestToTrue());
    } else {
      // удалить из учеников добавленного ранее пользователя
      console.log("Удалить из списка учеников");
      console.log(requestId);
      console.log(students);
    }
  };

  return (
    <>
      <div className=" flex sm:flex sm:flex-col sm:justify-center ">
        <button
          onClick={deleteRequestHandler}
          className="delete-buttonStandart w-full sm:h-12"
          // className=" pl-1 pr-1 w-full sm:h-12 py-2 bg- hover:bg-mainGroupColour rounded-md shadow-cardButtonShadow"
        >
          {active ? "Отклонить заявку" : "Удалить"}
        </button>
      </div>
      {deletingRequestByCoach && (
        <DeleteOrRejectRequestByCoachModal></DeleteOrRejectRequestByCoachModal>
      )}{" "}
    </>
  );
};

export default DeleteRequestButton;
