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
import SearchLoadingCards from "../LoadingCardSection/SearchLoadingCards";
import PaginationMain from "../SearchPaginationSection/PaginationMain";
import { useRouter } from "next/navigation";
import SearchFilterMain from "../SearchFilterSection/SearchFilterMain";

const SearchMainComponent = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const session = useSession();
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

  const searchexerciseStatus = useSelector(
    (state: ISearchExerciseSlice) => state.searchExerciseState.searchExerciseStatus
  );

  const searchExercisesQuantity = useSelector(
    (state: ISearchExerciseSlice) => state.searchExerciseState.searchExercisesQuantity
  );

  const [deletedExerciseId, setDeletedExerciseId] = useState("");

  const setCurrentUserId = async () => {
    const currentUser = await fetch("./api/users/getUserByEmail");
    const data = await currentUser.json();
    dispatch(userActions.setCurrentUserId(data?.result?._id));
  };

  useEffect(() => {
    setCurrentUserId();
    dispatch(searchExerciseActions.setSerchQuery(searchQuery));

    // dispatch(findExerciseAndSetInState(searchParams.get("query")));
  }, []);

  useEffect(() => {
    if (searchParams.get("query") !== null) {
      dispatch(
        searchExerciseActions.setSearchExercisesCurrentPage(Number(searchParams.get("page")))
      );
      dispatch(
        findExerciseAndSetInState({
          query: searchParams.get("query"),
          page: searchParams.get("page"),
          filter: searchParams.get("filter"),
          increment: searchParams.get("increment"),
        })
      );
    }
  }, [
    searchParams.get("query"),
    searchParams.get("page"),
    searchParams.get("filter"),
    searchParams.get("increment"),
    searchQuery,
  ]);

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
          setDeletedExerciseId={setDeletedExerciseId}
        />
      </div>
    );
  });

  return (
    <>
      {searchexerciseStatus === "loading" ? (
        <SearchLoadingCards></SearchLoadingCards>
      ) : (
        <div>
          {" "}
          {searchParams.get("query") ? (
            <div className="py-5 flex justify-center">
              <h1 className=" mx-auto">
                {" "}
                По запросу <span className=" text-2xl font-bold">{searchParams.get("query")} </span>
                {findedExercises?.length
                  ? `найдено упражнений: ${searchExercisesQuantity} `
                  : `упражнений не найдено`}
              </h1>
            </div>
          ) : (
            <h1>Введите поисковый запрос</h1>
          )}
          {/* {findedExercises === null && <p>Введите поисковый запрос</p>} */}
          {findedExercises?.length && findedExercises !== null ? (
            <div>
              <SearchFilterMain></SearchFilterMain>
              <section className="pb-10">
                {deleteExerciseModal && (
                  <DeleteExerciseModal deletedExerciseId={deletedExerciseId}></DeleteExerciseModal>
                )}
                <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {findedExercisesCards}
                </div>
              </section>
            </div>
          ) : (
            <div className=" h-screen flex justify-center items-center">
              <p className=" text-2xl">Введите поисковый запрос с другими параметрами</p>
            </div>
          )}
        </div>
      )}
      <PaginationMain></PaginationMain>
    </>
  );
};

export default SearchMainComponent;
