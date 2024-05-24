import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICoachToList } from "../types";

export const fetchAllCoachesAndAddToState = createAsyncThunk(
  "coachState/fetchAllCoachesAndAddToState",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const req = await fetch("../api/users/getAllCoaches");
      const data: { message: string; result: ICoachToList[]; allCoachesCount: number } =
        await req.json();
      console.log(data);
      dispatch(coachActions.setAllCoachesArr(data.result));
      dispatch(coachActions.setAllCoachesCount(data.allCoachesCount));
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export enum coachFetchStatus {
  Ready = "ready",
  Loading = "loading",
  Resolve = "resolve",
  Error = "error",
}

export interface ICoachSlice {
  coachState: {
    allCoachesArr: ICoachToList[];
    test: string;
    getAllCoachesStatus: coachFetchStatus;
    allCoachesCount: number;
  };
}

interface ICoachState {
  allCoachesArr: ICoachToList[];

  test: string;
  getAllCoachesStatus: coachFetchStatus;
  allCoachesCount: number;
}

export const initCoachState: ICoachState = {
  allCoachesArr: [
    {
      _id: "",
      email: "",
      name: "",
    },
  ],
  getAllCoachesStatus: coachFetchStatus.Ready,
  allCoachesCount: 0,

  test: "Super Coach",
};

export const coachSlice = createSlice({
  name: "coach",
  initialState: initCoachState,
  reducers: {
    setTest(state, action) {
      state.test = action.payload;
    },
    setAllCoachesArr(state, action) {
      state.allCoachesArr = action.payload;
    },
    setAllCoachesCount(state, action) {
      state.allCoachesCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCoachesAndAddToState.pending, (state) => {
      state.getAllCoachesStatus = coachFetchStatus.Loading;
    });
    builder.addCase(fetchAllCoachesAndAddToState.fulfilled, (state) => {
      state.getAllCoachesStatus = coachFetchStatus.Resolve;
    });
    builder.addCase(fetchAllCoachesAndAddToState.rejected, (state, action) => {
      state.getAllCoachesStatus = coachFetchStatus.Error;
    });
  },
});

export const coachActions = coachSlice.actions;
