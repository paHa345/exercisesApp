import { AppDispatch } from "@/app/store";
import { IAddWorkoutSlice, addWorkoutActions } from "@/app/store/addWorkoutSlice";
import { setCurrentMuscleGroupAndSet } from "@/app/store/appStateSlice";
import { coachesFilterElements, filterElements } from "@/app/types";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const CoachesFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const filterOptionsEl = coachesFilterElements.map((filterEl, index) => {
    return (
      <option
        key={`${filterEl.nameEn}_${index}`}
        value={filterEl.nameRu}
        data-increment={filterEl.increment}
        data-nameen={filterEl.nameEn}
      >
        {filterEl.nameRu}
      </option>
    );
  });

  const changeFilterHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const dataIncrement = selectedOption.getAttribute("data-increment");
    const filterEn = selectedOption.getAttribute("data-nameen");
    const query = searchParams?.get("query") !== null ? searchParams?.get("query") : "";

    dispatch(addWorkoutActions.setCurrentPageNumber(1));

    const paramsString = `?filter=${filterEn}&increment=${dataIncrement}&page=1&query=${query}`;
    console.log(paramsString);
    router.push(`./coaches/${paramsString}`);

    // dispatch(
    //   addWorkoutActions.setExercisesFilter({
    //     filter: filterEn,
    //     increment: dataIncrement,
    //     ruName: selectedOption.textContent,
    //   })
    // );

    // dispatch(
    //   setCurrentMuscleGroupAndSet({
    //     en: currentexercisesMuscleGroup.en,
    //     ru: currentexercisesMuscleGroup.ru,
    //     filterQuery: paramsString,
    //   })
    // );
  };

  return (
    <div className=" flex justify-center py-5">
      <select
        defaultValue={"По популярности"}
        onChange={changeFilterHandler}
        name="catalogSelect"
        id="catalogSelect"
      >
        {filterOptionsEl}
      </select>
    </div>
  );
};

export default CoachesFilter;
