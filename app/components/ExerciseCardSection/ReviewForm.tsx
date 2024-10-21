"use client";
import { editExerciseRevalidateServerAction } from "@/actions/editExercise";
import { AppDispatch } from "@/app/store";
import { addExerciseAndImage } from "@/app/store/addExerciseSlice";
import {
  ICurrentExerciseSlice,
  addReviewAndUploadToDatabase,
  currentExrciseActions,
} from "@/app/store/currentExerciseSlice";
import { IUserSlice } from "@/app/store/userSlice";
import { IExercise } from "@/app/types";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ReviewForm = () => {
  const [onFocusStatus, setInFocusStatus] = useState({
    review: false,
  });

  const session = useSession();

  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const [reviewValue, setReviewValue] = useState("");
  const [reviewScore, setReviewScore] = useState(0);

  const addReviewStatus = useSelector(
    (state: ICurrentExerciseSlice) => state.currentExerciseState.addReviewStatus
  );

  const currentExerciseUserReview = useSelector(
    (state: ICurrentExerciseSlice) => state.currentExerciseState.currentExerciseUserReview
  );
  const selectMuscleGroupHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReviewScore(Number(e.target.value));
  };

  const changeLoginHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setReviewValue(e.currentTarget.value);
  };

  const focusElHandler = (e: React.FocusEvent<HTMLElement>) => {
    setInFocusStatus({ ...onFocusStatus, [e.target.id]: true });
  };

  const focusOutElHandler = (e: React.FocusEvent<HTMLElement>) => {
    setInFocusStatus({ ...onFocusStatus, [e.target.id]: false });
  };

  const addReviewHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ text: reviewValue, score: reviewScore, exerciseId: params?.exerciseId });
    await dispatch(
      addReviewAndUploadToDatabase({
        text: reviewValue,
        score: reviewScore,
        exerciseId: params?.exerciseId,
      })
    );
    editExerciseRevalidateServerAction(params?.exerciseId);
  };

  useEffect(() => {
    if (addReviewStatus === "resolve") {
      setTimeout(() => {
        dispatch(currentExrciseActions.setAddReviewStatusToReady());
      }, 5000);
      return () => {
        dispatch(currentExrciseActions.setAddReviewStatusToReady());
      };
    }
  }, [addReviewStatus]);

  const getReview = async () => {
    const getCurrentUserexerciseReviewReq = await fetch(
      `/api/users/getCurrentUserExerciseReview/${params?.exerciseId}`
    );
    const getCurrentUserexerciseReview = await getCurrentUserexerciseReviewReq.json();
    dispatch(
      currentExrciseActions.setCurrentExerciseUserReview(
        getCurrentUserexerciseReview.result?.reviewsArr[0]
      )
    );
  };

  useEffect(() => {
    console.log(session.data?.user?.email);

    //set current user rewiews
    getReview();
  }, []);

  return (
    <>
      {currentExerciseUserReview ? (
        <div className=" flex justify-center">
          <h1>Вы уже добавили оценку данного упражнения</h1>
        </div>
      ) : (
        <form
          onSubmit={addReviewHandler}
          action=""
          className=" flex flex-col my-5 px-2 py-2 shadow-cardElementShadow mx-5 border-solid border-2"
        >
          <select
            className=" bg-secoundaryColor w-3/4  py-3 px-4 mx-1 rounded-md shadow-cardElementShadow border-solid border-2"
            onChange={selectMuscleGroupHandler}
            name=""
            id=""
          >
            <option value="0">Оцените упражнение</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <div className=" relative py-4">
            <textarea
              onChange={changeLoginHandler}
              onFocus={focusElHandler}
              onBlur={focusOutElHandler}
              className=" w-11/12 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
              id="review"
              // type="text"
              value={reviewValue}
              cols={40}
              rows={6}
            />
            <span>
              <label
                htmlFor="email"
                className={` absolute transition-all ease-in-out ${
                  onFocusStatus.review || reviewValue.length > 0
                    ? "z-10 top-1 left-0  bg-white   scale-75"
                    : " top-1/3 left-2"
                }`}
              >
                Отзыв
              </label>
            </span>
          </div>
          <button
            type="submit"
            className=" text-slate-50 w-1/3 font-bold shadow-cardElementShadow min-w-max py-2 px-6 rounded bg-buttonColor hover:bg-buttonHoverColor"
          >
            {" "}
            Оценить
          </button>
        </form>
      )}

      {addReviewStatus === "loading" && (
        <div className=" my-auto flex justify-center ">
          <h1 className=" text-center rounded-md   px-3 py-3 bg-cyan-200 fixed top-5">
            Ваша оценка добавляется
          </h1>
        </div>
      )}
      {addReviewStatus === "resolve" && (
        <div className=" my-auto flex justify-center">
          <h1 className=" text-center rounded-md   px-3 py-3 bg-green-200 fixed top-5">
            Ваша оценка успешно добавлена
          </h1>
        </div>
      )}
      {addReviewStatus === "error" && (
        <h1 className=" text-center rounded-md   px-3 py-3 bg-rose-500 fixed top-5">
          Ошибка. Не удалось добавить оценку. Повторите попытку позднее
        </h1>
      )}
    </>
  );
};

export default ReviewForm;
