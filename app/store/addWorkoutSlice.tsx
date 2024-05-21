import { Date } from "mongoose";
import { IOneExerciseTypes, exerciseTypes } from "../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const addWorkout = createAsyncThunk(
  "addWorkoutState/addWorkout",
  async function (currentWorkout: any, { rejectWithValue, dispatch }) {
    // console.log(currentWorkout);
    try {
      const req = await fetch("./../api/workout/addNewWorkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(currentWorkout),
      });
      const addedWorkout = await req.json();
      console.log("Workout", addedWorkout);

      const updatedUser = await fetch("./../api/users/addWorkoutToUser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ workoutsArr: addedWorkout.result._id }),
      });

      const user = await updatedUser.json();

      if (!req.ok) {
        throw new Error("Ошибка сервера");
      }
      dispatch(addWorkoutActions.setAddedWorkoutId("sdfsdfsdf"));
      dispatch(addWorkoutActions.resetCurrentWorkout());
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const setCountAllExercisesByType = createAsyncThunk(
  "addWorkoutState/setCountAllExercisesByType",
  async function (exercisesType: string, { rejectWithValue, dispatch }) {
    try {
      const countReq = await fetch(`/api/exercises/getUserExercisesCount/${exercisesType}`);
      if (!countReq.ok) {
        throw new Error("Ошибка сервера");
      }

      const count = await countReq.json();
      console.log(`count ${count.result}`);

      dispatch(addWorkoutActions.setExercisesCount(count.result));
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export enum addWorkoutFetchStatus {
  Ready = "ready",
  Loading = "loading",
  Resolve = "resolve",
  Error = "error",
}

export interface IAddedExercises {
  // id:
  //   | string
  //   | {
  //       id: { id: string; name: string; _id: number };
  //       exerciseId: string;
  //       exercise: string;
  //       name: string;
  //       reps: number;
  //       sets: number;
  //       _id: number;
  //     };
  exerciseId: string;
  exercise: string;
  name: string;
  sets: number;
  reps: number;
}

export interface IAddWorkoutSlice {
  addWorkoutState: {
    currentAddedWorkout: {
      name: string;
      description: string;
      exercises: IAddedExercises[];
      workoutDate: string;
      userId: string;
      addedWorkoutId: string;
    };
    fetchAddWorkoutStatus: addWorkoutFetchStatus;
    currentExerciseMuscleGroup: {
      en: string;
      ru: string;
    };
    exercisesFilter: {
      filter: string;
      increment: boolean;
      ruName: string;
    };
    exercisesCount: number;
    currentPageNumber: number;
  };
}

interface IAddWorkoutState {
  currentAddedWorkout: {
    name: string;
    description: string;
    exercises: IAddedExercises[];
    workoutDate: string;
    userId: string;
    addedWorkoutId: string;
  };
  fetchAddWorkoutStatus: addWorkoutFetchStatus;
  currentExerciseMuscleGroup: {
    en: string;
    ru: string;
  };
  exercisesFilter: {
    filter: string;
    increment: boolean;
    ruName: string;
  };
  exercisesCount: number;
  currentPageNumber: number;
}

export const initAddExerciseState: IAddWorkoutState = {
  currentAddedWorkout: {
    name: "",
    description: "",
    exercises: [],
    workoutDate: "",
    userId: "",
    addedWorkoutId: "987987987987",
  },
  fetchAddWorkoutStatus: addWorkoutFetchStatus.Ready,
  currentExerciseMuscleGroup: {
    en: "all",
    ru: "Все",
  },
  exercisesFilter: {
    filter: "popular",
    increment: true,
    ruName: "По популярности",
  },
  exercisesCount: 0,
  currentPageNumber: 1,
};

export const addWorkoutSlice = createSlice({
  name: "addWorkoutState",
  initialState: initAddExerciseState,
  reducers: {
    setName(state, action) {
      state.currentAddedWorkout.name = action.payload;
    },
    setDescription(state, action) {
      state.currentAddedWorkout.description = action.payload;
    },
    addExerciseToWorkout(state, action) {
      state.currentAddedWorkout.exercises.push({
        exerciseId: action.payload.id,
        exercise: action.payload.id,
        // id: action.payload.id,
        sets: 0,
        reps: 0,
        name: action.payload.name,
      });
    },
    deleteExerciseFromWorkout(state, action) {
      state.currentAddedWorkout.exercises.splice(action.payload, 1);
    },
    changeSetsAmount(state, action) {
      // const currentExerciseIndex = state.currentAddedWorkout.exercises.findIndex((el) => {
      //   return el.id === action.payload.exerciseId;
      // });
      state.currentAddedWorkout.exercises[action.payload.index].sets = action.payload.value;
    },
    changeRepsAmount(state, action) {
      // const currentExerciseIndex = state.currentAddedWorkout.exercises.findIndex((el) => {
      //   return el.id === action.payload.exerciseId;
      // });
      state.currentAddedWorkout.exercises[action.payload.index].reps = action.payload.value;
    },
    setWorkoutDate(state, action) {
      console.log(action.payload);
      state.currentAddedWorkout.workoutDate = action.payload;
    },
    setAddedWorkoutId(state, action) {
      state.currentAddedWorkout.addedWorkoutId = action.payload;
    },
    setUserID(state, action) {
      state.currentAddedWorkout.userId = action.payload;
    },
    setFetchAddWorkoutStatusToReady(state) {
      state.fetchAddWorkoutStatus = addWorkoutFetchStatus.Ready;
    },
    setFetchAddWorkoutStatusToLoading(state) {
      state.fetchAddWorkoutStatus = addWorkoutFetchStatus.Loading;
    },
    resetCurrentWorkout(state) {
      state.currentAddedWorkout.description = "";
      state.currentAddedWorkout.name = "";
      state.currentAddedWorkout.exercises = [];
      state.currentAddedWorkout.workoutDate = "";
      state.currentAddedWorkout.userId = "";
    },
    setCurrentExerciseMuscleGroup(state, action) {
      state.currentExerciseMuscleGroup.en = action.payload.en;
      state.currentExerciseMuscleGroup.ru = action.payload.ru;
    },
    setExercisesFilter(state, action) {
      state.exercisesFilter.filter = action.payload.filter;
      state.exercisesFilter.increment = action.payload.increment;
      state.exercisesFilter.ruName = action.payload.ruName;
    },
    setExercisesCount(state, action) {
      state.exercisesCount = action.payload;
    },
    setCurrentPageNumber(state, action) {
      state.currentPageNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addWorkout.pending, (state, action) => {
      state.fetchAddWorkoutStatus = addWorkoutFetchStatus.Loading;
    });
    builder.addCase(addWorkout.fulfilled, (state, action) => {
      state.fetchAddWorkoutStatus = addWorkoutFetchStatus.Resolve;
    });
    builder.addCase(addWorkout.rejected, (state, action) => {
      state.fetchAddWorkoutStatus = addWorkoutFetchStatus.Error;
    });
  },
});

export const addWorkoutActions = addWorkoutSlice.actions;
