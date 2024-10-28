import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import CreateCrosswordMain from "../../components/CreateCrosswordTableSection/CreateCrosswordMain";
CreateCrosswordMain;

const page = async () => {
  return <CreateCrosswordMain></CreateCrosswordMain>;
};

export default page;
