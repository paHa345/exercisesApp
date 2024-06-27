import { AppDispatch } from "@/app/store";
import { coachActions } from "@/app/store/coachSlice";
import React from "react";
import { useDispatch } from "react-redux";

const DeleteOrRejectRequestByCoachModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const stopDeletingRequestHandler = () => {
    dispatch(coachActions.setDeletingRequestToFalse());
  };
  return (
    <div className="modal-overlay">
      <div className=" delete-modal-wrapper">
        <div className="modal">
          <div className="delete-modal-header">
            <h1>{`Удалить запрос`}</h1>
          </div>
          <div className=" flex flex-col sm:flex-row justify-center gap-5 ">
            {/* {deleteRequestByUserStatus === "loading" && (
            <button disabled={true} className="buttonStandartDesabled">
              Удалить запрос
            </button>
          )}
          {deleteRequestByUserStatus !== "loading" && (
            <button onClick={deleteRequestHandler} className=" buttonStandart">
              Удалить запрос{" "}
            </button>
          )} */}

            <button className="delete-buttonStandart" onClick={stopDeletingRequestHandler}>
              Отмена
            </button>
          </div>
          <div className=" py-4">
            {/* {deleteRequestByUserStatus === "loading" && (
            <h1 className=" text-center px-3 rounded-md py-3 bg-cyan-200">Удаление запроса</h1>
          )}
          {deleteRequestByUserStatus === "resolve" && (
            <h1 className=" text-center rounded-md   px-3 py-3 bg-green-200">
              Запрос успешно удалён
            </h1>
          )}
          {deleteRequestByUserStatus === "error" && (
            <h1 className=" text-center rounded-md   px-3 py-3 bg-rose-500">
              Ошибка удаления. Повторите попытку позже {deleteRequestByUserErrorMessage}
            </h1>
          )} */}
          </div>

          <div className="modal-body"></div>
        </div>
      </div>
    </div>
  );
};

export default DeleteOrRejectRequestByCoachModal;
