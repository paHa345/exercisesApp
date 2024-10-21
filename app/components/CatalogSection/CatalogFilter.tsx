"use client";
import { AppDispatch } from "@/app/store";
import { IAppSlice, appStateActions, setCurrentMuscleGroupAndSet } from "@/app/store/appStateSlice";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CatalogFilter = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const muscleGroup = useSelector((state: IAppSlice) => state.appState.currentMuscleGroup);

  const changeCatalogFilterHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const dataType = selectedOption.getAttribute("data-increment");
    dispatch(appStateActions.setCurrentExercisesPage(1));
    const filter = e.currentTarget.value;
    const increment = dataType;
    router.replace(`/catalog?filter=${e.currentTarget.value}&increment=${dataType}&page=${1}`);

    const paramsString = `?${filter !== null ? `filter=${filter}` : ""}${increment !== null ? `&increment=${increment}` : ``}&page=${1}`;

    dispatch(
      setCurrentMuscleGroupAndSet({
        en: muscleGroup.en,
        ru: muscleGroup.ru,
        filterQuery: paramsString,
      })
    );
  };

  return (
    <div className=" flex justify-center py-5">
      <select
        defaultValue={String(searchParams?.get("filter"))}
        onChange={changeCatalogFilterHandler}
        name="catalogSelect"
        id="catalogSelect"
      >
        <option value="popular" data-increment="true">
          По популярности
        </option>
        <option value="raiting" data-increment="true">
          По увеличению рейтинга
        </option>
        <option value="raiting" data-increment="false">
          По уменьшению рейтинга
        </option>
        <option value="name" data-increment="true">
          По имени
        </option>
      </select>
    </div>
  );
};

export default CatalogFilter;
