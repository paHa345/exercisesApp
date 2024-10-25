import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faCircleCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { changeCompleteExerciseStatus, IAddWorkoutSlice } from "@/app/store/addWorkoutSlice";
import { IUserSlice, userActions } from "@/app/store/userSlice";
import { AppDispatch } from "@/app/store";

interface ICompleteExercoseButtonProps {
  isCompletedArr?:
    | [
        {
          studentId?: string;
          isCompleted?: boolean;
        },
      ]
    | undefined
    | [];
  workoutId: string;
  exerciseId: string;
  currentStudentId: string;
}

const CompleteExerciseButtonCoach = ({
  isCompletedArr,
  currentStudentId,
  workoutId,
  exerciseId,
}: ICompleteExercoseButtonProps) => {
  //   const fetchChangeCompleteExerciseStatus = useSelector(
  //     (state: IAddWorkoutSlice) => state.addWorkoutState.changeCompleteExerciseStatus
  //   );

  const changedWorkoutId = useSelector(
    (state: IUserSlice) => state.userState.currentUser.changedExerciseWorkoutId
  );

  const [fetchDataStatus, setFetchDataStatus] = useState("Pending");

  const currentStudentCompleteObj = isCompletedArr?.find((el) => {
    return el.studentId === currentStudentId;
  });

  const currentUserId = useSelector((state: IUserSlice) => state.userState.currentUser.id);

  const dispatch = useDispatch<AppDispatch>();

  const changeCompleteExerciseHandler = async function (
    this: { isCompleted: boolean | undefined; exerciseId: string },
    e: React.MouseEvent<HTMLAnchorElement>
  ) {
    e.preventDefault();
    const exerciseId = this.exerciseId;
    const isCompleted = this.isCompleted;

    dispatch(userActions.setChangedExerciseWorkoutId(workoutId));

    setFetchDataStatus(() => {
      return "loading";
    });
    //если этот массив пустой, то значит что
    // ученики не добавили отметки об выполнении

    if (currentStudentCompleteObj?.isCompleted !== undefined || isCompletedArr) {
      const isCompleted =
        currentStudentCompleteObj?.isCompleted === undefined
          ? false
          : currentStudentCompleteObj?.isCompleted;
      await dispatch(
        changeCompleteExerciseStatus({
          workoutId: workoutId,
          exerciseId: exerciseId,
          isCompleted: isCompleted,
          currentUserId: currentUserId,
        })
      );
    }

    setFetchDataStatus(() => {
      return "pending";
    });
  };

  const checkedEl =
    currentStudentCompleteObj?.isCompleted && isCompletedArr !== undefined ? (
      <div>
        <FontAwesomeIcon className="fa-2x " icon={faCircleCheck} />
      </div>
    ) : (
      <div>
        <FontAwesomeIcon className="fa-2x " icon={faCircle} />
      </div>
    );

  const buttonEl =
    fetchDataStatus === "loading" && workoutId === changedWorkoutId ? (
      <div className=" animate-spin">
        <FontAwesomeIcon className="fa-2x " icon={faSpinner} />
      </div>
    ) : (
      <div>
        {isCompletedArr !== undefined && (
          <div>
            {" "}
            <div
            //   onClick={changeCompleteExerciseHandler.bind({
            //     isCompleted: currentStudentCompleteObj?.isCompleted,
            //     exerciseId: exerciseId,
            //   })}
            >
              {checkedEl}
            </div>
          </div>
        )}
      </div>
    );
  return <div>{buttonEl}</div>;
};

export default CompleteExerciseButtonCoach;
