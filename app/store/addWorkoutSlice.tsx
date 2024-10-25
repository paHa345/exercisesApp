import { Date } from "mongoose";
import { IOneExerciseTypes, exerciseTypes } from "../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { userActions, userSlice } from "./userSlice";

export const addWorkout = createAsyncThunk(
  "addWorkoutState/addWorkout",
  async function (currentWorkout: any, { rejectWithValue, dispatch }) {
    try {
      const req = await fetch("./../api/workout/addNewWorkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(currentWorkout),
      });
      const addedWorkout = await req.json();

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

      dispatch(addWorkoutActions.setExercisesCount(count.result));
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const changeCompleteExerciseStatus = createAsyncThunk(
  "addWorkoutState/changeCompleteExerciseStatus",
  async function (
    data: {
      exerciseId: string;
      workoutId: string;
      isCompleted: boolean;
      currentUserId: string;
      // setState: any;
    },
    { rejectWithValue, dispatch }
  ) {
    try {
      const reqCompleteStatus = await fetch(
        `/api/workout/changeCompleteExercise/${data.workoutId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ exerciseId: data.exerciseId, isCompleted: data.isCompleted }),
        }
      );
      const updatedWorkout = await reqCompleteStatus.json();
      if (!reqCompleteStatus.ok) {
        dispatch(addWorkoutActions.setChangeCompleteExerciseErrorMessage(updatedWorkout.message));
        throw new Error("Ошибка сервера");
      }

      // dispatch(userActions.setChangedExerciseWorkoutId(data.workoutId));
      dispatch(
        userActions.changeExerciseStatus({
          workoutId: data.workoutId,
          exerciseId: data.exerciseId,
          isComplete: data.isCompleted,
          currentUserId: data.currentUserId,
        })
      );
    } catch (error) {
      console.log(error);
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
  exerciseId: string;
  exercise: string;
  name: string;
  sets: number;
  reps: number;
  isCompleted?: boolean;
}

export interface IAddedUser {
  id: string;
  name: string;
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
      studentsIdArr: string[];
    };
    fetchAddWorkoutStatus: addWorkoutFetchStatus;
    fetchExercisesNumberCount: addWorkoutFetchStatus;
    changeCompleteExerciseStatus: addWorkoutFetchStatus;
    changeCompleteExerciseErrorMessage: string;

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
    addedUsers: IAddedUser[];
    showAddStudentsToWorkoutModal: boolean;
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
    studentsIdArr: string[];
  };
  fetchAddWorkoutStatus: addWorkoutFetchStatus;
  fetchExercisesNumberCount: addWorkoutFetchStatus;
  changeCompleteExerciseStatus: addWorkoutFetchStatus;
  changeCompleteExerciseErrorMessage: string;

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
  addedUsers: IAddedUser[];
  showAddStudentsToWorkoutModal: boolean;
}

export const initAddExerciseState: IAddWorkoutState = {
  currentAddedWorkout: {
    name: "",
    description: "",
    exercises: [],
    workoutDate: "",
    userId: "",
    addedWorkoutId: "987987987987",
    studentsIdArr: [],
  },
  fetchAddWorkoutStatus: addWorkoutFetchStatus.Ready,
  fetchExercisesNumberCount: addWorkoutFetchStatus.Ready,
  changeCompleteExerciseStatus: addWorkoutFetchStatus.Ready,
  changeCompleteExerciseErrorMessage: "",

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
  addedUsers: [],
  showAddStudentsToWorkoutModal: false,
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
        isCompleted: action.payload.isCompleted,
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
    addStudentInAddedStudents(
      state,
      action: {
        payload: {
          id: string;
          name: string;
        };
        type: string;
      }
    ) {
      const hasCurrentStudent = state.addedUsers.filter((student) => {
        return student.id === action.payload.id;
      });

      if (hasCurrentStudent.length === 0) {
        state.addedUsers.push(action.payload);
      }
    },
    deleteStudentFromAddedStudentsArr(
      state,
      action: {
        payload: string;
        type: string;
      }
    ) {
      const updatedArr = state.addedUsers.filter((student) => student.id !== action.payload);
      state.addedUsers = updatedArr;
    },
    showHideAddStudentsToWorkoutModal(state, action) {
      state.showAddStudentsToWorkoutModal = action.payload;
    },
    setChangeCompleteExerciseStatusToReady(state) {
      state.changeCompleteExerciseStatus = addWorkoutFetchStatus.Loading;
    },
    setChangeCompleteExerciseErrorMessage(state, action) {
      state.changeCompleteExerciseErrorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addWorkout.pending, (state, action) => {
      state.fetchAddWorkoutStatus = addWorkoutFetchStatus.Loading;
    });
    builder.addCase(setCountAllExercisesByType.pending, (state, action) => {
      state.fetchExercisesNumberCount = addWorkoutFetchStatus.Loading;
    });
    builder.addCase(changeCompleteExerciseStatus.pending, (state, action) => {
      state.changeCompleteExerciseStatus = addWorkoutFetchStatus.Loading;
    });
    builder.addCase(addWorkout.fulfilled, (state, action) => {
      state.fetchAddWorkoutStatus = addWorkoutFetchStatus.Resolve;
    });
    builder.addCase(setCountAllExercisesByType.fulfilled, (state, action) => {
      state.fetchExercisesNumberCount = addWorkoutFetchStatus.Resolve;
    });
    builder.addCase(changeCompleteExerciseStatus.fulfilled, (state, action) => {
      state.changeCompleteExerciseStatus = addWorkoutFetchStatus.Resolve;
    });
    builder.addCase(addWorkout.rejected, (state, action) => {
      state.fetchAddWorkoutStatus = addWorkoutFetchStatus.Error;
    });
    builder.addCase(setCountAllExercisesByType.rejected, (state, action) => {
      state.fetchExercisesNumberCount = addWorkoutFetchStatus.Error;
    });
    builder.addCase(changeCompleteExerciseStatus.rejected, (state, action) => {
      state.changeCompleteExerciseStatus = addWorkoutFetchStatus.Error;
    });
  },
});
export const addWorkoutActions = addWorkoutSlice.actions;
