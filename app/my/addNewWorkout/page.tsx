"use client";

import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IAddWorkoutSlice,
  IAddedExercises,
  addWorkout,
  addWorkoutActions,
} from "../../store/addWorkoutSlice";
import AddExercisesSection from "@/app/components/AddWorkoutSection/AddExercisesSection";
import Link from "next/link";
import { AppDispatch } from "@/app/store";

const addNewWorkout = () => {
  const dispatch = useDispatch<AppDispatch>();

  const name = useSelector(
    (state: IAddWorkoutSlice) => state.addWorkoutState.currentAddedWorkout.name
  );
  const description = useSelector(
    (state: IAddWorkoutSlice) => state.addWorkoutState.currentAddedWorkout.description
  );

  const addedExercises = useSelector(
    (state: IAddWorkoutSlice) => state.addWorkoutState.currentAddedWorkout.exercises
  );

  const workoutDate = useSelector(
    (state: IAddWorkoutSlice) => state.addWorkoutState.currentAddedWorkout.workoutDate
  );
  const fetchAddWorkoutStatus = useSelector(
    (state: IAddWorkoutSlice) => state.addWorkoutState.fetchAddWorkoutStatus
  );

  const id = useSelector(
    (state: IAddWorkoutSlice) => state.addWorkoutState.currentAddedWorkout.addedWorkoutId
  );

  const [onFocusStatus, setInFocusStatus] = useState({
    name: false,
    description: false,
  });

  const changeNameHandler = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(addWorkoutActions.setName(e.currentTarget.value));
  };

  const changeDescriptionHandler = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(addWorkoutActions.setDescription(e.currentTarget.value));
  };

  const focusElHandler = (e: React.FocusEvent<HTMLElement>) => {
    e.target.id === "name"
      ? setInFocusStatus({ ...onFocusStatus, name: true })
      : setInFocusStatus({ ...onFocusStatus, description: true });
  };

  const focusOutElHandler = (e: React.FocusEvent<HTMLElement>) => {
    e.target.id === "name"
      ? setInFocusStatus({ ...onFocusStatus, name: false })
      : setInFocusStatus({ ...onFocusStatus, description: false });
  };

  const addWorkoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const currentWorkout = {
      name: name,
      comments: description,
      exercisesArr: addedExercises,
      date: workoutDate,
      userId: "6555c1fbb3a7c3aad9047fb2",
    };
    dispatch(addWorkout(currentWorkout));
  };

  const changeSetsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      addWorkoutActions.changeSetsAmount({
        value: e.target.value,
        exerciseId: e.target.dataset.exerciseid,
        index: e.target.dataset.index,
      })
    );
  };
  const changeRepsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      addWorkoutActions.changeRepsAmount({
        value: e.target.value,
        exerciseId: e.target.dataset.exerciseid,
        index: e.target.dataset.index,
      })
    );
  };

  const changeDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(String(e.target.value));

    dispatch(addWorkoutActions.setWorkoutDate(e.target.value));
  };

  const addedExercisesElement =
    addedExercises.length === 0 ? (
      <h1>Не добавлено упражнений</h1>
    ) : (
      addedExercises?.map((addedExercise: IAddedExercises, index) => {
        return (
          <div className="flex flex-row" key={`${addedExercise.id}_${index}`}>
            <div className=" w-3/5">
              <Link href={`../catalog/${addedExercise.id}`}>{addedExercise.name}</Link>
            </div>
            <div className=" w-1/5 flex flex-col justify-center">
              <label htmlFor="">Подходов</label>
              <div className=" self-center">
                <input
                  data-index={index}
                  data-exerciseid={addedExercise.id}
                  className="w-4/5 border-neutral-800"
                  onChange={changeSetsHandler}
                  type="text"
                  value={addedExercise.sets}
                />
              </div>
            </div>
            <div className=" w-1/5">
              <label htmlFor="">Повторений</label>
              <div className=" self-center">
                <input
                  data-index={index}
                  data-exerciseid={addedExercise.id}
                  className="w-4/5 border-neutral-800"
                  onChange={changeRepsHandler}
                  type="text"
                  value={addedExercise.reps}
                />
              </div>
            </div>
          </div>
        );
      })
    );
  return (
    <div className="  mx-auto py-8">
      <div>
        <div className="pb-6">
          <h1 className=" text-center text-2xl font-bold">Добавить новую тренировку</h1>
        </div>

        <div className=" shadow-exerciseCardHowerShadow p-3 max-w-xl mx-auto rounded-md border-solid border-2 border-stone-500">
          <div className="  w-11/12 mx-auto">
            <div className=" relative py-4">
              <input
                onChange={changeNameHandler}
                onFocus={focusElHandler}
                onBlur={focusOutElHandler}
                className="w-full  py-3 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
                id="name"
                type="text"
                value={name}
              />
              <span>
                <label
                  htmlFor="name"
                  className={` absolute transition-all ease-in-out ${
                    onFocusStatus.name || name.length > 0
                      ? "z-10 top-1 left-0  bg-white   scale-75"
                      : " top-1/3 left-2"
                  }`}
                >
                  Название тренировки
                </label>
              </span>
            </div>

            <div className="py-4 relative">
              <input
                onChange={changeDescriptionHandler}
                onFocus={focusElHandler}
                onBlur={focusOutElHandler}
                value={description}
                className=" w-full py-3 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
                id="description"
                type="text"
              />
              <span>
                <label
                  className={` absolute transition-all ease-in-out ${
                    onFocusStatus.description || description.length > 0
                      ? "z-10 top-1 left-0  bg-white   scale-75"
                      : " top-1/3 left-2"
                  }`}
                  htmlFor="description"
                >
                  Комментарий
                </label>
              </span>
            </div>

            <div className="py-4 flex flex-col">
              <label htmlFor="workoutDate">Дата тренировки</label>
              <input
                className=" w-2/5  hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
                onChange={changeDateHandler}
                id="workoutDate"
                type="date"
              />
            </div>

            <div>
              <h1>Упражнения</h1>
              {addedExercisesElement}
            </div>
            <AddExercisesSection></AddExercisesSection>
            <div className=" py-4">
              {fetchAddWorkoutStatus === "loading" && (
                <h1 className=" text-center px-3 rounded-md py-3 bg-cyan-200">
                  Загрузка тренировки
                </h1>
              )}
              {fetchAddWorkoutStatus === "resolve" && (
                <h1 className=" text-center rounded-md   px-3 py-3 bg-green-200">
                  Тренировка успешно загружена
                </h1>
              )}
              {fetchAddWorkoutStatus === "error" && (
                <h1 className=" text-center rounded-md   px-3 py-3 bg-rose-500">
                  Ошибка загрузки. Повторите попытку позже
                </h1>
              )}
            </div>
            <div className=" flex justify-center">
              {fetchAddWorkoutStatus === "loading" ? (
                <button className=" animate-pulse w-2/5 h-8  my-8 py-2 text-slate-50 font-bold shadow-exerciseCardHowerShadow min-w-max px-6 rounded bg-buttonColor hover:bg-buttonHoverColor"></button>
              ) : (
                <button
                  onClick={addWorkoutHandler}
                  className=" my-8 py-2 text-slate-50 font-bold shadow-exerciseCardHowerShadow min-w-max px-6 rounded bg-buttonColor hover:bg-buttonHoverColor"
                >
                  {" "}
                  Добавить тренировку
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default addNewWorkout;
