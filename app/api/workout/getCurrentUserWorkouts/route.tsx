import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/app/libs/MongoConnect";
import Workout from "@/app/models/WorkoutModel";
import User from "@/app/models/UserModel";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  console.log(session?.user?.email);
  if (!session) {
    return NextResponse.json(
      { message: "Только для зарегистрированных пользователей" },
      { status: 401 }
    );
  }

  try {
    await connectMongoDB();

    const currentUser = await User.findOne({ email: session?.user?.email }, { workoutsArr: 1 })
      .populate({
        path: "workoutsArr",
        populate: {
          path: "exercisesArr",
          populate: [
            {
              path: "exercise",
              model: "Exercise",
              select: "id name",
            },
          ],
        },
      })
      .populate({
        path: "workoutsArr",
        populate: [
          {
            path: "studentsIdArr",
            model: "User",
            select: "id name email",
          },
        ],
      });

    return NextResponse.json({ message: "Success", result: currentUser });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}
