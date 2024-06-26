import { ICoachSlice, coachActions } from "@/app/store/coachSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PostRequestToAddCoachNotification = () => {
  const dispatch = useDispatch();
  const postReqToCoachStatus = useSelector(
    (state: ICoachSlice) => state.coachState.postSubmitApplicationStatus
  );
  const postReqToCiachErrorMessage = useSelector(
    (state: ICoachSlice) => state.coachState.postSubmitAppErrorMessage
  );

  useEffect(() => {
    if (postReqToCoachStatus === "resolve" || postReqToCoachStatus === "error") {
      const timeoutId = setTimeout(() => {
        dispatch(coachActions.setPostSubmitApplicationStatusToReady());
      }, 5000);
      return () => {
        dispatch(coachActions.setPostSubmitApplicationStatusToReady());
      };
    }
  }, [postReqToCoachStatus]);

  return (
    <>
      <div className=" bottom-4 flex fixed left-1/4 ">
        <div className=" my-6 flex mx-auto w-full justify-center ">
          {postReqToCoachStatus === "loading" && (
            <div className=" flex flex-col items-center">
              <h1 className=" text-center px-3 rounded-md py-3 bg-cyan-200">
                Отправка уведомления
              </h1>
            </div>
          )}
          {postReqToCoachStatus === "resolve" && (
            <h1 className=" text-center rounded-md   px-3 py-3 bg-green-200">
              Уведомление успешно отправлено
            </h1>
          )}
          {postReqToCoachStatus === "error" && (
            <div className=" flex flex-col items-center">
              <h1 className=" text-center rounded-md   px-3 py-3 bg-rose-500">
                {`Ошибка ${postReqToCiachErrorMessage}`}
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostRequestToAddCoachNotification;
