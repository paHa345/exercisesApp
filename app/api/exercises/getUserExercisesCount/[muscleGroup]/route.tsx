import { connectMongoDB } from "@/app/libs/MongoConnect";
import Exercise from "@/app/models/ExerciseModel";
import User from "@/app/models/UserModel";
import { IUser } from "@/app/types";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest, { params }: { params: { muscleGroup: string } }) {
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
    console.log(params.muscleGroup);

    const count =
      params.muscleGroup === "all"
        ? await Exercise.countDocuments({
            $or: [{ createdUserId: String(currentUser._id) }, { isBest: true }],
          })
        : await Exercise.countDocuments({
            $and: [
              { $or: [{ createdUserId: String(currentUser._id) }, { isBest: true }] },
              { mainGroup: { $eq: params.muscleGroup } },
            ],
          });

    return NextResponse.json({ message: "Success", result: count });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}
