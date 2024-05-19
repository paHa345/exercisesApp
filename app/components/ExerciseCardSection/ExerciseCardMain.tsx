"use client";
import Image from "next/image";
import React, { useEffect } from "react";

import { useState } from "react";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import { IExercise } from "../../types";
import Reviews from "./Reviews";
import { useDispatch, useSelector } from "react-redux";
import { ICurrentExerciseSlice, currentExrciseActions } from "@/app/store/currentExerciseSlice";
import { getSession, useSession } from "next-auth/react";

const ExerciseCardMain = ({
  id,
  type,
  _id,
  name,
  image,
  isBest,
  raiting,
  video,
  description,
  muscleGroups,
  mainGroup,
  mainGroupRu,
  comments,
  avgUsersRaiting,
}: IExercise) => {
  const imageName = image || "";

  const muscleGroupsEl = muscleGroups?.map((el) => {
    return (
      <li key={el} className=" list-none pl-9">
        {el}
      </li>
    );
  });

  const deleteReviewStatus = useSelector(
    (state: ICurrentExerciseSlice) => state.currentExerciseState.deleteReviewStatus
  );

  const session = useSession();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentExrciseActions.setCurrentExercise(comments));
  }, []);

  useEffect(() => {
    if (deleteReviewStatus === "resolve") {
      setTimeout(() => {
        dispatch(currentExrciseActions.setDeleteReviewStatusToReady());
      }, 5000);
      return () => {
        dispatch(currentExrciseActions.setDeleteReviewStatusToReady());
      };
    }
  }, [deleteReviewStatus]);

  return (
    <div className=" py-7">
      <div>
        <h1 className=" text-center text-2xl font-bold pb-6">{name}</h1>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div className=" w-4/5 justify-self-center pb-5">
          {imageName.startsWith("https://") ? (
            <img src={imageName} alt={imageName} />
          ) : (
            <Image
              className=" w-full"
              src={imageName}
              alt={imageName}
              width={200}
              height={200}
            ></Image>
          )}
        </div>
        <div className=" self-center">
          <div className=" flex items-center justify-around">
            <div className=" flex gap-5 flex-col md:flex-row">
              {type === "base" ? (
                <p className="  bg-baseColour py-1 px-2 rounded-md">Базовое</p>
              ) : (
                <p className=" bg-isolatedColour py-1 px-2 rounded-md text-slate-50">
                  Изолированное
                </p>
              )}
              <p className=" text-center   bg-mainGroupColour py-1 px-2 rounded-md">
                {mainGroupRu}
              </p>
            </div>
            <div className="flex flex-col">
              <div className="">
                Рейтинг: <span className=" text-lg font-bold">{raiting}</span>
              </div>
              {avgUsersRaiting ? (
                <div className="">
                  Средний рейтинг пользователей:{" "}
                  <span className=" text-lg font-bold">{avgUsersRaiting}</span>
                </div>
              ) : (
                <div className="">
                  Средний рейтинг пользователей:{" "}
                  <span className=" text-lg font-bold">Нет оценок</span>
                </div>
              )}
            </div>
          </div>

          <div className=" text-xl leading-7">
            <ul className=" text-center font-bold pt-7 pb-4"> Мышечные группы</ul>

            {muscleGroupsEl}
          </div>
        </div>
        <div>
          <div className=" flex w-full justify-center self-center">
            <iframe
              width="560"
              height="315"
              src={video}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div>
          <div>
            <h2 className=" text-center font-bold text-xl my-6">Описание</h2>
            <p className=" whitespace-pre-line">{description}</p>
          </div>
        </div>
        <div>
          <div></div>
          {session.data ? (
            <ReviewForm></ReviewForm>
          ) : (
            <div className=" text-center py-6">
              Войдите под своими учётными данными для добавления отзыва
            </div>
          )}
        </div>
        <div className=" ">
          <h1 className=" text-center font-bold text-xl pb-3">Оценки</h1>
          <Reviews></Reviews>
        </div>
      </div>
      {deleteReviewStatus === "resolve" && (
        <div className=" my-auto flex justify-center">
          <h1 className=" text-center rounded-md   px-3 py-3 bg-green-200 fixed top-5">
            Ваша оценка успешно удалена
          </h1>
        </div>
      )}
    </div>
  );
};

export default ExerciseCardMain;
