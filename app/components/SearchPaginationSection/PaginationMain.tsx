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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {
  ISearchExerciseSlice,
  findExerciseAndSetInState,
  searchExerciseActions,
} from "@/app/store/searchExerciseSlice";

const PaginationMain = () => {
  // const searchParams = useSearchParams();
  // const searchQuery = useSelector(
  //   (state: ISearchExerciseSlice) => state.searchExerciseState.searchQuery
  // );

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const currentPage = useSelector(
    (state: ISearchExerciseSlice) => state.searchExerciseState.searchExercisesCurrentPage
  );
  const searchExercisesQuantity = useSelector(
    (state: ISearchExerciseSlice) => state.searchExerciseState.searchExercisesQuantity
  );

  const changePageButtonHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const numberPageButton = Number(e.currentTarget.dataset.gotopage);

    if (numberPageButton !== currentPage) {
      //изменить url
      // изменить currentExercisesPage
      dispatch(searchExerciseActions.setSearchExercisesCurrentPage(numberPageButton));

      // const filter = searchParams.get("filter");
      // const increment = searchParams.get("increment");
      // const searchQuery = searchParams.get("query");

      // const paramsString = `?${searchQuery !== null ? `query=${searchQuery}` : ""}${filter !== null ? `&filter=${filter}` : ""}${increment !== null ? `&increment=${increment}` : ``}&page=${numberPageButton}`;

      // router.push(`/search${paramsString}`);

      // загрузить новые упражнения

      // dispatch(findExerciseAndSetInState(searchQuery));

      // dispatch(
      //   setCurrentMuscleGroupAndSet({
      //     en: muscleGroup.en,
      //     ru: muscleGroup.ru,
      //     filterQuery: paramsString,
      //   })
      // );
    }
  };

  const pagesCount = Math.ceil(searchExercisesQuantity / 3);
  //   const pagesCount = Math.ceil(exercisesCount);
  const pagesButton = [];
  let buttonCounter = 7;
  for (let i = currentPage - 3; i <= pagesCount; i++) {
    if (i === currentPage - 3) {
      pagesButton.push(
        <button
          onClick={changePageButtonHandler}
          className={`${currentPage === 1 ? `bg-gray-600 text-slate-100` : `bg-stone-200`}  shadow-cardElementStartShadow self-center mx-3 my-3 py-1 px-2 rounded-md  hover:bg-gray-600  hover:text-slate-100  hover:shadow-cardElementShadow `}
          key={"GoToFirst"}
          data-gotopage={1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      );
    }
    if (i > 0 && buttonCounter > 0) {
      pagesButton.push(
        <button
          onClick={changePageButtonHandler}
          className={`${currentPage === i ? `bg-gray-600 text-slate-100` : `bg-stone-200`}  shadow-cardElementStartShadow self-center mx-3 my-3 py-1 px-2 rounded-md  hover:bg-gray-600  hover:text-slate-100  hover:shadow-cardElementShadow `}
          key={i}
          data-gotopage={i}
        >
          {i}
        </button>
      );
      buttonCounter--;
    }

    if (i === pagesCount) {
      pagesButton.push(
        <button
          onClick={changePageButtonHandler}
          className={`${currentPage === pagesCount ? `bg-gray-600 text-slate-100` : `bg-stone-200`}  shadow-cardElementStartShadow self-center mx-3 my-3 py-1 px-2 rounded-md  hover:bg-gray-600  hover:text-slate-100  hover:shadow-cardElementShadow `}
          key={"GoToLast"}
          data-gotopage={pagesCount}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      );
    }
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
