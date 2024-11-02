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

const AddNumberMain = () => {
  const dispatch = useDispatch<AppDispatch>();

  const highlitedCoordinates = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.highlightedField.cellCoordinates
  );

  const modalType = useSelector((state: ICrosswordSlice) => state.crosswordState.modalType);

  const [currentNumber, setCurrentNumber] = useState(0);

  const hideSetNumberModalHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // dispatch(crosswordActions.setCellInputToParagraph(""));
    dispatch(crosswordActions.showParagraph());
    dispatch(crosswordActions.setInputToCell(0));
    dispatch(crosswordActions.setHighlitedParagraphStatusTrue());
    dispatch(crosswordActions.hideSetElementsMenu());
  };

  const addNumberTextAndHideModalHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log("hide");
    // dispatch(crosswordActions.addNumberAndText(currentNumber));
    dispatch(crosswordActions.setCellInputToParagraph(""));
    dispatch(crosswordActions.setHighlitedParagraphStatusTrue());
    dispatch(crosswordActions.hideSetElementsMenu());
    dispatch(crosswordActions.setInputToCell(0));
  };

  console.log(highlitedCoordinates);
  console.log(window.scrollY);

  return (
    <div
      style={{
        top: `${highlitedCoordinates.y + window.scrollY}px`,
        left: `${highlitedCoordinates.x}px`,
      }}
      className=" absolute flex justify-center items-center  "
    >
      <div className=" rounded-md bg-slate-200 p-2 absolute flex top-[-55px] right-[-60px] border-slate-400 border-solid border-2 ">
        <a
          className=" bg hover:bg-slate-400 px-2 py-1 rounded-full  hover:border-slate-400 border-solid border-2  border-slate-200"
          onClick={hideSetNumberModalHandler}
          href=""
        >
          <FontAwesomeIcon icon={faXmark} />
        </a>
        <a
          className=" bg hover:bg-slate-400 px-2 py-1 rounded-full  hover:border-slate-400 border-solid border-2  border-slate-200"
          onClick={addNumberTextAndHideModalHandler}
          href=""
        >
          <FontAwesomeIcon icon={faCheckCircle} />
        </a>
      </div>
    </div>
  );
};

export default AddNumberMain;
