import { AppDispatch } from "@/app/store";
import {
  ICoachSlice,
  confirmAddToCoachRequest,
  postSubmitApplicationToCoach,
} from "@/app/store/coachSlice";
import { IAddToStudentsReq } from "@/app/types";
import { AnyAaaaRecord } from "dns";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

interface ConfirmButtonProps {
  confirmRequest: IAddToStudentsReq;
}

const ConfirmRequstButton = ({ confirmRequest }: ConfirmButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const confirmRequestHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(confirmRequest._id);
    dispatch(confirmAddToCoachRequest(confirmRequest._id));
  };
  return (
    <div className=" flex sm:flex sm:flex-col sm:justify-center ">
      <button
        onClick={confirmRequestHandler}
        className=" pl-1 pr-1 w-full sm:h-12 py-2 bg-mainColor hover:bg-mainGroupColour rounded-md shadow-cardButtonShadow"
      >
        Подтвердить заявку
      </button>
    </div>
  );
};

export default ConfirmRequstButton;
