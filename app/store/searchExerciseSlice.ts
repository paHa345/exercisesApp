import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IExercise } from "../types";

export const findExerciseAndSetInState = createAsyncThunk(
  "searchExerciseState/findExerciseAndSetInState",
  async function (searchQuery: string | null, { rejectWithValue, dispatch }) {
    try {
      const findExerciseReq = await fetch(`/api/exercises/findExercises/${searchQuery}`);
      const data = await findExerciseReq.json();
      console.log(data);
      dispatch(searchExerciseActions.setFoundedExercise(data.result));
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
    }
  }
);

export enum searchExerciseFetchStatus {
  Ready = "ready",
  Loading = "loading",
  Resolve = "resolve",
  Error = "error",
}

export interface ISearchExerciseSlice {
  searchExerciseState: {
    searchExerciseStatus: searchExerciseFetchStatus;
    searchExercises: IExercise[] | null;
    searchQuery: string;
  };
}

interface ISearchExerciseState {
  searchExercises: IExercise[] | null;
  searchExerciseStatus: searchExerciseFetchStatus;
  searchQuery: string;
}

const initSearchExerciseState: ISearchExerciseState = {
  searchExercises: null,
  searchExerciseStatus: searchExerciseFetchStatus.Ready,
  searchQuery: "",
};

export const searchExerciseSlice = createSlice({
  name: "searchExrciseSlice",
  initialState: initSearchExerciseState,
  reducers: {
    setFoundedExercise: (state, action: PayloadAction<IExercise[] | null>) => {
      state.searchExercises = action.payload;
    },
    setSerchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findExerciseAndSetInState.pending, (state) => {
        state.searchExerciseStatus = searchExerciseFetchStatus.Loading;
      })
      .addCase(findExerciseAndSetInState.fulfilled, (state) => {
        state.searchExerciseStatus = searchExerciseFetchStatus.Resolve;
      })
      .addCase(findExerciseAndSetInState.rejected, (state) => {
        state.searchExerciseStatus = searchExerciseFetchStatus.Error;
      });
  },
});

export const searchExerciseActions = searchExerciseSlice.actions;
