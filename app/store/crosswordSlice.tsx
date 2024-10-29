import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createCrosswordTableArrAndUpdateState = createAsyncThunk(
  "authState/loginUser",
  async function (crosswordValue: number, { rejectWithValue, dispatch }) {
    console.log(crosswordValue);
    try {
      const createdCrossword: any = [];
      const createEl = async function () {
        for (let i = 0; i < crosswordValue; i++) {
          const arr = [];
          for (let j = 0; j < crosswordValue; j++) {
            arr.push({ key: `${i}:${j}`, value: `${i}:${j}` });
          }
          createdCrossword.push(arr);
        }
      };
      await createEl();

      console.log(createdCrossword);
      //   dispatch(crosswordActions.setCrosswordValue(createdCrossword));
      dispatch(crosswordActions.setCreatedCrossword(createdCrossword));

      return "654654";
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export interface ICrosswordSlice {
  crosswordState: {
    crosswordValue: number;
    createdCrossword: {
      key: string;
      value: string;
    }[][];
    createContextMenuStatus: boolean;
    createContextMenuXPosition: number;
    createContextMenuYPosition: number;
    highlightedField: string;
  };
}

interface ICrosswordState {
  crosswordValue: number;
  createdCrossword: {
    key: string;
    value: string;
  }[][];
  createContextMenuStatus: boolean;
  createContextMenuXPosition: number;
  createContextMenuYPosition: number;
  highlightedField: string;
}

export const initCrosswordState: ICrosswordState = {
  crosswordValue: 10,
  createdCrossword: [],
  createContextMenuStatus: false,
  createContextMenuXPosition: 0,
  createContextMenuYPosition: 0,
  highlightedField: "",
};

export const crosswordSlice = createSlice({
  name: "crosswordState",
  initialState: initCrosswordState,
  reducers: {
    setCrosswordValue(state, action) {
      state.crosswordValue = action.payload;
    },
    setCreatedCrossword(state, action) {
      state.createdCrossword = action.payload;
    },
    setCreateContextMenuStatusTrue(state) {
      state.createContextMenuStatus = true;
    },
    setCreateContextMenuStatusFalse(state) {
      state.createContextMenuStatus = false;
    },
    setHighlightedField(state, action) {
      state.highlightedField = action.payload;
    },
    setCreateContextMenuPosition(
      state,
      action: {
        payload: { x: number; y: number; windowWidth: number; windowHeight: number };
        type: string;
      }
    ) {
      const winWidth = action.payload.windowWidth;
      const winHeight = action.payload.windowHeight;

      const currentWidth =
        action.payload.windowWidth / 2 > action.payload.y
          ? action.payload.y + 20
          : action.payload.y - 200;

      const currentHeight =
        action.payload.windowHeight / 2 > action.payload.x
          ? action.payload.x + 20
          : action.payload.x - 200;

      state.createContextMenuXPosition = currentHeight;
      state.createContextMenuYPosition = currentWidth;
    },
  },
  //   extraReducers: (builder) => {},
});

export const crosswordActions = crosswordSlice.actions;
