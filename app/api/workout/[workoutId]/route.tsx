import { NextRequest, NextResponse } from "next/server";
import Workout from "@/app/models/WorkoutModel";
import { connectMongoDB } from "@/app/libs/MongoConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import User from "@/app/models/UserModel";
import { IUser, IWorkout } from "@/app/types";

export async function GET(req: NextRequest, { params }: { params: { workoutId: string } }) {
  //   const currentId = new ObjectId(String(req.query.exerciseId));

  try {
    await connectMongoDB();
    const workout = await Workout.findById(params?.workoutId);
    console.log(workout);
    return NextResponse.json({ message: "Success", result: workout });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { workoutId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Только для зарегистрированных пользователей" },
      { status: 401 }
    );
  }

  try {
    await connectMongoDB();
    console.log(params?.workoutId);
    const currentUser: IUser | null = await User.findOne({ email: session.user?.email });
    const currentWorkout: IWorkout | null = await Workout.findById(params?.workoutId);

    if (String(currentWorkout?.userId) !== String(currentUser?._id)) {
      throw new Error("У вас нет прав для удаления этой тренировки");
    }
    const workout: any = await Workout.findByIdAndDelete(params?.workoutId);
    if (!workout) {
      return NextResponse.json({ message: "Тренировка не найдена" }, { status: 404 });
    }

    return NextResponse.json({ message: "Success", result: workout });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
