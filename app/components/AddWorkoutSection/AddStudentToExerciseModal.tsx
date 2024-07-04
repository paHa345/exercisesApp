import { AppDispatch } from "@/app/store";
import { IAddWorkoutSlice, addWorkoutActions } from "@/app/store/addWorkoutSlice";
import { ICoachSlice } from "@/app/store/coachSlice";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const AddStudentToWorkoutModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentCoachStudents = useSelector(
    (state: ICoachSlice) => state.coachState.currentCoachStudents
  );

  const addedStudentsarr = useSelector(
    (state: IAddWorkoutSlice) => state.addWorkoutState.addedUsers
  );

  const addStudentHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.dataset.studentid && e.currentTarget.textContent) {
      dispatch(
        addWorkoutActions.addStudentInAddedStudents({
          id: e.currentTarget.dataset.studentid,
          name: e.currentTarget.textContent,
        })
      );
    }
  };

  const deleteStudentHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.currentTarget.dataset.studentid) {
      dispatch(
        addWorkoutActions.deleteStudentFromAddedStudentsArr(e.currentTarget.dataset.studentid)
      );
    }
  };
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

  const studentsEl = currentCoachStudents?.map((student) => {
    return (
      <div
        className=" bg-amber-100 px-2 py-2 rounded-md cursor-pointer hover:bg-red-200"
        onClick={addStudentHandler}
        data-studentid={student.studentsArr.studentId._id}
        key={student._id}
      >
        {student.studentsArr.studentId.name}
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

export default AddStudentToWorkoutModal;
