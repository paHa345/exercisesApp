"use client";
import ReduxProvider from "@/app/ReduxProvider";
import {
  ICoachSlice,
  coachActions,
  coachFetchStatus,
  fetchAllCoachesAndAddToState,
} from "@/app/store/coachSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CoachesList from "./CoachesList";
import { AppDispatch } from "@/app/store";
import CoachesListLoadingCard from "../LoadingCardSection/CoachesListLoadingCard";
import CoachesFilter from "./CoachesFilter";

const CoachesSectionMain = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fetchCoachesStatus = useSelector(
    (state: ICoachSlice) => state.coachState.getAllCoachesStatus
  );

  useEffect(() => {
    dispatch(fetchAllCoachesAndAddToState());
  }, []);
  return (
    <>
      <div className="mx-auto">
        <div className="">
          <div className="mx-auto py-10">
            <h1 className=" text-center text-4xl font-bold">Список тренеров</h1>
          </div>
          <CoachesFilter></CoachesFilter>

          <div className=" pb-8">
            {fetchCoachesStatus === coachFetchStatus.Loading && (
              <CoachesListLoadingCard></CoachesListLoadingCard>
            )}
            {fetchCoachesStatus === coachFetchStatus.Resolve && <CoachesList></CoachesList>}
            {fetchCoachesStatus === coachFetchStatus.Error && <p>Error</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachesSectionMain;
