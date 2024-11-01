import { AppDispatch } from "@/app/store";
import { appStateActions } from "@/app/store/appStateSlice";
import {
  crosswordActions,
  crosswordSlice,
  ICrosswordSlice,
  ModalType,
} from "@/app/store/crosswordSlice";
import { faXmark, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateCrosswordTextInputMain = () => {
  const dispatch = useDispatch<AppDispatch>();

  const highlitedCoordinates = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.highlightedField.cellCoordinates
  );

  const modalType = useSelector((state: ICrosswordSlice) => state.crosswordState.modalType);

  const [currentNumber, setCurrentNumber] = useState(0);

  const textQuestionValue = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.questionValue
  );

  const changeTextQuestionValueHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(crosswordActions.setQuestionValue(e.currentTarget.value));
  };

  const hideSetNumberModalHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(crosswordActions.hideSetTextModal());
    dispatch(crosswordActions.setQuestionValue(""));

    // dispatch(crosswordActions.setInputToCell(0));
  };

  const addNumberTextAndHideModalHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // dispatch(crosswordActions.setCellInputToParagraph(""));
    // dispatch(crosswordActions.setHighlitedParagraphStatusTrue());
    // dispatch(crosswordActions.hideSetNumberModal());
    // dispatch(crosswordActions.setInputToCell(0));

    dispatch(crosswordActions.setCellTextQuestionValue(textQuestionValue));
    dispatch(crosswordActions.setQuestionValue(""));
    dispatch(crosswordActions.hideSetTextModal());
  };

  return (
    <div
      style={{ top: `100px`, left: `200px` }}
      className=" absolute flex justify-center items-center  "
    >
      <div className=" rounded-md bg-slate-200 p-2 absolute flex  border-slate-400 border-solid border-2 ">
        <a
          className=" h-fit bg hover:bg-slate-400 px-2 py-1 rounded-full  hover:border-slate-400 border-solid border-2  border-slate-200"
          onClick={hideSetNumberModalHandler}
          href=""
        >
          <FontAwesomeIcon icon={faXmark} />
        </a>
        <a
          className=" h-fit bg hover:bg-slate-400 px-2 py-1 rounded-full  hover:border-slate-400 border-solid border-2  border-slate-200"
          onClick={addNumberTextAndHideModalHandler}
          href=""
        >
          <FontAwesomeIcon icon={faCheckCircle} />
        </a>
        <div className=" ml-2 border-slate-600 border-solid border-2">
          <textarea
            className=" ml-2"
            onChange={changeTextQuestionValueHandler}
            value={textQuestionValue}
            placeholder="Введите текст вопроса"
            name="comment"
            cols={20}
            rows={3}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CreateCrosswordTextInputMain;
