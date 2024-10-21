import { NextRequest, NextResponse } from "next/server";
import Workout from "@/app/models/WorkoutModel";
import { connectMongoDB } from "@/app/libs/MongoConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import User from "@/app/models/UserModel";
import { IComment, IUser, IWorkout } from "@/app/types";
import Comment from "@/app/models/CommentModel";
import Exercise from "@/app/models/ExerciseModel";

export async function PATCH(req: NextRequest, { params }: { params: { exerciseId: string } }) {
  //   const currentId = new ObjectId(String(req.query.exerciseId));

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Только для зарегистрированных пользователей" },
      { status: 401 }
    );
  }

  try {
    await connectMongoDB();
    // const review = await Comment.find({ exerciseId: params?.exerciseId }).populate({
    //   path: "userId",
    //   model: "User",
    //   select: "email name",
    // });

    const exercise = await Exercise.findOneAndUpdate({ _id: params?.exerciseId }, { raiting: 2 });
    return NextResponse.json({ message: "Success", result: exercise });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}
