import { createSlice } from "@reduxjs/toolkit";

export interface ICrosswordSlice {
  crosswordState: {
    crosswordValue: number;
    test: string;
  };
}

interface ICrosswordState {
  crosswordValue: number;
  test: string;
}

export const initCrosswordState: ICrosswordState = {
  crosswordValue: 10,
  test: "test",
};

export const crosswordSlice = createSlice({
  name: "crosswordState",
  initialState: initCrosswordState,
  reducers: {
    setCrosswordValue(state, action) {
      state.crosswordValue = action.payload;
    },
  },
  //   extraReducers: (builder) => {},
});

export const crosswordActions = crosswordSlice.actions;
