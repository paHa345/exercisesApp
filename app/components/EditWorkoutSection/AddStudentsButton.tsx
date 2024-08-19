import { AppDispatch } from "@/app/store";
import { addWorkoutActions, IAddWorkoutSlice } from "@/app/store/addWorkoutSlice";
import {
  coachFetchStatus,
  getCurrentCoachStudentsAndSetInState,
  ICoachSlice,
} from "@/app/store/coachSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddStudentToEditedWorkoutModal from "./AddStudentToEditedWorkoutModal";

const AddStudentsButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  const addedStudentsarr = useSelector(
    (state: IAddWorkoutSlice) => state.addWorkoutState.addedUsers
  );

  const showAddStudentsModal = useSelector(
    (state: IAddWorkoutSlice) => state.addWorkoutState.showAddStudentsToWorkoutModal
  );

  const getStudentsNotification = useSelector(
    (state: ICoachSlice) => state.coachState.fetchCurrentCoachStudentsStatus
  );

  const showAddStudentsModalHandler = () => {
    dispatch(addWorkoutActions.showHideAddStudentsToWorkoutModal(true));
  };

  useEffect(() => {
    dispatch(getCurrentCoachStudentsAndSetInState());
  }, []);

  return (
    <>
      {showAddStudentsModal && <AddStudentToEditedWorkoutModal></AddStudentToEditedWorkoutModal>}
      {!showAddStudentsModal && (
        <div className=" flex flex-col justify-center my-4">
          <h1 className=" mx-auto py-3"> Выберете подопечных </h1>
          {getStudentsNotification === coachFetchStatus.Loading && (
            <div className=" animate-pulse   py-4 rounded-md px-2 bg-emerald-100 hover:bg-emerald-400 hover:text-white text-2xl "></div>
          )}
          {getStudentsNotification !== coachFetchStatus.Loading && (
            <button
              className=" py-4 rounded-md px-2 bg-emerald-100 hover:bg-emerald-400 hover:text-white text-2xl "
              onClick={showAddStudentsModalHandler}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default AddStudentsButton;
