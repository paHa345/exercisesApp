"use client";
import { AppDispatch } from "@/app/store";
import {
  createCrosswordTableArrAndUpdateState,
  crosswordActions,
  ICrosswordSlice,
} from "@/app/store/crosswordSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateCrosswordContextMenu from "./CreateCrosswordContextMenu";
import AddElementsMenuMain from "../CreateCrosswordTextInputSection/AddElementsMenuMain";
import CreateCrosswordCellMain from "../CreateCrosswordCellSection/CreateCrosswordCellMain";
import CreateCrosswordQuestionsSectionMain from "../CreateCrosswordQuestionsSection/CreateCrosswordQuestionsSectionMain";
import SaveCurrentCrosswordButton from "./SaveCurrentCrosswordButton";
import LoadCrosswordButton from "./LoadCrosswordButton";
import LoadCrosswordModalMain from "../CreateCrosswordLoadModalSection/LoadCrosswordModalMain";
import SaveCrosswordNotification from "./SaveCrosswordNotification";

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

  const crosswordIsCreated = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.crosswordIsCreate
  );

  const crosswordIsLoading = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.crosswordIsLoading
  );

  const crosswordName = useSelector((state: ICrosswordSlice) => state.crosswordState.crosswordName);

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

  const changeCrosswordName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(crosswordActions.setCrosswordName(e.currentTarget.value));
  };

  const showLoadCrosswordModal = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.showLoadCrosswordModal
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
          );
        })}
      </div>
    );
  });

  // useEffect(() => {
  //   console.log("load");
  // }, [createdCrosswordTable]);
  const createCrosswordTableHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (crosswordIsCreated || crosswordIsLoading) {
      alert("Кроссворд уже создан или загружен");
      return;
    }
    dispatch(crosswordActions.crosswordIsCreated(true));
    dispatch(crosswordActions.resetCrosswordQuestionArr());
    dispatch(crosswordActions.setCrosswordValue(crosswordValue));
    dispatch(createCrosswordTableArrAndUpdateState(crosswordValue));
  };

  const sendBotHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("first");
    const dataReq = await fetch(
      "https://api.telegram.org/bot7577331969:AAGYO1E1Kz_hDPu8DPhXRMUv1Gx_HdTn7Iw/getMe"
    );
    const data = await dataReq.json();
    console.log(data);
  };

  return (
    <div>
      <button onClick={sendBotHandler}>Send To Bot</button>

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
      {crosswordIsCreated || crosswordIsLoading ? (
        <div>
          <p>Название кроссворда</p>

          <input
            className=" border-solid border-2 border-indigo-600"
            type="text"
            value={crosswordName}
            onChange={changeCrosswordName}
          />
        </div>
      ) : (
        <div></div>
      )}

      <SaveCrosswordNotification></SaveCrosswordNotification>

      {crosswordIsCreated && <SaveCurrentCrosswordButton></SaveCurrentCrosswordButton>}

      <LoadCrosswordButton></LoadCrosswordButton>

      {showLoadCrosswordModal && <LoadCrosswordModalMain></LoadCrosswordModalMain>}

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
