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
              addedWordCell: 0,
            });
          }
          createdCrossword.push(arr);
        }
      };
      await createEl();

      //   dispatch(crosswordActions.setCrosswordValue(createdCrossword));
      dispatch(crosswordActions.setCreatedCrossword(createdCrossword));

      return "654654";
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export enum ModalType {
  "Question",
  "Number",
  "Word",
}

export enum AddedWordDirection {
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
      addedWordCell: number;
      addedWordLetter: string | null;
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
    setElementsModalStatus: boolean;
    setNumberModalStatus: boolean;
    setTextModalStatus: boolean;
    questionValue: string;
    addedWord: {
      direction: AddedWordDirection;
      value: string;
      addedWordArr: { row: number; col: number; addedLetter: string }[];
    };
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
    addedWordCell: number;
    addedWordLetter: string | null;
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
  setElementsModalStatus: boolean;
  questionValue: string;
  modalType: ModalType;
  addedWord: {
    direction: AddedWordDirection;
    value: string;
    addedWordArr: { row: number; col: number; addedLetter: string }[];
  };
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
  setElementsModalStatus: false,
  questionValue: "",
  modalType: ModalType.Number,
  addedWord: {
    direction: AddedWordDirection.Horizontal,
    value: "",
    addedWordArr: [],
  },
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
    showSetElementsMenu(state) {
      state.setElementsModalStatus = true;
    },
    hideSetElementsMenu(state) {
      state.setElementsModalStatus = false;
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
      state.highlightedField.paragraphNum = Number(action.payload.value);
    },
    showParagraph(state) {
      state.createdCrossword[state.highlightedField.row][state.highlightedField.number].paragraph =
        1;
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
      state.createdCrossword[state.highlightedField.row][
        state.highlightedField.number
      ].textQuestionValue = action.payload;
    },
    setAddedWordValue(state, action) {
      let lengthAddedWord = action.payload.split("").length;
      const count =
        state.addedWord.direction === AddedWordDirection.Horizontal
          ? Number(state.highlightedField.number) + action.payload.split("").length
          : Number(state.highlightedField.row) + action.payload.split("").length;
      if (count > state.crosswordValue) {
        state.addedWord.value = action.payload
          .split("")
          .slice(0, lengthAddedWord - 1)
          .join("");
        lengthAddedWord = lengthAddedWord - 1;
      } else {
        state.addedWord.value = action.payload;
      }
      for (let i = 0; i < state.addedWord.addedWordArr.length; i++) {
        state.createdCrossword[state.addedWord.addedWordArr[i].row][
          state.addedWord.addedWordArr[i].col
        ].addedWordCell = 0;
        state.createdCrossword[state.addedWord.addedWordArr[i].row][
          state.addedWord.addedWordArr[i].col
        ].addedWordLetter = null;
      }
      state.addedWord.addedWordArr = [];
      for (let i = 0; i < lengthAddedWord; i++) {
        if (
          Number(state.highlightedField.row) + i > state.crosswordValue - 1 &&
          Number(state.highlightedField.number) + i > state.crosswordValue - 1
        ) {
          break;
        }

        if (state.addedWord.direction === AddedWordDirection.Horizontal) {
          state.createdCrossword[Number(state.highlightedField.row)][
            Number(state.highlightedField.number) + i
          ].addedWordCell = 1;
          state.createdCrossword[Number(state.highlightedField.row)][
            Number(state.highlightedField.number) + i
          ].addedWordLetter = state.addedWord.value[i];
          state.addedWord.addedWordArr.push({
            row: Number(state.highlightedField.row),
            col: Number(state.highlightedField.number) + i,
            addedLetter: state.addedWord.value[i],
          });
        } else {
          state.createdCrossword[Number(state.highlightedField.row) + i][
            state.highlightedField.number
          ].addedWordCell = 1;
          state.createdCrossword[Number(state.highlightedField.row) + i][
            state.highlightedField.number
          ].addedWordLetter = state.addedWord.value[i];
          state.addedWord.addedWordArr.push({
            row: Number(state.highlightedField.row) + i,
            col: Number(state.highlightedField.number),
            addedLetter: state.addedWord.value[i],
          });
        }
      }
    },
    changeDirectionAndClearValue(state) {
      for (let i = 0; i < state.addedWord.addedWordArr.length; i++) {
        state.createdCrossword[state.addedWord.addedWordArr[i].row][
          state.addedWord.addedWordArr[i].col
        ].addedWordCell = 0;
        state.createdCrossword[state.addedWord.addedWordArr[i].row][
          state.addedWord.addedWordArr[i].col
        ].addedWordLetter = null;
      }
      state.addedWord.addedWordArr = [];
      state.addedWord.value = "";
    },
    setAddedWordDirection(state, action) {
      if (action.payload === AddedWordDirection.Horizontal) {
        state.addedWord.direction = AddedWordDirection.Horizontal;
      }
      if (action.payload === AddedWordDirection.Vertical) {
        state.addedWord.direction = AddedWordDirection.Vertical;
      }
    },
    clearAddedWord(state) {
      state.addedWord = {
        direction: AddedWordDirection.Horizontal,
        value: "",
        addedWordArr: [],
      };
    },
    clearInputValueAndParagraphStatus(state) {
      state.createdCrossword[state.highlightedField.row][state.highlightedField.number].inputValue =
        0;
      state.createdCrossword[state.highlightedField.row][state.highlightedField.number].paragraph =
        0;
      state.createdCrossword[state.highlightedField.row][
        state.highlightedField.number
      ].paragraphNum = 0;
    },
  },
  //   extraReducers: (builder) => {},
});

export const crosswordActions = crosswordSlice.actions;
