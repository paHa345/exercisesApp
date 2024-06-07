import { IExercise } from "@/app/types";
import Link from "next/link";
import React from "react";
import Exercise from "./Exercise";

const Train = ({ name, description, date, exercises, workoutid }: any) => {
  const workoutDate = new Date(date).toLocaleString("ru-RU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const exercisesEl = exercises.map(
    (
      exercise: {
        exercise: { id: string; name: string; _id: number };
        name: string;
        reps: number;
        sets: number;
        _id: number;
      },
      index: number
    ) => {
      return (
        <div key={`${exercise._id}_${index}`}>
          {exercise.exercise ? (
            <div className=" flex flex-row gap-3" data-exerciseid={exercise.exercise?._id}>
              <p>{index + 1}</p>
              <Link className=" hover:underline" href={`./catalog/${exercise.exercise?._id}`}>
                <p>{exercise.exercise?.name}</p>
              </Link>
              <p>
                {exercise.sets} X {exercise.reps}
              </p>
            </div>
          ) : (
            <div className=" flex flex-row gap-3" data-exerciseid={exercise._id}>
              <p>{index + 1}</p>
              <p>{`${exercise.name} (архивное)`}</p>

              <p>
                {exercise.sets} X {exercise.reps}
              </p>
            </div>
          )}
        </div>
      );
    }
  );

  return (
    <article className=" transition-shadow px-5 py-5 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-sm shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
      <div className=" flex flex-col gap-6">
        <div className=" flex flex-row justify-between ">
          <div>
            <h1 className=" text-xl font-bold">{name}</h1>
          </div>
          <div> {workoutDate}</div>
        </div>
        <div className=" flex flex-col gap-4">{exercisesEl}</div>
        <div>
          <h1>Комментарии</h1>
          <p className=" text-sm pt-2">{description}</p>
        </div>
      </div>
    </article>
  );
};

export default Train;
