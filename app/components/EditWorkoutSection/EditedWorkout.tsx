import { AppDispatch } from "@/app/store";
import {
  IAddWorkoutSlice,
  IAddedExercises,
  addWorkout,
  addWorkoutActions,
} from "@/app/store/addWorkoutSlice";
import { IAppSlice, appStateActions } from "@/app/store/appStateSlice";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddExerciseModal from "../AddExerciseModalSection/AddExerciseModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IUserSlice, editWorkoutAndUpdate, userActions } from "@/app/store/userSlice";
import EditWorkoutAddExerciseModal from "./EditWorkoutAddExerciseModal";
import { IWorkout } from "@/app/types";
import Students from "./Students";

const EditedWorkout = () => {
  const dispatch = useDispatch<AppDispatch>();

  const name = useSelector((state: IUserSlice) => state.userState.currentUser.editedWorkout.name);
  const description = useSelector(
    (state: IUserSlice) => state.userState.currentUser.editedWorkout.comments
  );

  const addedExercises = useSelector(
    (state: IUserSlice) => state.userState.currentUser.editedWorkout.exercisesArr
  );

  const workoutDate = useSelector(
    (state: IUserSlice) => state.userState.currentUser.editedWorkout.date
  );

  const editedWorkout = useSelector(
    (state: IUserSlice) => state.userState.currentUser.editedWorkout
  );

  console.log(editedWorkout);
  const workoutStudents = useSelector(
    (state: IUserSlice) => state.userState.currentUser.editedWorkout?.studentsIdArr
  );

  var curr = new Date(workoutDate);
  var date = curr.toISOString().substring(0, 10);

  const updateWorkoutStatus = useSelector((state: IUserSlice) => state.userState.editWorkoutStatus);

  const editedWorkoutUserId = useSelector(
    (state: IUserSlice) => state.userState.currentUser.editedWorkout.userId
  );

  // console.log(workoutStudents);
  const currentUser = useSelector((state: IUserSlice) => state.userState.currentUser);

  const id = useSelector((state: IUserSlice) => state.userState.currentUser.editedWorkout._id);

  const showAddExerciseModal = useSelector(
    (state: IAppSlice) => state.appState.showAddExerciseModal
  );

  useEffect(() => {
    // если fetchAddWorkoutStatus === error или resolve, то
    // зурастить таймер, который через 3 сек переключит fetchAddWorkoutStatus
    // на ready с помощью dispatch addWorkoutSlice action
    if (updateWorkoutStatus === "resolve" || updateWorkoutStatus === "error") {
      setTimeout(() => {
        dispatch(userActions.setFetchAddWorkoutStatusToReady());
      }, 3000);
    }
  }, [updateWorkoutStatus]);

  const showAddExerciseModalHandler = () => {
    dispatch(appStateActions.showAddExerciseModal());
  };

  const [onFocusStatus, setInFocusStatus] = useState({
    name: false,
    description: false,
  });

  const changeNameHandler = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(userActions.setEditedWorkoutName(e.currentTarget.value));
  };

  const changeDescriptionHandler = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(userActions.setEditedWorkoutComments(e.currentTarget.value));
  };

  const changeDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(String(e.target.value));
    dispatch(userActions.setEditedWorkoutDate(e.target.value));
  };

  const focusElHandler = (e: React.FocusEvent<HTMLElement>) => {
    e.target.id === "name"
      ? setInFocusStatus({ ...onFocusStatus, name: true })
      : setInFocusStatus({ ...onFocusStatus, description: true });
  };

  const focusOutElHandler = (e: React.FocusEvent<HTMLElement>) => {
    e.target.id === "name"
      ? setInFocusStatus({ ...onFocusStatus, name: false })
      : setInFocusStatus({ ...onFocusStatus, description: false });
  };

  const editWorkoutHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // await dispatch(addWorkoutActions.setFetchAddWorkoutStatusToLoading());

    // const currentUserReq = await fetch("./../api/users/getUserByEmail");
    // типизировать ответ от сервера
    // const currentUser = await currentUserReq.json();
    // console.log(currentUser.result._id);
    const editedWorkout: any = {
      name: name,
      comments: description,
      exercisesArr: addedExercises,
      date: new Date(workoutDate),
      userId: editedWorkoutUserId,
      studentsIdArr: workoutStudents,
      _id: id,
    };
    const data = editedWorkout.exercisesArr.map((exercise: any) => {
      return { ...exercise, exercise: exercise.exerciseId };
    });

    dispatch(
      editWorkoutAndUpdate({
        workout: { ...editedWorkout, exercisesArr: data },
        workoutWithExerciseData: editedWorkout,
      })
    );
  };

  const changeSetsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      userActions.changeSetsAmount({
        value: e.target.value,
        exerciseId: e.target.dataset.exerciseid,
        index: e.target.dataset.index,
      })
    );
  };
  const changeRepsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      userActions.changeRepsAmount({
        value: e.target.value,
        exerciseId: e.target.dataset.exerciseid,
        index: e.target.dataset.index,
      })
    );
  };

  const deleteExerciseFromWorkoutHandler = (e: React.MouseEvent<SVGSVGElement>) => {
    dispatch(userActions.deleteExerciseFromEditedWorkout(e.currentTarget.dataset.number));
  };

  const addedExercisesElement =
    addedExercises.length === 0 ? (
      <div className=" flex flex-col justify-center my-4 bg-slate-200 rounded-lg">
        <h1 className=" mx-auto text-sm">Не добавлено упражнений</h1>
      </div>
    ) : (
      addedExercises?.map((addedExercise: any, index) => {
        return (
          <div
            className="flex flex-row border-solid border-gray-200 rounded-md border-2 px-3 py-3 shadow-cardElementShadow"
            key={`${addedExercise.id?._id}_${index}`}
          >
            <div className=" w-3/5">
              {addedExercise.exercise ? (
                <Link
                  className=" hover:underline"
                  href={`../catalog/${addedExercise.exercise?._id}`}
                >
                  {addedExercise.name}
                </Link>
              ) : (
                <p>{`${addedExercise.name} (архивное)`}</p>
              )}
            </div>
            <div className=" w-2/5 flex flex-col">
              <div className=" flex flex-col justify-center">
                <label htmlFor="">Подходов</label>
                <div className=" self-center border-current ">
                  <input
                    data-index={index}
                    data-exerciseid={addedExercise.id}
                    className="w-4/5  hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
                    onChange={changeSetsHandler}
                    type="number"
                    value={addedExercise.sets}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <label htmlFor="">Повторений</label>
                <div className=" self-center">
                  <input
                    data-index={index}
                    data-exerciseid={addedExercise.id}
                    className="w-4/5  hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
                    onChange={changeRepsHandler}
                    type="number"
                    value={addedExercise.reps}
                  />
                </div>
              </div>
            </div>
            <div className=" w-8 ">
              <div className=" hover:bg-slate-400 px-2 py-1 rounded-full  hover:border-slate-400 border-solid border-2  border-slate-200">
                <FontAwesomeIcon
                  data-number={index}
                  icon={faXmark}
                  onClick={deleteExerciseFromWorkoutHandler}
                />
              </div>
            </div>
          </div>
        );
      })
    );

  return (
    <div className="  mx-auto py-8">
      <div>
        <div className="pb-6">
          <h1 className=" text-center text-2xl font-bold">Редактировать тренировку</h1>
        </div>

        <div className=" shadow-exerciseCardHowerShadow p-3 max-w-xl mx-auto rounded-md border-solid border-2 border-stone-500">
          <div className="  w-11/12 mx-auto">
            {currentUser.userType === "coach" && <Students></Students>}

            <div className=" relative py-4">
              <input
                onChange={changeNameHandler}
                onFocus={focusElHandler}
                onBlur={focusOutElHandler}
                className="w-full  py-3 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
                id="name"
                type="text"
                value={name}
              />
              <span>
                <label
                  htmlFor="name"
                  className={` absolute transition-all ease-in-out ${
                    onFocusStatus.name || name.length > 0
                      ? "z-10 top-1 left-0  bg-white   scale-75"
                      : " top-1/3 left-2"
                  }`}
                >
                  Название тренировки
                </label>
              </span>
            </div>

            <div className="py-4 relative">
              <input
                onChange={changeDescriptionHandler}
                onFocus={focusElHandler}
                onBlur={focusOutElHandler}
                value={description}
                className=" w-full py-3 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
                id="description"
                type="text"
              />
              <span>
                <label
                  className={` absolute transition-all ease-in-out ${
                    onFocusStatus.description || description.length > 0
                      ? "z-10 top-1 left-0  bg-white   scale-75"
                      : " top-1/3 left-2"
                  }`}
                  htmlFor="description"
                >
                  Комментарий
                </label>
              </span>
            </div>

            <div className="py-4 flex flex-col">
              <label htmlFor="workoutDate">Дата тренировки</label>
              <input
                className=" w-2/5  hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
                onChange={changeDateHandler}
                id="workoutDate"
                type="date"
                value={date}
              />
            </div>

            <div>
              <div className=" flex flex-col justify-center my-4">
                <h1 className=" mx-auto py-3">Упражнения</h1>
              </div>
              {addedExercisesElement}
              {showAddExerciseModal && <EditWorkoutAddExerciseModal></EditWorkoutAddExerciseModal>}
              {!showAddExerciseModal && (
                <div className=" flex flex-col justify-center my-4">
                  <h1 className=" mx-auto py-3"> Выберете упражнения </h1>
                  <button
                    className=" py-4 rounded-md px-2 bg-emerald-100 hover:bg-emerald-400 hover:text-white text-2xl "
                    onClick={showAddExerciseModalHandler}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              )}
            </div>
            {/* <AddExercisesSection></AddExercisesSection> */}

            <div className=" py-4">
              {updateWorkoutStatus === "loading" && (
                <h1 className=" text-center px-3 rounded-md py-3 bg-cyan-200">
                  Обновление тренировки
                </h1>
              )}
              {updateWorkoutStatus === "resolve" && (
                <h1 className=" text-center rounded-md   px-3 py-3 bg-green-200">
                  Тренировка успешно обновлена
                </h1>
              )}
              {updateWorkoutStatus === "error" && (
                <h1 className=" text-center rounded-md   px-3 py-3 bg-rose-500">
                  Ошибка Обновления. Повторите попытку позже
                </h1>
              )}
            </div>
            <div className=" flex justify-center">
              {updateWorkoutStatus === "loading" ? (
                <button className=" animate-pulse w-2/5 h-8  my-8 py-2 text-slate-50 font-bold shadow-exerciseCardHowerShadow min-w-max px-6 rounded bg-buttonColor hover:bg-buttonHoverColor"></button>
              ) : (
                <button
                  onClick={editWorkoutHandler}
                  className=" my-8 py-2 text-slate-50 font-bold shadow-exerciseCardHowerShadow min-w-max px-6 rounded bg-buttonColor hover:bg-buttonHoverColor"
                >
                  {" "}
                  Обновить тренировку
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditedWorkout;
