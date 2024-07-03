import { AppDispatch } from "@/app/store";
import { ICoachSlice, getCurrentCoachStudentsAndSetInState } from "@/app/store/coachSlice";
import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const StudentsList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentCoachStudents = useSelector(
    (state: ICoachSlice) => state.coachState.currentCoachStudents
  );

  useEffect(() => {
    dispatch(getCurrentCoachStudentsAndSetInState());
  }, []);

  console.log(currentCoachStudents);
  const studentsEl = currentCoachStudents?.map((student) => {
    return (
      <option key={student._id} value={student.studentsArr.studentId._id}>
        {student.studentsArr.studentId.name}
      </option>
    );
  });

  return (
    <>
      <Suspense fallback="Loading...">
        <div>StudentsList</div>

        <label htmlFor="student-select">
          <select name="student" id="student-select">
            {studentsEl}
          </select>
        </label>
      </Suspense>
    </>
  );
};

export default StudentsList;
