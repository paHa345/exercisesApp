import { AppDispatch } from "@/app/store";
import { IUserSlice, userActions } from "@/app/store/userSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import AddStudentsButton from "./AddStudentsButton";

const Students = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentUser = useSelector((state: IUserSlice) => state.userState.currentUser);
  const workoutStudents = useSelector(
    (state: IUserSlice) => state.userState.currentUser.editedWorkout?.studentsIdArr
  );
  console.log(currentUser.userType);

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

  const studentsEl = workoutStudents.map((student) => {
    return (
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
    );
  });

  return (
    <>
      <AddStudentsButton></AddStudentsButton>

      <div>{studentsEl}</div>
    </>
  );
};

export default Students;
