import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import CrosswordContainer from "../components/CrosswordSection/CrosswordContainer";

const page = async () => {
  return <CrosswordContainer></CrosswordContainer>;
};

export default page;
