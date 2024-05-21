import { AppDispatch } from "@/app/store";
import { addWorkoutActions } from "@/app/store/addWorkoutSlice";
import { IAppSlice } from "@/app/store/appStateSlice";
import { IExercise } from "@/app/types";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const AllCurrentUserExercises = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentExercises = useSelector(
    (state: IAppSlice) => state.appState.currentExercisesByGroup
  );

  const addExerciseHandler = function (this: IExercise) {
    dispatch(addWorkoutActions.addExerciseToWorkout({ id: this._id, name: this.name }));
  };

  const exercises = currentExercises?.map((exercise: IExercise, index) => {
    return (
      <div key={`${exercise._id}_${index}`}>
        <article className="  transition-shadow px-1 py-1 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-lg shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
          <div className=" flex flex-col">
            <Link target="_blank" href={`../catalog/${exercise._id}`}>
              <div className=" flex flex-col gap-2">
                <h1 className=" grow text-base text font-bold pl-1 pt-1">{exercise.name}</h1>
                <div className=" flex flex-row justify-around">
                  {exercise.type === "base" ? (
                    <p className="  bg-baseColour self-center py-1 px-2 rounded-md">Базовое</p>
                  ) : (
                    <p className="  bg-isolatedColour self-center py-1 px-2 rounded-md text-cyan-50">
                      Изолированное
                    </p>
                  )}
                  <p className="  bg-mainGroupColour self-center py-1 px-2 rounded-md">
                    {exercise.mainGroupRu}
                  </p>
                </div>
              </div>
              <div className=" flex flex-row justify-center"></div>
            </Link>

            <div className=" flex flex-col">
              <div className=" self-end pt-1">
                Рейтинг: <span className=" text-sm font-bold">{exercise.raiting}</span>
              </div>
            </div>
            <button
              onClick={addExerciseHandler.bind(exercise)}
              className=" py-2 bg-mainColor hover:bg-mainGroupColour rounded-md"
            >
              Добавить упражнение
            </button>
          </div>
        </article>
      </div>
    );
  });
  return (
    <>
      <div>
        <div className="grid sm:grid-cols-2  gap-2">{exercises}</div>
      </div>
    </>
  );
};

export default AllCurrentUserExercises;
