import React from "react";

interface DeleteRequestButtonProps {
  active: boolean;
}

const DeleteRequestButton = ({ active }: DeleteRequestButtonProps) => {
  return (
    <div className=" flex sm:flex sm:flex-col sm:justify-center ">
      <button
        // onClick={confirmRequestHandler}
        className="delete-buttonStandart w-full sm:h-12"
        // className=" pl-1 pr-1 w-full sm:h-12 py-2 bg- hover:bg-mainGroupColour rounded-md shadow-cardButtonShadow"
      >
        {active ? "Удалить заявку" : "Удалить"}
      </button>
    </div>
  );
};

export default DeleteRequestButton;
