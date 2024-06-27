import { ICoachSlice } from "@/app/store/coachSlice";
import React from "react";
import { useSelector } from "react-redux";

interface DeleteRequestButtonProps {
  active: boolean;
  requestId?: string;
}

const DeleteRequestButton = ({ active, requestId }: DeleteRequestButtonProps) => {
  const students = useSelector((state: ICoachSlice) => state.coachState.currentCoachStudents);
  const deleteRequestHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (active) {
      // отклонить запрос на добавление в ученики
      console.log("Отклонить заявку");
      console.log(requestId);
    } else {
      // удалить из учеников добавленного ранее пользователя
      console.log("Удалить из списка учеников");
      console.log(requestId);
      console.log(students);
    }
  };

  return (
    <div className=" flex sm:flex sm:flex-col sm:justify-center ">
      <button
        onClick={deleteRequestHandler}
        className="delete-buttonStandart w-full sm:h-12"
        // className=" pl-1 pr-1 w-full sm:h-12 py-2 bg- hover:bg-mainGroupColour rounded-md shadow-cardButtonShadow"
      >
        {active ? "Отклонить заявку" : "Удалить"}
      </button>
    </div>
  );
};

export default DeleteRequestButton;
