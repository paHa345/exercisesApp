"use client";
import ReduxProvider from "@/app/ReduxProvider";
import {
  ICoachSlice,
  coachActions,
  coachFetchStatus,
  fetchAllCoachesAndAddToState,
} from "@/app/store/coachSlice";
import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CoachesList from "./CoachesList";
import { AppDispatch } from "@/app/store";
import CoachesListLoadingCard from "../LoadingCardSection/CoachesListLoadingCard";
import CoachesFilter from "./CoachesFilter";
import { useRouter, useSearchParams } from "next/navigation";
import CoachesPaginationMain from "./CoachesPaginationMain";
import SearchCoaches from "./SearchCoaches";
import PostRequestToAddCoachNotification from "./PostRequestToAddCoachNotification";

const CoachesSectionMain = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const fetchCoachesStatus = useSelector(
    (state: ICoachSlice) => state.coachState.getAllCoachesStatus
  );

  // useEffect(() => {
  //   dispatch(fetchAllCoachesAndAddToState(""));
  // }, []);

  useEffect(() => {
    const filterEn = searchParams.get("filter") !== null ? searchParams.get("filter") : "popular";
    const increment =
      searchParams.get("increment") !== null ? searchParams.get("increment") : "true";
    const page = searchParams.get("page") !== null ? searchParams.get("page") : "1";
    const query = searchParams.get("query") !== null ? searchParams.get("query") : "";
    dispatch(coachActions.setSearchCoachesQuery(query));

    const paramsString = `?filter=${filterEn}&increment=${increment}&page=${page}&query=${query}`;
    if (
      searchParams.get("filter") === null ||
      searchParams.get("increment") === null ||
      searchParams.get("page") === null
    ) {
      router.push(`./coaches${paramsString}`);
    }
    dispatch(coachActions.setCurrentCoachesPage(Number(page)));
    dispatch(fetchAllCoachesAndAddToState(paramsString));
  }, [
    searchParams.get("filter"),
    searchParams.get("increment"),
    searchParams.get("page"),
    searchParams.get("query"),
  ]);

  return (
    <>
      <div className="mx-auto">
        <div className="">
          <div className="mx-auto py-10">
            <h1 className=" text-center text-4xl font-bold">Список тренеров</h1>
          </div>
          <CoachesFilter></CoachesFilter>
          <SearchCoaches></SearchCoaches>

          <div className=" pb-8">
            {fetchCoachesStatus === coachFetchStatus.Loading && (
              <CoachesListLoadingCard></CoachesListLoadingCard>
            )}
            {fetchCoachesStatus === coachFetchStatus.Resolve && <CoachesList></CoachesList>}
            {fetchCoachesStatus === coachFetchStatus.Error && <p>Error</p>}
          </div>
          <CoachesPaginationMain></CoachesPaginationMain>
          <PostRequestToAddCoachNotification></PostRequestToAddCoachNotification>
        </div>
      </div>
    </>
  );
};

export default CoachesSectionMain;
