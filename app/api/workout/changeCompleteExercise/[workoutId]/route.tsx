import { connectMongoDB } from "@/app/libs/MongoConnect";
import Exercise from "@/app/models/ExerciseModel";
import User from "@/app/models/UserModel";
import Workout from "@/app/models/WorkoutModel";
import { IExercise, IUser, IWorkout } from "@/app/types";
import { authOptions } from "@/app/utils/authOptions";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export interface IReqWorkout {
  _id: string;
  comments: string;
  date: Date;
  userId:
    | string
    | {
        _id: string;
        email: string;
        name: string;
      };
  studentsIdArr: String[];

  name: string;
  exercisesArr:
    | [
        {
          name: string;
          exercise: { id: string; name: string; _id: string };
          exerciseId: string;
          reps: number;
          sets: number;
          isCompleted?: boolean;
        },
      ]
    | [];
}

export async function PATCH(req: NextRequest, { params }: { params: { workoutId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Только для зарегистрированных пользователей" },
      { status: 401 }
    );
  }

  try {
    await connectMongoDB();
    const body = await req.json();

    const currentIsCompletedStatus = body.isCompleted;

    const workout: IReqWorkout | null = await Workout.findById(params.workoutId);
    if (!workout) {
      throw new Error("Не найдено тренировки");
    }
    const currentUser: IUser | null = await User.findOne({ email: session.user.email });
    if (!currentUser) {
      throw new Error("Не найден пользователь");
    }

    const inStudentsList = workout?.studentsIdArr.filter((student) => {
      return String(student) === String(currentUser?._id);
    });
    console.log(inStudentsList);
    if (inStudentsList.length === 0) {
      throw new Error("Вы не являетесь участником этой тренировки");
    }

    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: params?.workoutId },
      {
        $set: { "exercisesArr.$[elem].isCompleted": !currentIsCompletedStatus },
      },
      {
        arrayFilters: [{ "elem.exerciseId": body.exerciseId }],
      }
    );

    return NextResponse.json({ message: "Success", result: updatedWorkout });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
