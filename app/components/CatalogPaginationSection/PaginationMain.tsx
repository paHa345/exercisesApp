import { AppDispatch } from "@/app/store";
import {
  IAppSlice,
  appStateActions,
  appStateSlice,
  setCurrentMuscleGroupAndSet,
} from "@/app/store/appStateSlice";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const PaginationMain = () => {
  const searchParams = useSearchParams();
  const muscleGroup = useSelector((state: IAppSlice) => state.appState.currentMuscleGroup);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const currentPage = useSelector((state: IAppSlice) => state.appState.currentExercisesPage);
  const exercisesCount = useSelector((state: IAppSlice) => state.appState.exercisesCount);

  const changePageButtonHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const numberPageButton = Number(e.currentTarget.textContent);
    if (numberPageButton !== currentPage) {
      //изменить url
      // изменить currentExercisesPage
      dispatch(appStateActions.setCurrentExercisesPage(numberPageButton));

      const filter = searchParams.get("filter");
      const increment = searchParams.get("increment");

      const paramsString = `?${filter !== null ? `filter=${filter}` : ""}${increment !== null ? `&increment=${increment}` : ``}&page=${numberPageButton}`;

      router.replace(
        `/catalog?${filter !== null ? `filter=${filter}` : ""}${increment !== null ? `&increment=${increment}` : ``}&page=${numberPageButton}`
      );

      // загрузить новые упражнения

      dispatch(
        setCurrentMuscleGroupAndSet({
          en: muscleGroup.en,
          ru: muscleGroup.ru,
          filterQuery: paramsString,
        })
      );
    }
  };

  const pagesCount = Math.ceil(exercisesCount / 3);
  const pagesButton = [];
  for (let i = 1; i <= pagesCount; i++) {
    pagesButton.push(
      <button
        onClick={changePageButtonHandler}
        className={`${currentPage === i ? `bg-gray-600 text-slate-100` : `bg-stone-200`}  shadow-cardElementStartShadow self-center mx-3 my-3 py-1 px-2 rounded-md  hover:bg-gray-600  hover:text-slate-100  hover:shadow-cardElementShadow `}
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
