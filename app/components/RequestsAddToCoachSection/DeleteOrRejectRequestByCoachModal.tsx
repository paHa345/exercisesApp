import { AppDispatch } from "@/app/store";
import {
  ICoachSlice,
  coachActions,
  rejectOrDeleteRequestByCoachAndUpdateState,
} from "@/app/store/coachSlice";
import { IUserSlice } from "@/app/store/userSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const DeleteOrRejectRequestByCoachModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const deleteOrRejectRequestByCoachStatus = useSelector(
    (state: ICoachSlice) => state.coachState.rejectOrDeleteRequestByCoachStatus
  );

  const rejectOrDeleteRequestByCoachErrorMessage = useSelector(
    (state: ICoachSlice) => state.coachState.rejectOrDeleteRequestByCoachErrorMessage
  );

  const rejectingOrdeletingRequest = useSelector(
    (state: IUserSlice) => state.userState.rejectingOrDeletingByCoachRequest
  );

  const stopDeletingRequestHandler = () => {
    dispatch(coachActions.setDeletingRequestToFalse());
  };

  const deleteOrRejectRequestByCoachHandler = () => {
    console.log("Delete");
    if (rejectingOrdeletingRequest !== null) {
      dispatch(rejectOrDeleteRequestByCoachAndUpdateState(rejectingOrdeletingRequest));
    }
  };

  return (
    <div className="modal-overlay">
      <div className=" delete-modal-wrapper">
        <div className="modal">
          <div className="delete-modal-header">
            <h1>{`Удалить запрос`}</h1>
          </div>
          <div className=" flex flex-col sm:flex-row justify-center gap-5 ">
            {deleteOrRejectRequestByCoachStatus === "loading" && (
              <button disabled={true} className="buttonStandartDesabled">
                Удалить запрос
              </button>
            )}
            {deleteOrRejectRequestByCoachStatus !== "loading" && (
              <button onClick={deleteOrRejectRequestByCoachHandler} className=" buttonStandart">
                Удалить запрос{" "}
              </button>
            )}

            <button className="delete-buttonStandart" onClick={stopDeletingRequestHandler}>
              Отмена
            </button>
          </div>
          <div className=" py-4">
            {deleteOrRejectRequestByCoachStatus === "loading" && (
              <h1 className=" text-center px-3 rounded-md py-3 bg-cyan-200">Удаление запроса</h1>
            )}
            {deleteOrRejectRequestByCoachStatus === "resolve" && (
              <h1 className=" text-center rounded-md   px-3 py-3 bg-green-200">
                Запрос успешно удалён
              </h1>
            )}
            {deleteOrRejectRequestByCoachStatus === "error" && (
              <h1 className=" text-center rounded-md   px-3 py-3 bg-rose-500">
                Ошибка удаления. Повторите попытку позже {rejectOrDeleteRequestByCoachErrorMessage}
              </h1>
            )}
          </div>

          <div className="modal-body"></div>
        </div>
      </div>
    </div>
  );
};

export default DeleteOrRejectRequestByCoachModal;
