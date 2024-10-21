import { editExerciseRevalidateServerAction } from "@/actions/editExercise";
import { AppDispatch } from "@/app/store";
import {
  ICurrentExerciseSlice,
  currentExrciseActions,
  deleteReview,
} from "@/app/store/currentExerciseSlice";
import { useParams, useRouter } from "next/navigation";
import React, { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

const DeleteReviewModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  const reviewId = useSelector(
    (state: ICurrentExerciseSlice) => state.currentExerciseState.currentReviewDeleteId
  );

  const deleteReviewStatus = useSelector(
    (state: ICurrentExerciseSlice) => state.currentExerciseState.deleteReviewStatus
  );

  const deleteReviewHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(
      deleteReview({
        exerciseId: params?.exerciseId,
        reviewId: reviewId,
      })
    );
    // editExerciseRevalidateServerAction(params?.exerciseId);
  };

  const stopDeleteReview = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(currentExrciseActions.stopDeleteReview());
  };

  return (
    <div className="modal-overlay">
      <div className=" delete-modal-wrapper">
        <div className="modal">
          <div className="delete-modal-header">
            <h1>{`Удалить комментарий`}</h1>
          </div>
          <div className=" flex flex-col sm:flex-row justify-center gap-5 ">
            <button onClick={deleteReviewHandler} className=" buttonStandart">
              Удалить комментарий{" "}
            </button>
            <button className="delete-buttonStandart" onClick={stopDeleteReview}>
              Отмена
            </button>
          </div>
          <div className=" py-2">
            {deleteReviewStatus === "loading" && (
              <h1 className=" text-center px-3 rounded-md py-3 bg-cyan-200">
                Удаление вашей оценки
              </h1>
            )}

            {deleteReviewStatus === "error" && (
              <h1 className=" text-center rounded-md   px-3 py-3 bg-rose-500">
                Ошибка удаления. Повторите попытку позже
              </h1>
            )}
          </div>

          <div className="modal-body"></div>
        </div>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
