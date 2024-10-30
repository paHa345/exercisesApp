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
            arr.push({ key: `${i}:${j}`, value: `${i}:${j}`, row: i, number: j, paragraph: false });
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
      number: number;
      row: number;
      paragraph: boolean;
      paragraphNum?: number;
    }[][];
    createContextMenuStatus: boolean;
    createContextMenuXPosition: number;
    createContextMenuYPosition: number;
    highlightedField: {
      id: string;
      row: number;
      number: number;
      cellCoordinates: {
        x: number;
        y: number;
      };
    };
    setNumberModalStatus: boolean;
  };
}

interface ICrosswordState {
  crosswordValue: number;
  createdCrossword: {
    key: string;
    value: string;
    number: number;
    row: number;
    paragraph: boolean;
    paragraphNum?: number;
  }[][];
  createContextMenuStatus: boolean;
  createContextMenuXPosition: number;
  createContextMenuYPosition: number;
  highlightedField: {
    id: string;
    row: number;
    number: number;
    x: number;
    y: number;
  };
  setNumberModalStatus: boolean;
}

export const initCrosswordState: ICrosswordState = {
  crosswordValue: 10,
  createdCrossword: [],
  createContextMenuStatus: false,
  createContextMenuXPosition: 0,
  createContextMenuYPosition: 0,
  highlightedField: { id: "id", row: 0, number: 0, x: 0, y: 0 },
  setNumberModalStatus: false,
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
      console.log(action.payload.x);
      console.log(action.payload.windowWidth / 2);

      const currentHeight =
        action.payload.x > action.payload.windowWidth / 2
          ? action.payload.x - 200
          : action.payload.x + 20;

      console.log(currentHeight);
      const currentWidth =
        action.payload.y > action.payload.windowHeight / 2
          ? action.payload.y - 200
          : action.payload.y + 20;

      state.createContextMenuXPosition = currentHeight;
      state.createContextMenuYPosition = currentWidth;
    },
    addNumberAndText(state, action) {
      state.createdCrossword[state.highlightedField.row][state.highlightedField.number].paragraph =
        true;
      state.createdCrossword[state.highlightedField.row][
        state.highlightedField.number
      ].paragraphNum = action.payload;
      //   console.log(state.createdCrossword[0].value);
    },
    hideSetNumberModal(state) {
      state.setNumberModalStatus = false;
    },
    showSetNumberModal(state) {
      state.setNumberModalStatus = true;
    },
  },
  //   extraReducers: (builder) => {},
});

export const crosswordActions = crosswordSlice.actions;
