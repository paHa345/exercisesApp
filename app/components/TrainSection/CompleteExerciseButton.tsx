import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faCircleCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { changeCompleteExerciseStatus, IAddWorkoutSlice } from "@/app/store/addWorkoutSlice";
import { IUserSlice, userActions } from "@/app/store/userSlice";
import { AppDispatch } from "@/app/store";

interface ICompleteExercoseButtonProps {
  isCompleted: boolean | undefined;
  workoutId: string;
  exerciseId: string;
}

const CompleteExerciseButton = ({
  isCompleted,
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

  const dispatch = useDispatch<AppDispatch>();

  const changeCompleteExerciseHandler = async function (
    this: { isCompleted: boolean; exerciseId: string },
    e: React.MouseEvent<HTMLAnchorElement>
  ) {
    e.preventDefault();
    const exerciseId = this.exerciseId;
    const isCompleted = this.isCompleted;

    dispatch(userActions.setChangedExerciseWorkoutId(workoutId));

    setFetchDataStatus(() => {
      return "loading";
    });

    await dispatch(
      changeCompleteExerciseStatus({
        workoutId: workoutId,
        exerciseId: exerciseId,
        isCompleted: isCompleted,
        // setState: setHandler,
      })
    );
    setFetchDataStatus(() => {
      return "pending";
    });
  };

  const checkedEl =
    isCompleted && isCompleted !== undefined ? (
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
        {isCompleted !== undefined && (
          <div>
            {" "}
            <a
              href=""
              onClick={changeCompleteExerciseHandler.bind({
                isCompleted: isCompleted,
                exerciseId: exerciseId,
              })}
            >
              {checkedEl}
            </a>
          </div>
        )}
      </div>
    );
  return <div>{buttonEl}</div>;
};

export default CompleteExerciseButton;
