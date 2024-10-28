"use client";
import { AppDispatch } from "@/app/store";
import { crosswordActions, ICrosswordSlice } from "@/app/store/crosswordSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateCrosswordMain = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [CrosswordTableEl, setCrosswordTableEl] = useState([]);
  const cretedCrosswordValue = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.crosswordValue
  );

  const [crosswordValue, setCrosswordValue] = useState(10);
  //   const [cretedCrosswordValue, setCretedCrosswordValue] = useState(10);
  const changeCrosswordValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.currentTarget);
    setCrosswordValue(Number(e.currentTarget.value));
  };

  const createCrosswordTableHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(crosswordActions.setCrosswordValue(crosswordValue));
    console.log("create");
    const el: any = [];
    for (let i = 0; i < crosswordValue; i++) {
      for (let j = 0; j < crosswordValue; j++) {
        el.push(
          <div
            key={`${i}:${j}`}
            data-indexi={i}
            data-indexj={j}
            className=" flex items-center justify-center h-10 w-10 border-solid border-2 border-indigo-600"
          >
            {/* {`${i}:${j}`} */}
          </div>
        );
      }
    }
    setCrosswordTableEl(el);

    // setCretedCrosswordValue(crosswordValue);

    console.log(CrosswordTableEl);
  };

  return (
    <div>
      <div>
        <p>Укажите размер кроссворда</p>
        <input type="number" value={crosswordValue} onChange={changeCrosswordValueHandler} />
        <button onClick={createCrosswordTableHandler}>Создать поле кроссворда</button>
      </div>
      <div className={` w-[${cretedCrosswordValue * 39.5}px] pt-5 pb-5`}>
        <div className={`grid ${`grid-cols-${cretedCrosswordValue}`} gap-1`}>
          {CrosswordTableEl}
        </div>
      </div>
    </div>
  );
};

export default CreateCrosswordMain;
