import { AppDispatch } from "@/app/store";
import { crosswordActions, getCurrentUserCrosswordAndSetInState } from "@/app/store/crosswordSlice";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const LoadCrosswordModalMain = () => {
  const dispatch = useDispatch<AppDispatch>();

  const hideLoadCrosswordModalHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(crosswordActions.hideLoadCrosswordModal());
  };

  useEffect(() => {
    dispatch(getCurrentUserCrosswordAndSetInState());
  }, []);

  return (
    <div className="modal-overlay">
      <div className=" modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <a
              className=" bg hover:bg-slate-400 px-2 py-1 rounded-full  hover:border-slate-400 border-solid border-2  border-slate-200"
              onClick={hideLoadCrosswordModalHandler}
              href=""
            >
              <FontAwesomeIcon icon={faXmark} />
            </a>
          </div>
          {/* <div className=" overflow-auto h-2/6">{addedExercisesElement}</div> */}

          {/* <AddExercisesSection></AddExercisesSection> */}
          <div className="modal-body"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadCrosswordModalMain;
