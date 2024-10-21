"use client";
import EditExerciseMain from "@/app/components/EditExerciseSection/EditExerciseMain";
import { IAppSlice } from "@/app/store/appStateSlice";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const editExercise = () => {
  // const testFunc = async function () {
  //   const revalidate = await fetch("./../api/revalidate", { next: { revalidate: 1 } });
  //   const revRes = await revalidate.json();
  //   console.log(revRes);
  // };

  // useEffect(() => {
  //   testFunc();
  // });

  return <EditExerciseMain></EditExerciseMain>;
};

export default editExercise;
