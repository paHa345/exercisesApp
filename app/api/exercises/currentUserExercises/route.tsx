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
    const sortParameter = req.nextUrl.searchParams.get("filter");
    const sortOrder = req.nextUrl.searchParams.get("increment") === "true" ? 1 : (-1 as 1 | -1);
    const sortQuery = { [sortParameter as string]: sortOrder };
    console.log(sortQuery);
    const currentUser: any = await User.findOne({ email: session?.user?.email });

    const allExercises = await Exercise.aggregate([
      { $match: { $or: [{ createdUserId: String(currentUser._id) }, { isBest: true }] } },
      { $sort: sortQuery },
    ]);
    const response = NextResponse.json({ message: "Success", result: allExercises });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}
