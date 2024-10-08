import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { faCircleCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { changeCompleteExerciseStatus, IAddWorkoutSlice } from "@/app/store/addWorkoutSlice";
import { AppDispatch } from "@/app/store";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { IUserSlice } from "@/app/store/userSlice";
import CompleteExerciseButton from "./CompleteExerciseButton";

interface IWorkoutExerciseProps {
  exercise: {
    name: string;
    exercise: {
      id: string;
      name: string;
      _id: string;
    };
    exerciseId: string;
    reps: number;
    sets: number;
    isCompleted?: boolean;
  };
  index: number;
  workoutId: string;
}

const WorkoutExercise = ({ exercise, index, workoutId }: IWorkoutExerciseProps) => {
  const fetchChangeCompleteExerciseStatus = useSelector(
    (state: IAddWorkoutSlice) => state.addWorkoutState.changeCompleteExerciseStatus
  );

  const changedWorkoutId = useSelector(
    (state: IUserSlice) => state.userState.currentUser.changedExerciseWorkoutId
  );

  const [fetchDataStatus, setFetchDataStatus] = useState("Pending");

  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   if (workoutId === changedWorkoutId) {
  //     setFetchDataStatus(fetchChangeCompleteExerciseStatus);
  //   }
  // }, [fetchChangeCompleteExerciseStatus]);

  return (
    <div>
      {exercise.exercise ? (
        <div className=" flex flex-row gap-3 items-center" data-exerciseid={exercise.exercise?._id}>
          <p>{index + 1}</p>
          <Link className=" hover:underline" href={`./catalog/${exercise.exercise?._id}`}>
            <p>{exercise.exercise?.name}</p>
          </Link>
          <p>
            {exercise.sets} X {exercise.reps}
          </p>

          <CompleteExerciseButton
            isCompleted={exercise.isCompleted}
            workoutId={workoutId}
            exerciseId={exercise.exerciseId}
          ></CompleteExerciseButton>
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
};

export default WorkoutExercise;
