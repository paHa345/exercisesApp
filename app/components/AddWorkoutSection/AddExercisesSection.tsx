"use client";
import { AppDispatch } from "@/app/store";
import { IAddExerciseSlice } from "@/app/store/addExerciseSlice";
import { IAppSlice, setCurrentMuscleGroupAndSet } from "@/app/store/appStateSlice";
import { IExercise } from "@/app/types";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SmallLoadingCards from "../LoadingCardSection/SmallLoadingCards";
import {
  IAddWorkoutSlice,
  addWorkoutActions,
  setCountAllExercisesByType,
} from "@/app/store/addWorkoutSlice";
import AllCurrentUserExercises from "./AllCurrentUserExercises";
import ExercisesTypeButtons from "./ExercisesTypeButtons";
import ExercisesFilter from "./ExercisesFilter";
import ExercisesPaginationSection from "./ExercisesPaginationSection";
import PaginationSectionLoadingCard from "../LoadingCardSection/PaginationSectionLoadingCard";

const AddExercisesSection = () => {
  const fetchExercisesStatus = useSelector(
    (state: IAppSlice) => state.appState.fetchBestExercisesStatus
  );
  const fetchExercisesCount = useSelector(
    (state: IAddWorkoutSlice) => state.addWorkoutState.fetchExercisesNumberCount
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    console.log("ppp");
    dispatch(setCurrentMuscleGroupAndSet({ en: "all", ru: "Все", filterQuery: "" }));
    dispatch(setCountAllExercisesByType("all"));
    dispatch(addWorkoutActions.setCurrentExerciseMuscleGroup({ en: "all", ru: "Все" }));
    dispatch(
      addWorkoutActions.setExercisesFilter({
        filter: "popular",
        increment: true,
        ruName: "По популярности",
      })
    );
    dispatch(addWorkoutActions.setCurrentPageNumber(1));
  }, []);

  return (
    <>
      <div className="  overflow-auto h-3/6 ">
        <div className=" text-2xl">Выберете упражнение</div>
        <ExercisesTypeButtons></ExercisesTypeButtons>
        <ExercisesFilter></ExercisesFilter>
        {fetchExercisesStatus === "loading" && (
          <div className=" grid gap-2">
            <SmallLoadingCards></SmallLoadingCards>
          </div>
        )}
        {fetchExercisesStatus === "resolve" && <AllCurrentUserExercises></AllCurrentUserExercises>}
        {fetchExercisesStatus === "error" && (
          <div>
            <p>Ошибка. Повторите попытку позже</p>
          </div>
        )}
        {fetchExercisesCount === "loading" && (
          <PaginationSectionLoadingCard></PaginationSectionLoadingCard>
        )}
        {fetchExercisesCount === "resolve" && (
          <ExercisesPaginationSection></ExercisesPaginationSection>
        )}
        {fetchExercisesCount === "error" && (
          <div>
            <p>Ошибка. Повторите попытку позже</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AddExercisesSection;
