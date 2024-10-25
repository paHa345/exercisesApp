import { IExercise, IWorkout } from "@/app/types";
import Link from "next/link";
import React, { useState } from "react";
import Exercise from "./WorkoutExercise";
import { useDispatch, useSelector } from "react-redux";
import { IUserSlice } from "@/app/store/userSlice";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppDispatch } from "@/app/store";
import {
  addWorkoutActions,
  addWorkoutFetchStatus,
  changeCompleteExerciseStatus,
  IAddWorkoutSlice,
} from "@/app/store/addWorkoutSlice";
import WorkoutExercise from "./WorkoutExercise";
import StudentsList from "./StudentsList";

interface TrainPropsInterface {
  workout: IWorkout;
}

const Train = ({ workout }: TrainPropsInterface) => {
  const workoutDate = new Date(workout.date).toLocaleString("ru-RU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const [currentStudent, setCurrentStudent] = useState(workout.studentsIdArr[0]?._id);

  const changeCurrentStudentHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.currentTarget.dataset.studentid) {
      setCurrentStudent(e.currentTarget.dataset.studentid);
    }
  };

  const currentUserType = useSelector((state: IUserSlice) => state.userState.currentUser.userType);

  const coachEmail = typeof workout.userId === "object" ? workout.userId.email : "";

  const exercisesEl = workout.exercisesArr.map((exercise, index: number) => {
    return (
      <div key={`${exercise.exerciseId}_${index}`}>
        <WorkoutExercise
          currentStudentId={currentStudent}
          exercise={exercise}
          index={index}
          workoutId={workout._id}
        ></WorkoutExercise>
      </div>
    );
  });

  return (
    <article className=" transition-shadow px-5 py-5 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-sm shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
      {currentUserType === "coach" ? (
        <div>
          <h1>Подопечные:</h1>
          <div>
            <StudentsList
              changeCurrentStudentHandler={changeCurrentStudentHandler}
              studentsArr={workout.studentsIdArr}
              currentStudent={currentStudent}
            ></StudentsList>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <h1>Тренер</h1>
          <div>
            {" "}
            <h1>{coachEmail}</h1>{" "}
          </div>
        </div>
      )}

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
