"use client";
import { IAppSlice } from "@/app/store/appStateSlice";
import {
  ISearchExerciseSlice,
  findExerciseAndSetInState,
  searchExerciseActions,
} from "@/app/store/searchExerciseSlice";
import { useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SmallExerciseCard, {
  ISmallExerciseProps,
} from "../SmallExerciseCardSection/SmallExerciseCard";
import { AppDispatch } from "@/app/store";
import { useSession } from "next-auth/react";
import { IUserSlice, userActions } from "@/app/store/userSlice";
import DeleteExerciseModal from "../DeleteExerciseSection2/DeleteExerciseModal";

const SearchMainComponent = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const session = useSession();
  // console.log(searchParams.get("query"));
  const userId = useSelector((state: IUserSlice) => state.userState.currentUser.id);
  const deleteExerciseModal = useSelector(
    (state: IAppSlice) => state.appState.deleteExerciseStatus
  );
  const findedExercises = useSelector(
    (state: ISearchExerciseSlice) => state.searchExerciseState.searchExercises
  );
  const searchQuery = useSelector(
    (state: ISearchExerciseSlice) => state.searchExerciseState.searchQuery
  );

  const [deletedExerciseId, setDeletedExerciseId] = useState("");
  console.log(searchQuery);

  const setCurrentUserId = async () => {
    const currentUser = await fetch("./api/users/getUserByEmail");
    const data = await currentUser.json();
    dispatch(userActions.setCurrentUserId(data?.result?._id));
  };

  useEffect(() => {
    setCurrentUserId();
    // dispatch(setCurrentMuscleGroupAndSet({ en: "all", ru: "Все" }));
    // getAllExercises();
  }, []);

  useEffect(() => {
    if (searchQuery.length === 0) {
      console.log(searchParams.get("query"));
      dispatch(findExerciseAndSetInState(searchParams.get("query")));
      return;
    }
    if (searchParams.get("query") !== null) {
      dispatch(findExerciseAndSetInState(searchQuery));
      return;
    }
  }, [searchParams.get("query"), searchQuery]);
  // dispatch(searchExerciseActions.setSerchQuery(searchParams.get("query")));

  // console.log(searchParams.get("query"));
  // useEffect(() => {
  //   if (searchParams.get("query") !== null) {
  //     dispatch(findExerciseAndSetInState(searchParams.get("query")));
  //   }
  // }, [searchQuery]);

  const findedExercisesCards = findedExercises?.map((findedExercise) => {
    return (
      <div key={findedExercise._id}>
        <SmallExerciseCard
          isCurrentUser={userId === findedExercise.createdUserId && session.data ? true : false}
          name={findedExercise.name}
          _id={findedExercise._id}
          id={findedExercise.id}
          image={findedExercise.image}
          isBest={findedExercise.isBest}
          type={findedExercise.type}
          raiting={findedExercise.raiting}
          video={findedExercise.video}
          description={findedExercise.description}
          muscleGroups={findedExercise.muscleGroups}
          mainGroupRu={findedExercise.mainGroupRu}
          mainGroup={findedExercise.mainGroup}
          // deleteExerciseHandler={deleteExerciseHandler}
          // setDeletedExerciseId={setDeletedExerciseId}
        />
      </div>
    );
  });

  return (
    <>
      {searchParams.get("query") ? (
        <div className="py-5 flex justify-center">
          <h1 className=" mx-auto">
            {" "}
            По запросу {searchParams.get("query")}{" "}
            {findedExercises?.length
              ? `найдено ${findedExercises?.length} упражнений`
              : `упражнений не найдено`}
          </h1>
        </div>
      ) : (
        <h1>Введите поисковый запрос</h1>
      )}
      {/* {findedExercises === null && <p>Введите поисковый запрос</p>} */}
      {findedExercises?.length && findedExercises !== null ? (
        <section className="pb-10">
          {deleteExerciseModal && (
            <DeleteExerciseModal deletedExerciseId={deletedExerciseId}></DeleteExerciseModal>
          )}
          <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {findedExercisesCards}
          </div>
        </section>
      ) : (
        <p>NO</p>
      )}
    </>
  );
};

export default SearchMainComponent;
