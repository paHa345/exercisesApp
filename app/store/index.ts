import { configureStore } from "@reduxjs/toolkit";
import { appStateSlice } from "./appStateSlice";
import { addExerciseSlice } from "./addExerciseSlice";
import { addWorkoutSlice } from "./addWorkoutSlice";
import { authSlice } from "./authSlice";

const store = configureStore({
  reducer: {
    appState: appStateSlice.reducer,
    addExerciseState: addExerciseSlice.reducer,
    addWorkoutState: addWorkoutSlice.reducer,
    authState: authSlice.reducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
