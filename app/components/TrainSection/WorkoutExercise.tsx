import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { faCircleCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { changeCompleteExerciseStatus, IAddWorkoutSlice } from "@/app/store/addWorkoutSlice";
import { AppDispatch } from "@/app/store";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { IUserSlice } from "@/app/store/userSlice";
import CompleteExerciseButtonStudent from "./CompleteExerciseButtonStudent";
import CompleteExerciseButtonCoach from "./CompleteexerciseButtonCoach";

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
    isCompletedArr?: [{ studentId?: string; isCompleted?: boolean }] | [];
  };
  index: number;
  workoutId: string;
  currentStudentId: string;
}

const WorkoutExercise = ({
  exercise,
  index,
  workoutId,
  currentStudentId,
}: IWorkoutExerciseProps) => {
  const fetchChangeCompleteExerciseStatus = useSelector(
    (state: IAddWorkoutSlice) => state.addWorkoutState.changeCompleteExerciseStatus
  );

  const changedWorkoutId = useSelector(
    (state: IUserSlice) => state.userState.currentUser.changedExerciseWorkoutId
  );

  const userType = useSelector((state: IUserSlice) => state.userState.currentUser.userType);

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

          {userType === "user" && (
            <CompleteExerciseButtonStudent
              isCompletedArr={exercise.isCompletedArr}
              workoutId={workoutId}
              exerciseId={exercise.exerciseId}
              currentStudentId={currentStudentId}
            ></CompleteExerciseButtonStudent>
          )}
          {userType === "coach" && (
            <CompleteExerciseButtonCoach
              isCompletedArr={exercise.isCompletedArr}
              workoutId={workoutId}
              exerciseId={exercise.exerciseId}
              currentStudentId={currentStudentId}
            ></CompleteExerciseButtonCoach>
          )}
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
