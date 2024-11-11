"use client";
import { AppDispatch } from "@/app/store";
import {
  createCrosswordTableArrAndUpdateState,
  crosswordActions,
  ICrosswordSlice,
} from "@/app/store/crosswordSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateCrosswordContextMenu from "./CreateCrosswordContextMenu";
import AddElementsMenuMain from "../CreateCrosswordTextInputSection/AddElementsMenuMain";
import CreateCrosswordCellMain from "../CreateCrosswordCellSection/CreateCrosswordCellMain";
import CreateCrosswordQuestionsSectionMain from "../CreateCrosswordQuestionsSection/CreateCrosswordQuestionsSectionMain";

const CreateCrosswordMain = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cretedCrosswordValue = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.crosswordValue
  );
  const createdCrossword = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.createdCrossword
  );
  const showContextMenu = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.createContextMenuStatus
  );

  const highlightedElId = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.highlightedField
  );

  const showAddElementMenu = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.setElementsModalStatus
  );

  const setTextModalStatus = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.setTextModalStatus
  );

  const [crosswordValue, setCrosswordValue] = useState(10);
  //   const [cretedCrosswordValue, setCretedCrosswordValue] = useState(10);
  const changeCrosswordValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCrosswordValue(Number(e.currentTarget.value));
  };

  const createdCrosswordTable = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.createdCrossword
  );

  const callContextMenuHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target: any = e.target;
    console.log(target.nodeName);
    if (showAddElementMenu || setTextModalStatus) {
      return;
    }

    if (target.nodeName !== "DIV" && target.nodeName !== "P") {
      return;
    }

    console.log(e.currentTarget.dataset.paragraphnum);
    const paragraphNum = dispatch(
      crosswordActions.setHighlightedField({
        id: e.currentTarget.dataset.fieldid,
        row: e.currentTarget.dataset.row,
        number: e.currentTarget.dataset.number,
        cellCoordinates: {
          x: e.currentTarget.getBoundingClientRect().x,
          y: e.currentTarget.getBoundingClientRect().y,
        },
        paragraphNum:
          e.currentTarget.dataset.paragraphnum === undefined
            ? 0
            : Number(e.currentTarget.dataset.paragraphnum),
        setParagraph: Number(e.currentTarget.dataset.paragraph),
        textQuestionStatus: Number(e.currentTarget.dataset.textquestionstatus),
        textQuestionValue: e.currentTarget.dataset.textquestionvalue,
      })
    );
    dispatch(crosswordActions.setQuestionValue(e.currentTarget.dataset.textquestionvalue));

    dispatch(
      crosswordActions.setCreateContextMenuPosition({
        x: e.pageX,
        y: e.pageY,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      })
    );
    dispatch(crosswordActions.setCreateContextMenuStatusTrue());
    console.log(highlightedElId);
  };

  const changeCellInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cellContainerEl = e.currentTarget.closest(".bg-lime-600") as HTMLElement;
    console.log(cellContainerEl);
    if (
      cellContainerEl !== null &&
      cellContainerEl.dataset?.row &&
      cellContainerEl.dataset?.number
    ) {
      dispatch(
        crosswordActions.changeCellInputValue({
          value: e.target.value,
          fieldPosition: {
            row: cellContainerEl.dataset?.row,
            col: cellContainerEl.dataset?.number,
          },
        })
      );
    }
  };

  const cretedCrosswordTableEl = createdCrosswordTable.map((el, i: number) => {
    return (
      <div className=" flex gap-1 mb-1 cellContainer" key={i}>
        {el.map((cell, j: number) => {
          return (
            <div key={`${i}:${j}`}>
              <CreateCrosswordCellMain cell={cell} i={i} j={j}></CreateCrosswordCellMain>
            </div>
            // <div
            //   onClick={callContextMenuHandler}
            //   data-fieldid={`${i}:${j}`}
            //   data-row={cell.row}
            //   data-number={cell.number}
            //   data-paragraph={cell.paragraph}
            //   data-paragraphnum={cell.paragraphNum}
            //   data-textquestionstatus={cell.textQuestionStatus}
            //   data-textquestionvalue={cell.textQuestionValue}
            //   data-addedwordcell={cell.addedWordCell}
            //   key={`${i}:${j}`}
            //   className={` ${cell.addedWordCell === Number(0) ? "" : "bg-lime-800"} ${highlightedElId.id === `${i}:${j}` ? " bg-lime-600" : ""} cursor-zoom-in   flex gap-1 items-center justify-center h-10 w-10 border-solid border-2 border-indigo-600`}
            // >
            //   {cell.addedWordLetter && <p>{cell.addedWordLetter}</p>}
            //   {cell.paragraph !== 0 && <p>{cell?.paragraphNum}</p>}
            //   {cell.inputStatus !== 0 && (
            //     <input
            //       onChange={changeCellInputHandler}
            //       className=" w-full"
            //       type="number"
            //       value={cell.inputValue}
            //     />
            //   )}
            // </div>
          );
        })}
      </div>
    );
  });
  const createCrosswordTableHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(crosswordActions.resetCrosswordQuestionArr());
    dispatch(crosswordActions.setCrosswordValue(crosswordValue));
    dispatch(createCrosswordTableArrAndUpdateState(crosswordValue));
  };

  return (
    <div>
      <div>
        <p>Укажите размер кроссворда</p>
        <input type="number" value={crosswordValue} onChange={changeCrosswordValueHandler} />
        <button onClick={createCrosswordTableHandler}>Создать поле кроссворда</button>
      </div>
      <div>
        <p>
          Размерность кроссворда <span>{cretedCrosswordValue}</span>
        </p>
      </div>

      {/* {setNumberModalStatus && <CreateCrosswordButtonsMenuMain></CreateCrosswordButtonsMenuMain>} */}

      {showAddElementMenu && <AddElementsMenuMain></AddElementsMenuMain>}

      {showContextMenu && <CreateCrosswordContextMenu></CreateCrosswordContextMenu>}

      {/* <div className={` w-[${cretedCrosswordValue * 39.5}px] pt-5 pb-5`}>
        <div className={`grid ${`grid-cols-${cretedCrosswordValue}`} gap-1`}> */}
      <div className={` min-w-max pt-5 pb-5 flex-col gap-1`}>{cretedCrosswordTableEl}</div>

      <CreateCrosswordQuestionsSectionMain></CreateCrosswordQuestionsSectionMain>
      {/* </div>
      </div> */}
    </div>
  );
};

export default CreateCrosswordMain;
