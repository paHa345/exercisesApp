import { AppDispatch } from "@/app/store";
import { crosswordActions, ICrosswordSlice } from "@/app/store/crosswordSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

interface ICellProps {
  cell: {
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
  };
  i: number;
  j: number;
}

const CreateCrosswordCellMain = ({ cell, i, j }: ICellProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const showAddElementMenu = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.setElementsModalStatus
  );

  const setTextModalStatus = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.setTextModalStatus
  );

  const highlightedElId = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.highlightedField
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

    // console.log(e.currentTarget.dataset.paragraphnum);
    const paragraphNum = dispatch(
      crosswordActions.setHighlightedField({
        id: `${i}:${j}`,
        row: cell.row,
        number: cell.number,
        cellCoordinates: {
          x: e.currentTarget.getBoundingClientRect().x,
          y: e.currentTarget.getBoundingClientRect().y,
        },
        paragraphNum: cell.paragraphNum === undefined ? 0 : Number(cell.paragraphNum),
        setParagraph: Number(cell.paragraph),
        textQuestionStatus: Number(cell.textQuestionStatus),
        textQuestionValue: cell.textQuestionValue,
      })
    );
    dispatch(crosswordActions.setQuestionValue(cell.textQuestionValue));

    dispatch(
      crosswordActions.setCreateContextMenuPosition({
        x: e.pageX,
        y: e.pageY,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      })
    );
    dispatch(crosswordActions.setCreateContextMenuStatusTrue());
  };

  const changeCellInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cellContainerEl = e.currentTarget.closest(".bg-lime-600") as HTMLElement;
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

  return (
    <div
      onClick={callContextMenuHandler}
      data-fieldid={`${i}:${j}`}
      data-row={cell.row}
      data-number={cell.number}
      data-paragraph={cell.paragraph}
      data-paragraphnum={cell.paragraphNum}
      data-textquestionstatus={cell.textQuestionStatus}
      data-textquestionvalue={cell.textQuestionValue}
      data-addedwordcell={cell.addedWordCell}
      key={`${i}:${j}`}
      className={` ${cell.addedWordCell === Number(0) ? "" : "bg-lime-800"} ${highlightedElId.id === `${i}:${j}` ? " bg-lime-600" : ""} cursor-zoom-in   flex gap-1 items-center justify-center h-10 w-10 border-solid border-2 border-indigo-600`}
    >
      {cell.addedWordLetter && <p>{cell.addedWordLetter}</p>}
      {cell.paragraph !== 0 && <p>{cell?.paragraphNum}</p>}
      {cell.inputStatus !== 0 && (
        <input
          onChange={changeCellInputHandler}
          className=" w-full"
          type="number"
          value={cell.inputValue}
        />
      )}
    </div>
  );
};

export default CreateCrosswordCellMain;
