import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createCrosswordTableArrAndUpdateState = createAsyncThunk(
  "authState/loginUser",
  async function (crosswordValue: number, { rejectWithValue, dispatch }) {
    try {
      const createdCrossword: any = [];
      const createEl = async function () {
        for (let i = 0; i < crosswordValue; i++) {
          const arr = [];
          for (let j = 0; j < crosswordValue; j++) {
            arr.push({
              key: `${i}:${j}`,
              value: `${i}:${j}`,
              row: i,
              number: j,
              paragraph: 0,
              inputStatus: 0,
              inputValue: 0,
              textQuestionStatus: 0,
              textQuestionValue: "",
            });
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

export enum ModalType {
  "Number",
  "Horizontal",
  "Vertical",
}

export interface ICrosswordSlice {
  crosswordState: {
    crosswordValue: number;
    createdCrossword: {
      key: string;
      value: string;
      number: number;
      row: number;
      paragraph: number;
      paragraphNum?: number;
      inputStatus: number;
      inputValue: number;
      textQuestionStatus: number;
      textQuestionValue: string;
    }[][];
    createContextMenuStatus: boolean;
    createContextMenuXPosition: number;
    createContextMenuYPosition: number;
    highlightedField: {
      id: string;
      row: number;
      number: number;
      paragraphNum: number;
      setParagraph: number;
      cellCoordinates: {
        x: number;
        y: number;
      };
      textQuestionStatus: number;
      textQuestionValue: string;
    };
    modalType: ModalType;
    setNumberModalStatus: boolean;
    setTextModalStatus: boolean;
    questionValue: string;
  };
}

interface ICrosswordState {
  crosswordValue: number;
  createdCrossword: {
    key: string;
    value: string;
    number: number;
    row: number;
    paragraph: number;
    paragraphNum?: number;
    inputStatus: number;
    inputValue: number;
    textQuestionStatus: number;
    textQuestionValue: string;
  }[][];
  createContextMenuStatus: boolean;
  createContextMenuXPosition: number;
  createContextMenuYPosition: number;
  highlightedField: {
    id: string;
    row: number;
    number: number;
    paragraphNum: number;
    setParagraph: number;

    cellCoordinates: {
      x: number;
      y: number;
    };
    textQuestionStatus: number;
    textQuestionValue: string;
  };
  setNumberModalStatus: boolean;
  setTextModalStatus: boolean;
  questionValue: string;

  modalType: ModalType;
}

export const initCrosswordState: ICrosswordState = {
  crosswordValue: 10,
  createdCrossword: [],
  createContextMenuStatus: false,
  createContextMenuXPosition: 0,
  createContextMenuYPosition: 0,
  highlightedField: {
    id: "id",
    row: 0,
    number: 0,
    paragraphNum: -1,
    setParagraph: 0,
    cellCoordinates: { x: 0, y: 0 },
    textQuestionStatus: 0,
    textQuestionValue: "",
  },
  setNumberModalStatus: false,
  setTextModalStatus: false,
  questionValue: "",

  modalType: ModalType.Number,
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
      const currentHeight =
        action.payload.x > action.payload.windowWidth / 2
          ? action.payload.x - 200
          : action.payload.x + 20;

      const currentWidth =
        action.payload.y > action.payload.windowHeight / 2
          ? action.payload.y - 200
          : action.payload.y + 20;

      state.createContextMenuXPosition = currentHeight;
      state.createContextMenuYPosition = currentWidth;
    },
    addNumberAndText(state, action) {
      state.createdCrossword[state.highlightedField.row][state.highlightedField.number].paragraph =
        1;
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
    hideSetTextModal(state) {
      state.setTextModalStatus = false;
    },
    showSetTextModal(state) {
      state.setTextModalStatus = true;
    },
    setHighlitedParagraphStatusTrue(state) {
      state.highlightedField.setParagraph = 1;
    },
    setHighlitedParagraphStatusFalse(state) {
      state.highlightedField.setParagraph = 0;
    },
    clearParagraphField(state) {
      state.highlightedField.setParagraph = 0;
      state.highlightedField.paragraphNum = 0;
      state.createdCrossword[state.highlightedField.row][
        state.highlightedField.number
      ].paragraphNum = 0;
      state.createdCrossword[state.highlightedField.row][state.highlightedField.number].paragraph =
        0;
      state.createdCrossword[state.highlightedField.row][state.highlightedField.number].inputValue =
        0;
    },
    setModalType(state, action) {
      state.modalType = action.payload;
    },
    setInputToCell(state, action) {
      state.createdCrossword[state.highlightedField.row][
        state.highlightedField.number
      ].inputStatus = action.payload;
    },
    hideParagraph(state) {
      state.createdCrossword[state.highlightedField.row][state.highlightedField.number].paragraph =
        0;
    },
    changeCellInputValue(
      state,
      action: {
        payload: {
          value: string;
          fieldPosition: {
            row: string;
            col: string;
          };
        };
        type: string;
      }
    ) {
      state.createdCrossword[Number(action.payload.fieldPosition.row)][
        Number(action.payload.fieldPosition.col)
      ].inputValue = Number(action.payload.value);
    },
    setCellInputToParagraph(state, action) {
      state.createdCrossword[state.highlightedField.row][state.highlightedField.number].paragraph =
        1;
      state.createdCrossword[state.highlightedField.row][
        state.highlightedField.number
      ].paragraphNum =
        state.createdCrossword[state.highlightedField.row][
          state.highlightedField.number
        ].inputValue;
    },
    setQuestionValue(state, action) {
      state.questionValue = action.payload;
    },
    setCellTextQuestionValue(state, action) {
      console.log("set");
      state.createdCrossword[state.highlightedField.row][
        state.highlightedField.number
      ].textQuestionValue = action.payload;
    },
  },
  //   extraReducers: (builder) => {},
});

export const crosswordActions = crosswordSlice.actions;
