import { AppDispatch } from "@/app/store";
import { IAddWorkoutSlice, addWorkoutActions } from "@/app/store/addWorkoutSlice";
import { setCurrentMuscleGroupAndSet } from "@/app/store/appStateSlice";
import { ISearchExerciseSlice, searchExerciseActions } from "@/app/store/searchExerciseSlice";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ExercisesPaginationSection = () => {
  const dispatch = useDispatch<AppDispatch>();

  const exercisesFilter = useSelector(
    (state: IAddWorkoutSlice) => state.addWorkoutState.exercisesFilter
  );
  const currentexercisesMuscleGroup = useSelector(
    (state: IAddWorkoutSlice) => state.addWorkoutState.currentExerciseMuscleGroup
  );

  const exercisesCount = useSelector(
    (state: IAddWorkoutSlice) => state.addWorkoutState.exercisesCount
  );

  const currentPage = useSelector(
    (state: IAddWorkoutSlice) => state.addWorkoutState.currentPageNumber
  );

  const changePageButtonHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const numberPageButton = Number(e.currentTarget.dataset.gotopage);

    if (numberPageButton !== currentPage) {
      //изменить url
      // изменить currentExercisesPage
      dispatch(addWorkoutActions.setCurrentPageNumber(numberPageButton));

      const paramsString = `?filter=${exercisesFilter.filter}&increment=${exercisesFilter.increment}&page=${numberPageButton}`;

      dispatch(
        setCurrentMuscleGroupAndSet({
          en: currentexercisesMuscleGroup.en,
          ru: currentexercisesMuscleGroup.ru,
          filterQuery: paramsString,
        })
      );
      //   const filter = searchParams.get("filter");
      //   const increment = searchParams.get("increment");
      //   const searchQuery = searchParams.get("query");

      //   const paramsString = `?${searchQuery !== null ? `query=${searchQuery}` : ""}${filter !== null ? `&filter=${filter}` : ""}${increment !== null ? `&increment=${increment}` : ``}&page=${numberPageButton}`;

      //   router.push(`/search${paramsString}`);

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

  const pagesCount = Math.ceil(exercisesCount / 3);
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
  return <div>{pagesButton}</div>;
};

export default ExercisesPaginationSection;
