import { connectMongoDB } from "@/app/libs/MongoConnect";
import Exercise from "@/app/models/ExerciseModel";
import User from "@/app/models/UserModel";
import { IUser } from "@/app/types";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Только для зарегистрированных пользователей" },
      { status: 401 }
    );
  }
  try {
    await connectMongoDB();
    const currentUser: any = await User.findOne({ email: session?.user?.email });
    console.log(currentUser._id);

    const allExercises = await Exercise.find({
      $or: [{ createdUserId: { $eq: currentUser._id } }, { isBest: true }],
    });
    const response = NextResponse.json({ message: "Success", result: allExercises });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}
