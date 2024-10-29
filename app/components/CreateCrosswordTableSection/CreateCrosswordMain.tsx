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
    console.log(e.currentTarget.dataset.fieldid);
    dispatch(crosswordActions.setHighlightedField(e.currentTarget.dataset.fieldid));
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

  const cretedCrosswordTableEl = createdCrosswordTable.map((row: any, i: number) => {
    return (
      <div className=" flex gap-1 mb-1" key={i}>
        {row.map((cell: any, j: number) => {
          return (
            <div
              onClick={callContextMenuHandler}
              data-fieldid={`${i}:${j}`}
              key={`${i}:${j}`}
              className={` ${highlightedElId === `${i}:${j}` ? " bg-lime-600" : ""}  flex gap-1 items-center justify-center h-10 w-10 border-solid border-2 border-indigo-600`}
            >
              <p></p>
            </div>
          );
        })}
      </div>
    );
  });
  const createCrosswordTableHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
          Размерность кроссвордв <span>{cretedCrosswordValue}</span>
        </p>
      </div>

      {showContextMenu && <CreateCrosswordContextMenu></CreateCrosswordContextMenu>}

      {/* <div className={` w-[${cretedCrosswordValue * 39.5}px] pt-5 pb-5`}>
        <div className={`grid ${`grid-cols-${cretedCrosswordValue}`} gap-1`}> */}
      <div className={` min-w-max pt-5 pb-5 flex-col gap-1`}>{cretedCrosswordTableEl}</div>

      {/* </div>
      </div> */}
    </div>
  );
};

export default CreateCrosswordMain;
