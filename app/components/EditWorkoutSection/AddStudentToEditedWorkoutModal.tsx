import React from "react";
import { AppDispatch } from "@/app/store";
import { IAddWorkoutSlice, addWorkoutActions } from "@/app/store/addWorkoutSlice";
import { ICoachSlice } from "@/app/store/coachSlice";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { IUserSlice, userActions } from "@/app/store/userSlice";

const AddStudentToEditedWorkoutModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentCoachStudents = useSelector(
    (state: ICoachSlice) => state.coachState.currentCoachStudents
  );

  const addedStudentsarr = useSelector(
    (state: IUserSlice) => state.userState.currentUser.editedWorkout.studentsIdArr
  );

  const addStudentHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.dataset.studentid && e.currentTarget.textContent) {
      const currentStudent = currentCoachStudents.find(
        (student) => String(e.currentTarget.dataset.studentid) === student.studentsArr.studentId._id
      );
      console.log(currentStudent?.studentsArr.studentId);
      console.log(currentCoachStudents);
      if (currentStudent?.studentsArr.studentId) {
        dispatch(userActions.addUserToUpdetedWorkout(currentStudent.studentsArr.studentId));
      }
    }
  };

  const deleteStudentHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // по id находим в editedWorkout пользователя и удаляем его из массива
    // с помощью dispatch  в  userSlice
    if (e.currentTarget.dataset.studentid) {
      // dispatch(
      //   addWorkoutActions.deleteStudentFromAddedStudentsArr(e.currentTarget.dataset.studentid)
      // );
      dispatch(userActions.deleteUserFromUpdatedWorkout(e.currentTarget.dataset.studentid));
    }
  };

  const addedStudentsEl = addedStudentsarr.map((student) => {
    return (
      <div key={student._id}>
        <div
          className=" rounded-md w-fit bg-neutral-400 flex gap-3 px-2 py-2 mx-2 my-2"
          data-studwntid={student._id}
          key={student._id}
        >
          <p>{student.name}</p>
          <button
            className="  hover:font-bold"
            data-studentid={student._id}
            onClick={deleteStudentHandler}
          >
            X
          </button>
        </div>
      </div>
    );
  });

  const studentsEl = currentCoachStudents?.map((student) => {
    return (
      <div key={student.studentsArr.studentId._id}>
        <div
          className=" bg-amber-100 px-2 py-2 rounded-md cursor-pointer hover:bg-red-200"
          onClick={addStudentHandler}
          data-studentid={student.studentsArr.studentId._id}
          key={student._id}
        >
          {student.studentsArr.studentId.name}
        </div>
      </div>
    );
  });
  const hideAddStudentsModalHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    dispatch(addWorkoutActions.showHideAddStudentsToWorkoutModal(false));
  };
  return (
    <div className="modal-overlay">
      <div className=" modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <a
              className=" bg hover:bg-slate-400 px-2 py-1 rounded-full  hover:border-slate-400 border-solid border-2  border-slate-200"
              onClick={hideAddStudentsModalHandler}
              href=""
            >
              <FontAwesomeIcon icon={faXmark} />
            </a>
          </div>
          <div className=" overflow-auto h-2/6">
            <div>
              <p> Добавлено подопечных</p>
            </div>
            <div className=" flex items-center">{addedStudentsEl}</div>
            <div className=" flex justify-center ">
              <p>Список подопечных</p>
            </div>
            <div className=" flex items-center">{studentsEl}</div>
          </div>

          <div className="modal-body"></div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentToEditedWorkoutModal;
