import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IExercise } from "../types";
import { appStateActions } from "./appStateSlice";

interface ISearchQuery {
  query: string | null | undefined;
  page: string | null | undefined;
  filter?: string | null | undefined;
  increment?: string | null | undefined;
}

export const findExerciseAndSetInState = createAsyncThunk(
  "searchExerciseState/findExerciseAndSetInState",
  async function (searchQuery: ISearchQuery, { rejectWithValue, dispatch }) {
    try {
      console.log(searchQuery);
      const findExerciseReq = await fetch(
        `/api/exercises/findExercises?query=${searchQuery.query}&page=${searchQuery.page}${searchQuery.filter !== null ? `&filter=${searchQuery.filter}` : ""}${searchQuery.increment !== null ? `&increment=${searchQuery.increment}` : ""}`
      );
      const data = await findExerciseReq.json();
      console.log(data);
      dispatch(searchExerciseActions.setFoundedExercise(data.result));
      dispatch(appStateActions.setExercisesByGroup(data.result));
      dispatch(searchExerciseActions.setSearchExercisesQuantity(data.quantity));
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
    searchExercisesQuantity: number;
    searchExercisesCurrentPage: number;
  };
}

interface ISearchExerciseState {
  searchExercises: IExercise[] | null;
  searchExerciseStatus: searchExerciseFetchStatus;
  searchQuery: string;
  searchExercisesQuantity: number;
  searchExercisesCurrentPage: number;
}

const initSearchExerciseState: ISearchExerciseState = {
  searchExercises: null,
  searchExerciseStatus: searchExerciseFetchStatus.Ready,
  searchQuery: "",
  searchExercisesQuantity: 0,
  searchExercisesCurrentPage: 1,
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
    setSearchExercisesQuantity: (state, action) => {
      state.searchExercisesQuantity = action.payload;
    },
    setSearchExercisesCurrentPage: (state, action) => {
      state.searchExercisesCurrentPage = action.payload;
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
