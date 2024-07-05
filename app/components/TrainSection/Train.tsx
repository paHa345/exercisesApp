import { IExercise, IWorkout } from "@/app/types";
import Link from "next/link";
import React from "react";
import Exercise from "./Exercise";
import { useSelector } from "react-redux";
import { IUserSlice } from "@/app/store/userSlice";

interface TrainPropsInterface {
  workout: IWorkout;
}

const Train = ({ workout }: TrainPropsInterface) => {
  const workoutDate = new Date(workout.date).toLocaleString("ru-RU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const currentUserType = useSelector((state: IUserSlice) => state.userState.currentUser);

  console.log(currentUserType);
  const studentsEl = workout.studentsIdArr.map((student) => {
    return (
      <div key={student._id}>
        <Link href={`/`}>{student.name}</Link>
      </div>
    );
  });

  const exercisesEl = workout.exercisesArr.map((exercise, index: number) => {
    return (
      <div key={`${exercise.exerciseId}_${index}`}>
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
          <div className=" flex flex-row gap-3" data-exerciseid={exercise.exerciseId}>
            <p>{index + 1}</p>
            <p>{`${exercise.name} (архивное)`}</p>

            <p>
              {exercise.sets} X {exercise.reps}
            </p>
          </div>
        )}
      </div>
    );
  });

  return (
    <article className=" transition-shadow px-5 py-5 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-sm shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
      <div>
        <h1>Подопечные:</h1>
        <div className=" flex gap-2 my-2">{studentsEl}</div>
      </div>
      <div className=" flex flex-col gap-6">
        <div className=" flex flex-row justify-between ">
          <div>
            <h1 className=" text-xl font-bold">{workout.name}</h1>
          </div>
          <div> {workoutDate}</div>
        </div>
        <div className=" flex flex-col gap-4">{exercisesEl}</div>
        <div>
          <h1>Комментарии</h1>
          <p className=" text-sm pt-2">{workout.comments}</p>
        </div>
      </div>
    </article>
  );
};

export default Train;
