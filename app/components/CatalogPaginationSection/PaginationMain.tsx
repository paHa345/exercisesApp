import { IAppSlice } from "@/app/store/appStateSlice";
import React from "react";
import { useSelector } from "react-redux";

const PaginationMain = () => {
  const exercisesCount = useSelector((state: IAppSlice) => state.appState.exercisesCount);
  const pagesCount = Math.ceil(exercisesCount / 3);
  const pagesButton = [];
  for (let i = 1; i <= pagesCount; i++) {
    pagesButton.push(
      <button
        className=" bg-stone-200 shadow-cardElementStartShadow self-center mx-3 my-3 py-1 px-2 rounded-md hover:shadow-cardElementShadow hover:bg-stone-600 hover:text-slate-100"
        key={i}
      >
        {i}
      </button>
    );
  }
  return (
    <div>
      {pagesCount > 1 && (
        <div>
          <h1>Страницы</h1>
          <div>{pagesButton}</div>
        </div>
      )}
    </div>
  );
};

export default PaginationMain;
