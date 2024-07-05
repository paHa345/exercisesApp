import { AppDispatch } from "@/app/store";
import { IAddWorkoutSlice, addWorkoutActions } from "@/app/store/addWorkoutSlice";
import {
  ICoachSlice,
  coachFetchStatus,
  getCurrentCoachStudentsAndSetInState,
} from "@/app/store/coachSlice";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddStudentToWorkoutModal from "./AddStudentToExerciseModal";

const StudentsList = () => {
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

  const deleteStudentHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.currentTarget.dataset.studentid) {
      dispatch(
        addWorkoutActions.deleteStudentFromAddedStudentsArr(e.currentTarget.dataset.studentid)
      );
    }
  };

  // const addStudentHandler = (e: React.MouseEvent<HTMLOptionElement>) => {
  //   console.log(e.currentTarget.dataset);
  // };

  const addStudentHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const studentId = selectedOption.getAttribute("data-studentid");

    if (studentId !== null && selectedOption.textContent !== null) {
      dispatch(
        addWorkoutActions.addStudentInAddedStudents({
          id: studentId,
          name: selectedOption.textContent,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getCurrentCoachStudentsAndSetInState());
  }, []);

  const addedStudentsEl = addedStudentsarr.map((student) => {
    return (
      <div
        className=" rounded-md w-fit bg-neutral-400 flex gap-3 px-2 py-2 mx-2 my-2"
        data-studwntid={student.id}
        key={student.id}
      >
        <p>{student.name}</p>
        <button
          className="  hover:font-bold"
          data-studentid={student.id}
          onClick={deleteStudentHandler}
        >
          X
        </button>
      </div>
    );
  });

  return (
    <>
      {/* <Suspense fallback="Loading...">
        <div>Выбрать подопечных</div>

        <label htmlFor="student-select">
          <select
            defaultValue={defaultSelectValue}
            onChange={addStudentHandler}
            name="student"
            id="student-select"
          >
            <option value="NOT">Выберите подопечного</option>
            {studentsEl}
          </select>
        </label>

        <div>{addedStudentsEl}</div>
      </Suspense> */}
      {showAddStudentsModal && <AddStudentToWorkoutModal></AddStudentToWorkoutModal>}
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

          <div>{addedStudentsEl}</div>
        </div>
      )}
    </>
  );
};

export default StudentsList;
