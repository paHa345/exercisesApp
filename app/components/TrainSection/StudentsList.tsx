import Link from "next/link";
import React from "react";

interface IStudentsListProps {
  studentsArr: [{ _id: string; email: string; name: string }];
  currentStudent: string;
  changeCurrentStudentHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const StudentsList = ({
  studentsArr,
  changeCurrentStudentHandler,
  currentStudent,
}: IStudentsListProps) => {
  const studentsEl = studentsArr.map((student, index) => {
    return (
      <div className=" max-w-xs" key={student._id}>
        <button
          data-studentid={student._id}
          onClick={changeCurrentStudentHandler}
          className={`${currentStudent === student._id ? "buttonStudentCurrent" : " buttonStudent"}`}
        >
          {student.email}
        </button>
        {/* <Link href={`/`}>{student.email}</Link> */}
      </div>
    );
  });
  return <div className=" grid grid-cols-studentList gap-2 my-2">{studentsEl}</div>;
};

export default StudentsList;
