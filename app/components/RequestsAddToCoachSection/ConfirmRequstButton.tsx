import { IAddToStudentsReq } from "@/app/types";
import { AnyAaaaRecord } from "dns";
import React from "react";

interface ConfirmButtonProps {
  confirmRequest: IAddToStudentsReq;
}

const ConfirmRequstButton = ({ confirmRequest }: ConfirmButtonProps) => {
  const confirmRequestHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(confirmRequest._id);
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
