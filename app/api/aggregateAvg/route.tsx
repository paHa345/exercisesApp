import { NextRequest, NextResponse } from "next/server";
import Workout from "@/app/models/WorkoutModel";
import { connectMongoDB } from "@/app/libs/MongoConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import User from "@/app/models/UserModel";
import { IComment, IUser, IWorkout } from "@/app/types";
import Comment from "@/app/models/CommentModel";
import Exercise from "@/app/models/ExerciseModel";

export async function GET(req: NextRequest) {
  //   const currentId = new ObjectId(String(req.query.exerciseId));

  //   const session = await getServerSession(authOptions);
  //   if (!session) {
  //     return NextResponse.json(
  //       { message: "Только для зарегистрированных пользователей" },
  //       { status: 401 }
  //     );

  //   }

  try {
    await connectMongoDB();

    const data = await Comment.aggregate([
      { $match: { exerciseId: "6541fde03f25911208c1eea6" } },
      { $group: { _id: null, avgRaiting: { $avg: "$score" } } },
    ]);
    console.log(data);

    // const data = await Comment.find();

    return NextResponse.json({ message: "Success", result: data });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}
