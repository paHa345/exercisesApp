import { AppDispatch } from "@/app/store";
import {
  IAddWorkoutSlice,
  addWorkoutActions,
  setCountAllExercisesByType,
} from "@/app/store/addWorkoutSlice";
import { setCurrentMuscleGroupAndSet } from "@/app/store/appStateSlice";
import { mainMuscleGrourArr } from "@/app/types";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ExercisesTypeButtons = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentExerciseMuscleGroup = useSelector(
    (state: IAddWorkoutSlice) => state.addWorkoutState.currentExerciseMuscleGroup.en
  );
  const exercisesFilter = useSelector(
    (state: IAddWorkoutSlice) => state.addWorkoutState.exercisesFilter
  );
  const muscleGroupsSelectEl = mainMuscleGrourArr.map(
    (muscleGroup: { nameRu: string; nameEn: string }) => {
      return (
        <option
          key={muscleGroup.nameEn}
          data-nameru={muscleGroup.nameRu}
          value={muscleGroup.nameEn}
        >
          {muscleGroup.nameRu}
        </option>
      );
    }
  );
  muscleGroupsSelectEl.unshift(
    <option key={"all"} value={"all"} data-nameru="Все">
      Все
    </option>
  );

  const changeCatalogFilterHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const dataType = selectedOption.getAttribute("data-nameru");
    const paramsString = `?filter=${exercisesFilter.filter}&increment=${exercisesFilter.increment}&page=1`;
    if (dataType !== null) {
      dispatch(addWorkoutActions.setCurrentPageNumber(1));

      dispatch(
        setCurrentMuscleGroupAndSet({
          en: e.currentTarget.value,
          ru: dataType,
          filterQuery: paramsString,
        })
      );
      dispatch(
        addWorkoutActions.setCurrentExerciseMuscleGroup({ en: e.currentTarget.value, ru: dataType })
      );
      dispatch(setCountAllExercisesByType(e.currentTarget.value));
    }
  };
  return (
    <div>
      <div className=" flex justify-center py-5">
        <select
          defaultValue={"all"}
          onChange={changeCatalogFilterHandler}
          name="catalogSelect"
          id="catalogSelect"
        >
          {muscleGroupsSelectEl}
        </select>
      </div>
    </div>
  );
};

export default ExercisesTypeButtons;
