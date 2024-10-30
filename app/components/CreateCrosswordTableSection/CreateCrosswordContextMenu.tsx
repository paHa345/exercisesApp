import { AppDispatch } from "@/app/store";
import { crosswordActions, ICrosswordSlice } from "@/app/store/crosswordSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateCrosswordContextMenu = () => {
  const dispatch = useDispatch<AppDispatch>();

  const createContextMenuConstant = [
    { name: "Добавить номер", handler: "addNumberHandler" },
    { name: "По горизонтали", handler: "addHorizontHandler" },
    { name: "По вертикали", handler: "addVerticalHandler" },
  ];
  const positionX = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.createContextMenuXPosition
  );
  const positionY = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.createContextMenuYPosition
  );

  const createdCrossword = useSelector(
    (state: ICrosswordSlice) => state.crosswordState.createdCrossword
  );

  const contextMenuActionHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const actionName = e.currentTarget.dataset.actionhandler;
    if (actionName === "addNumberHandler") {
      //   console.log(createdCrossword);
      //   dispatch(
      //     crosswordActions.addNumberAndText({
      //       row: e.currentTarget.dataset.row,
      //       number: e.currentTarget.dataset.number,
      //     })
      //   );
      dispatch(crosswordActions.setCreateContextMenuStatusFalse());
      dispatch(crosswordActions.showSetNumberModal());
    }
  };

  const hideMenuHandler = () => {
    dispatch(crosswordActions.setHighlightedField(""));
    dispatch(crosswordActions.setCreateContextMenuStatusFalse());
  };

  return (
    <div
      className=" rounded-lg  bg-slate-700 text-slate-200 shadow-lg border-solid border-2"
      style={{ position: "absolute", left: `${positionX}px`, top: `${positionY}px` }}
    >
      <div onClick={hideMenuHandler} className=" mt-2 mr-2 flex justify-end">
        <div className=" cursor-pointer  flex justify-center items-center w-8 h-8 rounded-full p-2 border-2 pb-2 hover:bg-slate-500">
          <p>x</p>
        </div>
      </div>

      <div className=" rounded-lg p-4 flex flex-col w-fit ">
        {createContextMenuConstant.map((el, index) => {
          return (
            <div
              onClick={contextMenuActionHandler}
              data-actionhandler={el.handler}
              key={el.name}
              className=" cursor-pointer flex justify-center items-center rounded-sm p-2 border-b-2 pb-2 hover:bg-slate-500"
            >
              {el.name}
            </div>
          );
        })}
        {/* <div className=" rounded-sm p-2 border-b-2 pb-2 hover:bg-slate-500">Добавить номер</div>
        <div className=" rounded-sm p-2 border-b-2 pb-2 hover:bg-slate-500">По горизонтали</div>
        <div className=" rounded-sm p-2 border-b-2 pb-2 hover:bg-slate-500">По вертикали</div> */}
      </div>
    </div>
  );
};

export default CreateCrosswordContextMenu;
