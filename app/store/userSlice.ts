import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IResponseUser, IWorkout } from "../types";
import { appStateSlice } from "./appStateSlice";

export const getUserWorkouts = createAsyncThunk(
  "appState/getUserWorkouts",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const req = await fetch("../api/workout/getCurrentUserWorkouts");
      if (!req.ok) {
        throw new Error("Ошибка сервера");
      }
      const user: IResponseUser = await req.json();
      dispatch(userActions.setCurrentUserWorkout(user.result.workoutsArr));
      return user.result.workoutsArr;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editWorkoutAndUpdate = createAsyncThunk(
  "appState/editWorkoutAndUpdate",
  async function (editedWorkout: IWorkout, { rejectWithValue, dispatch }) {
    try {
      const req = await fetch("./api/workout/editWorkout", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(editedWorkout),
      });
      if (!req.ok) {
        throw new Error("Ошибка сервера");
      }
      const editWorkout = await req.json();
      dispatch(userActions.updateWorkoutToEdited(editedWorkout));
      return editWorkout.result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWorkoutAndUpdateState = createAsyncThunk(
  "appState/deleteWorkoutAndUpdateState",
  async function (deletedWorkoutId: string, { rejectWithValue, dispatch }) {
    try {
      const deleteWorkoutFromUserReq = await fetch("/api/users/deleteWorkoutFromUser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ workoutId: deletedWorkoutId }),
      });

      if (!deleteWorkoutFromUserReq.ok) {
        throw new Error("Ошибка сервера");
      }

      const deletedWorkoutReq = await fetch(`./api/workout/${deletedWorkoutId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      if (!deletedWorkoutReq.ok) {
        throw new Error("Ошибка сервера");
      }

      await dispatch(userActions.deleteWorkoutfromUser(deletedWorkoutId));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteExerciseAndUpdateState = createAsyncThunk(
  "appState/deleteExerciseAndUpdateState",
  async function (deletedWorkoutId: string, { rejectWithValue, dispatch }) {
    try {
      // обновить текущего пользователя - удалить данную тренировку
      //  из списка тренировок пользователя
    } catch (error: any) {}
  }
);

export enum fetchCurrentUserWorkoutsStatus {
  Ready = "ready",
  Loading = "loading",
  Resolve = "resolve",
  Error = "error",
}

export interface IUserSlice {
  userState: {
    getWorkoutsStatus: fetchCurrentUserWorkoutsStatus;
    editWorkoutStatus: fetchCurrentUserWorkoutsStatus;
    deleteWorkoutStatus: fetchCurrentUserWorkoutsStatus;
    currentUser: {
      name: string;
      id: string;
      workoutsArr: IWorkout[];
      editedWorkout: IWorkout;
    };
  };
}

interface userState {
  getWorkoutsStatus: fetchCurrentUserWorkoutsStatus;
  editWorkoutStatus: fetchCurrentUserWorkoutsStatus;
  deleteWorkoutStatus: fetchCurrentUserWorkoutsStatus;

  currentUser: {
    name: string;
    id: string;
    workoutsArr: IWorkout[];
    editedWorkout: IWorkout;
  };
}

export const initUserState: userState = {
  getWorkoutsStatus: fetchCurrentUserWorkoutsStatus.Loading,
  editWorkoutStatus: fetchCurrentUserWorkoutsStatus.Ready,
  deleteWorkoutStatus: fetchCurrentUserWorkoutsStatus.Ready,

  currentUser: {
    name: "paHa345",
    id: "",
    workoutsArr: [],
    editedWorkout: {
      name: "Init",
      _id: "init",
      date: new Date(),
      comments: "init",
      userId: "init",
      exercisesArr: [{ name: "init", id: "init", sets: 0, reps: 0 }],
    },
  },
};

export const userSlice = createSlice({
  name: "userState",
  initialState: initUserState,
  reducers: {
    setCurrentUserId(state, action) {
      state.currentUser.id = action.payload;
    },
    setEditedWorkoutName(state, action) {
      state.currentUser.editedWorkout.name = action.payload;
    },
    setCurrentUserWorkout(state, action) {
      state.currentUser.workoutsArr = action.payload;
    },
    setEditedWorkout(state, action) {
      // console.log(action.payload);
      const editedWorkout = state.currentUser.workoutsArr.find((workout) => {
        return workout._id === action.payload;
      });
      // console.log(editedWorkout);
      if (editedWorkout) {
        state.currentUser.editedWorkout = editedWorkout;
      }
    },
    setEditedWorkoutId(state, action) {
      state.currentUser.editedWorkout.name = action.payload;
    },
    setEditedWorkoutComments(state, action) {
      state.currentUser.editedWorkout.comments = action.payload;
    },
    setEditedWorkoutDate(state, action) {
      state.currentUser.editedWorkout.date = action.payload;
    },
    changeSetsAmount(state, action) {
      state.currentUser.editedWorkout.exercisesArr[action.payload.index].sets =
        action.payload.value;
    },
    changeRepsAmount(state, action) {
      state.currentUser.editedWorkout.exercisesArr[action.payload.index].reps =
        action.payload.value;
    },
    addExerciseToEditedWorkout(state, action) {
      if (state.currentUser.editedWorkout.exercisesArr.length) {
        state.currentUser.editedWorkout.exercisesArr.push({
          id: action.payload.id,
          sets: 0,
          reps: 0,
          name: action.payload.name,
        });
      } else {
        state.currentUser.editedWorkout.exercisesArr = [
          { id: action.payload.id, sets: 0, reps: 0, name: action.payload.name },
        ];
      }
    },
    resetEditedWorkout(state) {
      const initEditWorkout: IWorkout = {
        name: "Init",
        _id: "init",
        date: new Date(),
        comments: "init",
        userId: "init",
        exercisesArr: [{ name: "init", id: "init", sets: 0, reps: 0 }],
      };
      state.currentUser.editedWorkout = initEditWorkout;
    },
    deleteExerciseFromEditedWorkout(state, action) {
      state.currentUser.editedWorkout.exercisesArr.splice(action.payload, 1);
    },
    deleteWorkoutfromUser(state, action) {
      const workoutIndex = state.currentUser.workoutsArr.findIndex((workout: IWorkout) => {
        return workout._id === action.payload;
      });
      console.log(workoutIndex);

      state.currentUser.workoutsArr.splice(workoutIndex, 1);

      // if(updatedWorkoutArr.length > 0 && updatedWorkoutArr){
      //   state.currentUser.workoutsArr = updatedWorkoutArr

      // }
    },
    updateWorkoutToEdited(
      state,
      action: {
        payload: IWorkout;
        type: string;
      }
    ) {
      state.currentUser.workoutsArr = state.currentUser.workoutsArr.map((workout: IWorkout) => {
        if (workout._id === action.payload._id) {
          return action.payload;
        } else {
          return workout;
        }
      });
    },
    setFetchAddWorkoutStatusToReady(state) {
      state.editWorkoutStatus = fetchCurrentUserWorkoutsStatus.Ready;
    },
    setFetchAddWorkoutStatusToLoading(state) {
      state.editWorkoutStatus = fetchCurrentUserWorkoutsStatus.Loading;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserWorkouts.pending, (state, action) => {
      state.getWorkoutsStatus = fetchCurrentUserWorkoutsStatus.Loading;
    });
    builder.addCase(editWorkoutAndUpdate.pending, (state, action) => {
      state.editWorkoutStatus = fetchCurrentUserWorkoutsStatus.Loading;
    });
    builder.addCase(deleteWorkoutAndUpdateState.pending, (state, action) => {
      state.deleteWorkoutStatus = fetchCurrentUserWorkoutsStatus.Loading;
    });
    builder.addCase(getUserWorkouts.fulfilled, (state, action) => {
      state.getWorkoutsStatus = fetchCurrentUserWorkoutsStatus.Resolve;
    });
    builder.addCase(editWorkoutAndUpdate.fulfilled, (state, action) => {
      state.editWorkoutStatus = fetchCurrentUserWorkoutsStatus.Resolve;
    });
    builder.addCase(deleteWorkoutAndUpdateState.fulfilled, (state, action) => {
      state.deleteWorkoutStatus = fetchCurrentUserWorkoutsStatus.Resolve;
    });
    builder.addCase(getUserWorkouts.rejected, (state, action) => {
      state.getWorkoutsStatus = fetchCurrentUserWorkoutsStatus.Error;
    });
    builder.addCase(editWorkoutAndUpdate.rejected, (state, action) => {
      state.editWorkoutStatus = fetchCurrentUserWorkoutsStatus.Error;
    });
    builder.addCase(deleteWorkoutAndUpdateState.rejected, (state, action) => {
      state.deleteWorkoutStatus = fetchCurrentUserWorkoutsStatus.Error;
    });
  },
});

export const userActions = userSlice.actions;
