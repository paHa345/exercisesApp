import { AppDispatch } from "@/app/store";
import { ICoachSlice, coachActions } from "@/app/store/coachSlice";
import React, { useState } from "react";
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

  const [requestOrStudentStatus, setRequestOrStudentStatus] = useState("");

  const students = useSelector((state: ICoachSlice) => state.coachState.currentCoachStudents);

  const deleteRequestHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (active) {
      setRequestOrStudentStatus("request");
      await dispatch(userActions.setRejectingOrDeletingByCoachRequest(rejectOrDeleteRequest));
      dispatch(coachActions.setDeletingRequestToTrue());
    } else {
      console.log(requestId);
      setRequestOrStudentStatus("student");
      await dispatch(userActions.setRejectingOrDeletingByCoachStudentId(requestId));
      dispatch(coachActions.setDeletingRequestToTrue());
    }
  };

  return (
    <>
      <div className=" flex sm:flex sm:flex-col justify-center ">
        <button
          onClick={deleteRequestHandler}
          className="delete-buttonStandart w-full sm:h-12"
          // className=" pl-1 pr-1 w-full sm:h-12 py-2 bg- hover:bg-mainGroupColour rounded-md shadow-cardButtonShadow"
        >
          {active ? "Отклонить заявку" : "Удалить"}
        </button>
      </div>
      {deletingRequestByCoach && (
        <DeleteOrRejectRequestByCoachModal
          status={requestOrStudentStatus}
        ></DeleteOrRejectRequestByCoachModal>
      )}{" "}
    </>
  );
};

export default DeleteRequestButton;
