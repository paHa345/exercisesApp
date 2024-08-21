"use client";

import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Train from "./../TrainSection/Train";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  IUserSlice,
  getUserWorkouts,
  setCurrentUserInState,
  userActions,
} from "@/app/store/userSlice";
import { IWorkout } from "@/app/types";
import { AppDispatch } from "@/app/store";
import {
  IAppSlice,
  appStateActions,
  appStateSlice,
  setCurrentUserWorkouts,
} from "@/app/store/appStateSlice";
import LoadingCards from "../LoadingCardSection/LoadingCards";
import WorkoutLoadingCards from "../LoadingCardSection/WorkoutLoadingCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";
import EditWorkoutModal from "../EditWorkoutSection/EditWorkoutModal";
import EditedWorkout from "../EditWorkoutSection/EditedWorkout";
import DeleteWorkoutModal from "../DeleteWorkoutSection/DeleteWorkoutModal";

const MyPage = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const [deletedWorkoutId, setDeletedWorkoutId] = useState("");

  const editedWorkout = useSelector(
    (state: IUserSlice) => state.userState.currentUser.editedWorkout
  );

  const workouts = useSelector((state: IUserSlice) => state.userState.currentUser.workoutsArr);

  const currentUser = useSelector((state: IUserSlice) => state.userState.currentUser);

  console.log(currentUser);
  const editWorkoutStatus = useSelector((state: IAppSlice) => state.appState.editWorkoutsStatus);
  // console.log(workouts);

  const deleteWorkoutStatus = useSelector((state: IAppSlice) => state.appState.deleteWorkoutStatus);

  const loadWorkoutsStatus = useSelector(
    (state: IAppSlice) => state.appState.fetchUserWorkoutsStatus
  );

  useEffect(() => {
    dispatch(setCurrentUserWorkouts());
    dispatch(setCurrentUserInState());
  }, []);

  // const getWorkoutsHandler = async () => {
  //   await dispatch(setCurrentUserWorkouts());
  //   console.log("first");
  //   console.log(workouts);
  // };

  const startEditWorkoutsHandler = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await dispatch(userActions.setEditedWorkout(String(e.currentTarget.dataset.workoutid)));
    dispatch(appStateActions.startEditWorkouts());
  };

  const stopEditWorkoutHandler = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await dispatch(userActions.resetEditedWorkout());
    dispatch(appStateActions.stopEditWorkouts());
  };

  const deleteWorkoutHandler = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // console.log(e.currentTarget.dataset.workoutid);
    // dispatch(userActions.deleteWorkoutfromUser(e.currentTarget.dataset.workoutid));
    setDeletedWorkoutId(String(e.currentTarget.dataset.workoutid));
    dispatch(appStateActions.startDeleteWorkout());
  };

  const workoutsEl = workouts.map((workout: IWorkout, index: number) => {
    return (
      <div key={index}>
        <div className=" flex justify-end">
          {!editWorkoutStatus && (
            <>
              <a
                className=" px-8"
                onClick={startEditWorkoutsHandler}
                href=""
                data-workoutid={workout._id}
              >
                <FontAwesomeIcon icon={faPencil} />
              </a>
              {currentUser.userType !== "user" && (
                <a
                  className=" "
                  onClick={deleteWorkoutHandler}
                  href=""
                  data-workoutid={workout._id}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </a>
              )}
            </>
          )}
          {editedWorkout?._id === workout._id && editWorkoutStatus && (
            <a onClick={stopEditWorkoutHandler} href="" data-workoutid={workout._id}>
              <FontAwesomeIcon icon={faXmark} />
            </a>
          )}
        </div>
        {editedWorkout?._id === workout._id && editWorkoutStatus && <EditedWorkout></EditedWorkout>}
        {editedWorkout?._id !== workout._id && (
          <div>
            <Train workout={workout}></Train>
          </div>
        )}
        {/* {editedWorkout._id === workout._id ? (
          <div>Edited el</div>
        ) : (
          <div>
            <Train
              name={workout.name}
              description={workout.comments}
              date={workout.date}
              exercises={workout.exercisesArr}
            ></Train>
          </div>
        )} */}
      </div>
    );
  });

  // const workoutsEl = workouts.map((workout: IWorkout, index: number) => {
  //   return (
  //     <>
  //       <div key={index}>
  //         <Train
  //           name={workout.name}
  //           description={workout.comments}
  //           date={workout.date}
  //           exercises={workout.exercisesArr}
  //         ></Train>
  //       </div>
  //     </>
  //   );
  // });

  return (
    <>
      {deleteWorkoutStatus && (
        <DeleteWorkoutModal deletedWorkoutId={deletedWorkoutId}></DeleteWorkoutModal>
      )}

      <section className=" container mx-auto">
        <div>
          {session?.user?.name ? (
            <h1 className=" text-right text-4xl font-bold py-10">
              {" "}
              {`Привет, ${session?.user?.name}`}{" "}
            </h1>
          ) : (
            <h1 className=" animate-pulse h-20 bg-slate-200 rounded mt-4 text-center text-2xl font-bold pb-6"></h1>
          )}
        </div>
        <div>
          {" "}
          <button className=" my-5" onClick={() => signOut()}>
            Выйти
          </button>
        </div>
        <div className=" py-5">
          <Link className=" buttonStandart" rel="stylesheet" href="/my/addNewWorkout">
            Добавить тренировку
          </Link>
        </div>

        <div>
          <Link className=" buttonStandart" rel="stylesheet" href="/catalog/addNewExercise">
            Добавить упражнение
          </Link>
        </div>
        <div className=" py-5">
          <Link className=" buttonStandart" rel="stylesheet" href="/coaches">
            Список тренеров
          </Link>
        </div>

        <div>
          <h1 className=" text-center text-4xl font-bold py-10"> Мои тренировки</h1>
        </div>
        {/* {loadWorkoutsStatus} */}

        {loadWorkoutsStatus === "loading" && <WorkoutLoadingCards></WorkoutLoadingCards>}
        {loadWorkoutsStatus === "error" && (
          <h1>"Не удалоcь загрузить список тренировок, повторите попытку позже"</h1>
        )}
        {/* {editWorkoutStatus && <EditWorkoutModal></EditWorkoutModal>} */}

        <div className=" flex flex-col gap-5 pb-7">
          {loadWorkoutsStatus === "resolve" && <div>{workoutsEl}</div>}
          {/* <Train></Train>
          <Train></Train> */}
        </div>
      </section>
    </>
  );
};

export default MyPage;
