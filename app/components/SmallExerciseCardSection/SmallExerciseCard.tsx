import { useSession } from "next-auth/react";
import { IExercise, IUser } from "../../types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUserSlice, userActions } from "@/app/store/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Exercise from "../TrainSection/WorkoutExercise";
import { IAppSlice, appStateActions } from "@/app/store/appStateSlice";
import { useRouter } from "next/navigation";
import { addWorkoutActions } from "@/app/store/addWorkoutSlice";
import { editExerciseActions } from "@/app/store/editExerciseSlice";

export interface ISmallExerciseProps {
  _id: string | undefined;
  id: string | undefined;
  name: string | undefined;
  image?: string | undefined;
  isBest: boolean | undefined;
  type: string | undefined;
  raiting: number | undefined;
  video: string | undefined;
  description: string | undefined;
  muscleGroups: string[] | undefined;
  mainGroup: string | undefined;
  mainGroupRu: string | undefined;
  createdUserId?: string | undefined;
  isCurrentUser: boolean;
  deleteExerciseHandler?: any;
  setDeletedExerciseId?: any;
}

const SmallExerciseCard = ({
  createdUserId,
  name,
  _id,
  id,
  image,
  isBest,
  type,
  raiting,
  isCurrentUser,
  muscleGroups,
  mainGroup,
  mainGroupRu,
  setDeletedExerciseId,
}: ISmallExerciseProps) => {
  const muscleGroupsEl = muscleGroups?.map((el) => {
    return (
      <li key={el} className=" list-none pl-9">
        {el}
      </li>
    );
  });

  // const currentUser = useSelector((state: IUserSlice) => state.userState.currentUser);
  const router = useRouter();
  const dispatch = useDispatch();
  const currentExercises = useSelector(
    (state: IAppSlice) => state.appState.currentExercisesByGroup
  );

  const startEditExercisesHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log("startedit");
    const editedExercise = currentExercises.find(
      (exercise) => exercise._id === e.currentTarget.dataset.exerciseid
    );

    if (editedExercise) {
      dispatch(editExerciseActions.setEditedExercise(editedExercise));

      router.push("./catalog/editExercise");
    }
  };

  const deleteExerciseHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log("Delete Exercise");
    setDeletedExerciseId(_id);

    dispatch(appStateActions.startDeleteExercise());
  };

  const imageName = image || "";

  return (
    <article className="  transition-shadow px-5 py-5 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-lg shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
      <div>
        <h1>
          {isCurrentUser && (
            <div className=" flex justify-end">
              <a
                className=" px-8"
                onClick={startEditExercisesHandler}
                href=""
                data-exerciseid={_id}
              >
                <FontAwesomeIcon icon={faPencil} />
              </a>
              <a onClick={deleteExerciseHandler} href="" data-exerciseid={_id}>
                <FontAwesomeIcon icon={faTrash} />
              </a>
            </div>
          )}
        </h1>
      </div>
      <div className=" flex flex-col">
        <Link href={`./catalog/${_id}`}>
          <div className=" flex flex-col gap-2 mb-3">
            <h1 className=" grow text-2xl text font-bold pl-7 pt-7">{name}</h1>
            {type === "base" ? (
              <p className="  bg-baseColour self-center py-1 px-2 rounded-md">Базовое</p>
            ) : (
              <p className="  bg-isolatedColour self-center py-1 px-2 rounded-md text-cyan-50">
                Изолированное
              </p>
            )}
            <p className="  bg-mainGroupColour self-center py-1 px-2 rounded-md">{mainGroupRu}</p>
          </div>
          <div className=" flex flex-row justify-center">
            <div className=" basis-3/4">
              {imageName.startsWith("https://") ? (
                <img src={imageName} alt={imageName} />
              ) : (
                <Image
                  className=" w-full"
                  src={imageName}
                  alt={imageName}
                  width={60}
                  height={60}
                ></Image>
              )}
            </div>
          </div>
        </Link>

        <div className=" flex flex-col">
          <div className=" self-end pt-7">
            Рейтинг: <span className=" text-lg font-bold">{raiting}</span>
          </div>
          <div className=" text-xl leading-7">
            <ul className=" text-center font-bold pt-7 pb-4"> Мышечные группы</ul>
            {muscleGroupsEl}
          </div>
        </div>
      </div>
    </article>
  );
};

export default SmallExerciseCard;
