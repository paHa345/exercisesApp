import { AddedWordDirection, ICrosswordSlice } from "@/app/store/crosswordSlice";
import React from "react";
import { useSelector } from "react-redux";

const CreateCrosswordQuestionsSectionMain = () => {
  const questions = useSelector((state: ICrosswordSlice) => state.crosswordState.questionsArr);
  const questionsEl = questions.map((el, index) => (
    <div key={`${el.value}_${index}`}>
      <p>{`${el.direction === AddedWordDirection.Horizontal ? "По-горизонтали" : "По-вертикали"}`}</p>
      <p> {el.questionNumber}</p>
      <p>{el.value}</p>
    </div>
  ));
  return (
    <div>
      <p>Вопросы</p>
      {questionsEl}
    </div>
  );
};

export default CreateCrosswordQuestionsSectionMain;
