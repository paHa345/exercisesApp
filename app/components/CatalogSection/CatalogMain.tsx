"use client";

import React, { useEffect, useState } from "react";
import ExercisesMainSection from "../ExerciseSection/ExercisesMainSection";
import { useDispatch, useSelector } from "react-redux";
import { IAppSlice, appStateActions, setCurrentMuscleGroupAndSet } from "../../store/appStateSlice";
import { AppDispatch } from "../../store";
import LoadingCards from "../LoadingCardSection/LoadingCards";
import { IUserSlice, userActions } from "@/app/store/userSlice";
import CatalogFilter from "./CatalogFilter";

const CatalogMain = () => {
  const muscleGroups = [
    { en: "all", ru: "Все" },
    { en: "triceps", ru: "Трицепс" },
    { en: "legs", ru: "Ноги" },
    { en: "back", ru: "Спина" },
    { en: "chest", ru: "Грудные" },
    { en: "shoulders", ru: "Плечи" },
    { en: "biceps", ru: "Бицепс" },
  ];

  const currentMuscleGroup = useSelector((state: IAppSlice) => state.appState.currentMuscleGroup);
  const dispatch = useDispatch<AppDispatch>();
  const currentExercises = useSelector(
    (state: IAppSlice) => state.appState.currentExercisesByGroup
  );
  const fetchStatus = useSelector((state: IAppSlice) => state.appState.fetchBestExercisesStatus);

  const selectMuscleGroupHandler = (e: any) => {
    dispatch(
      setCurrentMuscleGroupAndSet({ en: e.target.dataset.nameen, ru: e.target.dataset.nameru })
    );
  };

  const buttonsEl = muscleGroups.map((el, index) => {
    return (
      <button
        data-nameen={el.en}
        data-nameru={el.ru}
        data-number={index}
        onClick={selectMuscleGroupHandler}
        className={` ${
          currentMuscleGroup.en === el.en ? "bg-cyan-800 text-slate-100" : "bg-baseColour"
        }   self-center mx-3 my-3 py-1 px-2 rounded-md hover:shadow-cardElementShadow `}
        key={el.en}
      >
        {" "}
        {el.ru}
      </button>
    );
  });

  const getAllExercises = async () => {
    const response = await fetch("./api/exercises/currentUserExercises", { cache: "no-store" });
    const data = await response.json();
    console.log(data.result);
  };

  const setCurrentUserId = async () => {
    const currentUser = await fetch("./api/users/getUserByEmail");
    const data = await currentUser.json();
    dispatch(userActions.setCurrentUserId(data?.result?._id));
  };

  useEffect(() => {
    setCurrentUserId();
    dispatch(setCurrentMuscleGroupAndSet({ en: "all", ru: "Все" }));
    getAllExercises();
  }, []);

  return (
    <>
      <div className="mx-auto py-8">
        <h1 className=" text-center text-2xl font-bold">Каталог упражнений</h1>
      </div>

      <div>{buttonsEl}</div>
      <div>
        <CatalogFilter></CatalogFilter>
      </div>

      <div>
        {fetchStatus === "loading" && (
          <>
            <div className=" mx-auto text-center text-2xl font-bold pb-5">
              {/* <h1>{currentMuscleGroup.ru}</h1> */}
            </div>
            <section className="pb-10">
              <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <LoadingCards></LoadingCards>
              </div>
            </section>
          </>
        )}
        {currentExercises.length > 0 && fetchStatus === "resolve" && (
          <>
            <div className=" mx-auto text-center text-2xl font-bold pb-5">
              <h1>{currentMuscleGroup.ru}</h1>
            </div>
            <ExercisesMainSection></ExercisesMainSection>
          </>
        )}
        {currentExercises.length === 0 && (
          <>
            <div className=" mx-auto text-center text-2xl font-bold pb-5">
              <h1>{currentMuscleGroup.ru}</h1>
            </div>
            <h1 className=" text-center text-xl font-bold my-32">
              {" "}
              Не найдено упражнений для данной мышечной группы
            </h1>
          </>
        )}
        {fetchStatus === "error" && (
          <h1 className=" text-center text-xl font-bold my-32">
            Ошибка. Не удалось получить данные с сервера. Повторите попытку позже
          </h1>
        )}{" "}
      </div>
    </>
  );
};

export default CatalogMain;
