import { configureStore } from "@reduxjs/toolkit";
import { appStateSlice } from "./appStateSlice";
import { addExerciseSlice } from "./addExerciseSlice";
import { addWorkoutSlice } from "./addWorkoutSlice";
import { authSlice } from "./authSlice";
import { userSlice } from "./userSlice";
import { editExerciseSlice } from "./editExerciseSlice";
import { currentExerciseSlice } from "./currentExerciseSlice";
import { searchExerciseSlice } from "./searchExerciseSlice";
import { coachSlice } from "./coachSlice";

const store = configureStore({
  reducer: {
    appState: appStateSlice.reducer,
    addExerciseState: addExerciseSlice.reducer,
    addWorkoutState: addWorkoutSlice.reducer,
    authState: authSlice.reducer,
    userState: userSlice.reducer,
    editExerciseState: editExerciseSlice.reducer,
    currentExerciseState: currentExerciseSlice.reducer,
    searchExerciseState: searchExerciseSlice.reducer,
    coachState: coachSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type AppDispatch = typeof store.dispatch;
